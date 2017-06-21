import { SET_OTHER_USER_ID,SET_USER, GET_USER, SET_ALL_USERS, SET_USER_LOGGED } from '../actions/types';

const INITIAL_STATE = {
    user: { _id: '', firstName: '', lastName: '', email: '' },
    userSelectedId: '',
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_USER:
            return Object.assign({}, state, { user: action.user });
        case GET_USER:
            return state;

        case SET_USER_LOGGED:
            return Object.assign({}, state, { userLogged: action.userLogged });
        case SET_OTHER_USER_ID:
            return Object.assign({}, state, { userSelectedId: action.userSelectedId });
        default: 
            return state;
    }
};



