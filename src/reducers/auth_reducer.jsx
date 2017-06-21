import {
    AUTH_USER,
} from '../actions/types';

const INITIAL_STATE = {
    error: '',
    message: '',
    content: '',
    authenticated: false
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case AUTH_USER:
            return Object.assign({}, state, {error: '', message: '', authenticated: true });
        default:   
            return state;
    }
}