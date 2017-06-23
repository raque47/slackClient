import axios from 'axios';
import store from '../store';
import Cookies from 'universal-cookie';
import {
    AUTH_USER,
    AUTH_ERROR,
    UNAUTH_USER,
    PROTECTED_TEST,
    SET_USER,
    SET_ALL_USERS,
    SET_FETCH_READY,
    SET_CHAT,
    SET_MESSAGE,
    SET_USER_LOGGED,
    SET_MESSAGES_FOR_EVERYONE,
    SET_CURRENT_MESSAGES,
    SET_MESSAGES_TYPE,
    UPDATE_MESSAGE,
    UPDATE_MESSAGE_CHANNELS
} from './types';

const API_URL = 'http://localhost:3000/api';
const CLIENT_URL = 'http://localhost:8000';
const API_URL_ROUTES = 'http://localhost:3000/api/routes';

export function errorHandler(dispatch, error, type) {
    let errorMessage = '';

    if (error.data.error) {
        errorMessage = error.data.error;
    } else if (error.data) {
        errorMessage = error.data;
    } else {
        errorMessage = error;
    }
}

function setUser(user) {
    console.log('estoy en setUser con el usuario ' + user);
    return { type: SET_USER, user: user };
}
export function loginUser({ email, password }) {
    return function (dispatch) {
        axios
            .post(`${API_URL}/auth/login`, { email, password })
            .then((response) => {
                dispatch({
                    type: 'SET_USER',
                    user: response.data.user
                });
                const cookies = new Cookies();
                cookies.set('token', response.data.user, { path: '/' });
                window.location.href = '/chat';
            })
            .catch((error) => {
                //errorHandler(dispatch, error.response, 'auth_error');
                console.log('Axios error');
            });
    }
}

export function setUserLogged(object) {
    dispatch({
        type: 'SET_USER_LOGGED',
        userLogged: object
    });
}

/* Method called from this module by fetchAllUsers()  */
function setAllUsers(allUsers) {
    return { type: SET_ALL_USERS, allUsers };
}
/* Method to get all the users in the database */
export function fetchAllUsers() {
    console.log('ENTRE A fectch USERS, url a hacer get: ');
    console.log(API_URL_ROUTES + '/users');
    return function (dispatch) {
        axios
            .get(API_URL_ROUTES + '/users')
            .then((response) => {
                dispatch({ type: 'SET_ALL_USERS', allUsers: response.data });
            })
            .catch(error => console.log('Axios error: ', error));
    }
}


/* Method to get all the messages in the database */
export function fetchAllMessages() {
    console.log('ENTRE A fectch MESSAGES, url a hacer get: ');
    console.log(API_URL_ROUTES + '/users');
    return function (dispatch) {
        axios
            .get(API_URL_ROUTES + '/users')
            .then((response) => {
                dispatch({ type: 'SET_ALL_MESSAGES', allMessages: response.data });
            })
            .catch(error => console.log('Axios error: ', error));
    }
}

/* Method to get all the messages in the database */
export function fetchAllCurrentMessages(idUserEmisor, idUserSelected) {
    console.log(idUserEmisor + " y " + idUserSelected);
    const messagesFiltered = [{}];
    let contador = 0;
    console.log(messagesFiltered);
    return function (dispatch) {
        axios.get(API_URL_ROUTES + '/messages')
            .then((response) => {
                response.data.map((message) =>
                    (
                        // console.log('Message iterando: ', message),
                        // console.log('Message idEmisor: ', message.idTransmitter),
                        // console.log('Message idReceptot:', message.idReceiver),
                        ((message.idTransmitter === idUserEmisor && message.idReceiver === idUserSelected) ||
                            (message.idTransmitter === idUserSelected && message.idReceiver === idUserEmisor)) ?
                            (messagesFiltered.push(message),
                                contador++)
                            : (contador = contador)
                    )),
                    console.log('YA VOY A GUARDAR LOS MENSAJES CORRECTOS hay ' + contador + ' mensajes');
                console.log(messagesFiltered);
                dispatch({
                    type: 'SET_CURRENT_MESSAGES',
                    allCurrentMessages: messagesFiltered
                });
            }
            )
        console.log('/////// SALI del then MENSAJE FINAL//////');
        console.log(messagesFiltered);
    }
}

/* Method to get all the messages in the database */
export function fetchMessagesForEveryone(idUserEmisor) {
    console.log('JUSTIN LLEGO con id emisor :' + idUserEmisor);
    const messagesForEveryone = [{}];
    console.log(messagesForEveryone);
    return function (dispatch) {
        axios.get(API_URL_ROUTES + '/messages')
            .then((response) => {
                response.data.map((message) =>
                    (
                        console.log('Message iterando: ', message),
                        console.log('Message idEmisor: ', message.idTransmitter),
                        console.log('Message idReceptor: ', message.idReceiver),
                        (message.idReceiver === '00') ?
                            messagesForEveryone.push(message)
                            : ''
                    ))
                dispatch({
                    type: 'SET_MESSAGES_FOR_EVERYONE',
                    allMessagesForEveryone: messagesForEveryone
                });
            }
            )
        console.log('JUSTIIN LLEGO AL FINAL YA TIENE LOS MENSAJES');
        console.log(messagesForEveryone);
    }
}

