import axios from 'axios';
import { browserHistory } from 'react-router';
//import cookie from 'react-cookie';
import Cookies from 'universal-cookie';
import store from '../store';
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
    SET_USER_LOGGED
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
    console.log('entreeeeee');
    console.log(email);
    console.log(password);
    //console.log(email.email + ' ' +password );
    return function (dispatch) {
        axios
            .post(`${API_URL}/auth/login`, { email, password })
            .then((response) => {
                console.log('YOOO');
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

// export function protectedTest() {  
//   return function(dispatch) {
//     axios.get(`${API_URL}/protected`, {
//       headers: { 'Authorization': cookie.load('token') }
//     })
//     .then(response => {
//       dispatch({
//         type: PROTECTED_TEST,
//         payload: response.data.content
//       });
//     })
//     .catch((error) => {
//       errorHandler(dispatch, error.response, AUTH_ERROR)
//     });
//   }
// }

export function getUser({ id }) {
    return (dispatch) => {
        console.log('GET', id);
    };
}
