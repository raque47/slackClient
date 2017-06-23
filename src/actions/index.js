import axios from 'axios';
import store from '../store';
import Cookies from 'universal-cookie';
import { AUTH_USER, AUTH_ERROR,UNAUTH_USER, SET_USER,SET_ALL_USERS,SET_FETCH_READY, SET_CHAT,SET_MESSAGE,SET_USER_LOGGED,SET_MESSAGES_FOR_EVERYONE,SET_CURRENT_MESSAGES,SET_MESSAGES_TYPE,UPDATE_MESSAGE, UPDATE_MESSAGE_CHANNELS} from './types';

const API_URL = 'http://localhost:3000/api';
const CLIENT_URL = 'http://localhost:8000';
const API_URL_ROUTES = 'http://localhost:3000/api/routes';

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
    const messagesFiltered = [];
    let contador = 0;
    return function (dispatch) {
        axios.get(API_URL_ROUTES + '/messages')
            .then((response) => {
                response.data.map((message) =>
                    (
                        ((message.idTransmitter === idUserEmisor && message.idReceiver === idUserSelected) ||
                            (message.idTransmitter === idUserSelected && message.idReceiver === idUserEmisor)) ?
                            (messagesFiltered.push(message),
                                contador++)
                            : (contador = contador)
                    )),
                dispatch({
                    type: 'SET_CURRENT_MESSAGES',
                    allCurrentMessages: messagesFiltered
                });
            }
            )
    }
}

/* Method to get all the messages in the database */
export function fetchMessagesForEveryone(idUserEmisor) {
    const messagesForEveryone = [];
    return function (dispatch) {
        axios.get(API_URL_ROUTES + '/messages')
            .then((response) => {
                response.data.map((message) =>
                    (
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
    }
}

/* Method to send a new private message (post to the database and send information to the socket)*/
export function sendNewMessage(username, content, idReceiver, hour, socket) {
    return function (dispatch) {
        const message = { 'idTransmitter': username, 'content': content, 'idReceiver': idReceiver, 'hour': hour };
        Promise.all([
            axios.post(API_URL_ROUTES + '/messages', message)
                .then((response) => {
                    socket.emit('sendMessage', username, content, idReceiver, hour);
                    //update the messages
                    dispatch({
                        type: 'UPDATE_MESSAGE',
                        allCurrentMessages: message,
                    });
                }),
        ]).then(() => {
        })
    }
}


/* Method to send a new private message (post to the database and send information to the socket)
Receives 'idReceiver = '00' if it is a message for everyone (a group/channel message)*/
export function sendNewMessageBroadcast(username, content, idReceiver,hour, socket) {
    return function (dispatch) {
        const message = { 'content': content, 'idTransmitter': username, 'idReceiver': '00', 'hour': hour };
        Promise.all([
            axios.post(API_URL_ROUTES + '/messages', message)
                .then((response) => {
                    // sending to all clients except sender
                    let channel = 'General';
                    socket.emit('sendBroadcast', username, content, idReceiver,hour,channel);
                    dispatch({
                        type: 'UPDATE_MESSAGE_CHANNELS',
                        allMessagesForEveryone: message,
                    });
                }),
        ]).then(() => {
        })
    }
}
// Update private messages
export function updateMessagesFromSocket(idTransmitter, content, idReceiver, hour) {
    return function (dispatch) {
        const message = {'content': content, 'idTransmitter': idTransmitter, 'idReceiver': idReceiver, 'hour': hour };
        dispatch({
            type: UPDATE_MESSAGE,
            allCurrentMessages: message,
        });
    };
}
//Update group/channels messages
export function updateMessagesBroadcastFromSocket(idTransmitter, content, idReceiver, hour, channel) {
    return function (dispatch) {
        const message = {'content': content, 'idTransmitter': idTransmitter, 'idReceiver': idReceiver, 'hour': hour };
        dispatch({
            type: UPDATE_MESSAGE_CHANNELS,
            allMessagesForEveryone: message,
        });
    };
}

//Changes the state for the type of message: if is a personal message or a grupal message
export function changeMessageType(typeOfMessage) {
    console.log('type: ' + typeOfMessage);
    return function (dispatch) {
        dispatch({
            type: SET_MESSAGES_TYPE,
            messageType: typeOfMessage
        });
    };
}

//Get the information of the user selected to talk with, in private messages
export function getUserSelectedData(userSelectedId){
    return function (dispatch) {
        axios.get(`${API_URL_ROUTES}/users/${userSelectedId}`)
            .then((response) => {
                dispatch({ type: 'SET_USER_SELECTED', dataOfUserSelected: response.data });
            })
            .catch(error => console.log('Axios error: ', error));
    }
}

//Get the information of the user that send the messages
export function getUserEmisorData(userId){
    return function (dispatch) {
        axios.get(`${API_URL_ROUTES}/users/${userId}`)
            .then((response) => {
                dispatch({ type: 'SET_USER_SELECTED', dataOfUserEmisor: response.data });
            })
            .catch(error => console.log('Axios error: ', error));
    }
}

// ErrorHandler method
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