//here receives 'idReceiver = '00' if it is a message for everyone and not 
//just for an especific user/reiver

//(this.props.user.user._id, newMessage, store.getState().user.userSelectedId, hour, socket)
export function sendNewMessage(username, content, idReceiver, hour, socket) {
    console.log('Send message a la base con ');
    console.log('idEmisor: ', username);
    console.log('content: ' , content);
    console.log('idReceiver: ' , idReceiver);// + 'hour: ' + hour);
    console.log('socket: ', socket);
    return function (dispatch) {
        const message = { 'idTransmitter': username, 'content': content, 'idReceiver': idReceiver, 'hour': hour };
        Promise.all([
            axios.post(API_URL_ROUTES + '/messages', message)
                .then((response) => {
    
    
                    socket.emit('sendMessage', username, content, idReceiver, hour);
                    //actualizar la pantalla y los mensajes
                    dispatch({
                        type: 'UPDATE_MESSAGE',
                        allCurrentMessages: message,
                    });
                }),
        ]).then(() => {
            console.log('LUEGO DE LA PROMESA')
        })
    }
}

//here receives 'idReceiver = '00' if it is a message for everyone and not 
//just for an especific user/reiver
//(this.props.user.user._id, newMessage, '00', hour, socket);
export function sendNewMessageBroadcast(username, content, idReceiver,hour, socket) {
    console.log('ESTOY sendMessage ROOOMMM');
    console.log('id receive tiene que ser 00 ', idReceiver);
    console.log('socket: ', socket);
    return function (dispatch) {
        const message = { 'content': content, 'idTransmitter': username, 'idReceiver': '00', 'hour': hour };
        Promise.all([
            axios.post(API_URL_ROUTES + '/messages', message)
                .then((response) => {
                    console.log('Post MESSAGE a mongo ', message);
                    //console.log(response.data);
                    // sending to all clients except sender
                    let channel = 'General';
                    socket.emit('sendBroadcast', username, content, idReceiver,hour,channel);
                    //actualizar la pantalla y los mensajes
                    console.log('NUEVO MENSAJEEEEE!!!!!! ', response.data);
                    dispatch({
                        type: 'UPDATE_MESSAGE_CHANNELS',
                        allMessagesForEveryone: message,
                    });
                }),
        ]).then(() => {
            console.log('LUEGO DE LA PROMESA')
        })
        console.log('wii mensaje en  CHANNEL AGREGADO: ', message);
    }
}

export function updateMessagesFromSocket(idTransmitter, content, idReceiver, hour) {
    return function (dispatch) {
        console.log('USERNAME: ', idTransmitter, 'OTROs: ', content, hour);
        const message = {'content': content, 'idTransmitter': idTransmitter, 'idReceiver': idReceiver, 'hour': hour };
        console.log('Message', message);
        dispatch({
            type: UPDATE_MESSAGE,
            allCurrentMessages: message,
        });
    };
}

export function updateMessagesBroadcastFromSocket(idTransmitter, content, idReceiver, hour, channel) {
    return function (dispatch) {
        console.log('USERNAME: ', idTransmitter);
        console.log('idReceiver: ', idReceiver, 'content, hora:', content);
        console.log('channel: ',channel);
        const message = {'content': content, 'idTransmitter': idTransmitter, 'idReceiver': idReceiver, 'hour': hour };
        console.log('Message: ', message);
        dispatch({
            type: UPDATE_MESSAGE_CHANNELS,
            allMessagesForEveryone: message,
        });
    };
}


//changes the state for the type of message: if is a personal message or a grupal message
export function changeMessageType(typeOfMessage) {
    console.log('type: ' + typeOfMessage);
    return function (dispatch) {
        dispatch({
            type: SET_MESSAGES_TYPE,
            messageType: typeOfMessage
        });
    };
}


export function getUserSelectedData(userSelectedId){
    return function (dispatch) {
        axios.get(`${API_URL_ROUTES}/users/${userSelectedId}`)
            .then((response) => {
                console.log(response.data);
                dispatch({ type: 'SET_USER_SELECTED', dataOfUserSelected: response.data });
            })
            .catch(error => console.log('Axios error: ', error));
    }
}


export function getUserEmisorData(userId){
    return function (dispatch) {
        axios.get(`${API_URL_ROUTES}/users/${userId}`)
            .then((response) => {
                console.log(response.data);
                dispatch({ type: 'SET_USER_SELECTED', dataOfUserEmisor: response.data });
            })
            .catch(error => console.log('Axios error: ', error));
    }
}



// export function registerUser({ email, firstName, lastName, password }) {
//     return function (dispatch) {
//         axios.post(`${API_URL}/auth/register`, { email, firstName, lastName, password })
//             .then(response => {
//                 cookie.save('token', response.data.token, { path: '/' });
//                 dispatch({ type: AUTH_USER });
//                 window.location.href = CLIENT_ROOT_URL + '/chat';
//             })
//             .catch((error) => {
//                 errorHandler(dispatch, error.response, AUTH_ERROR)
//             });
//     }
// }

// export function logoutUser() {
//     return function (dispatch) {
//         dispatch({ type: UNAUTH_USER });
//         cookie.remove('token', { path: '/' });
//         window.location.href = CLIENT_ROOT_URL + '/login';
//     }
// }
