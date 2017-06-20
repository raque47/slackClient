import { GET_ALL_USERS, SET_ALL_USERS } from '../actions/types';

const INITIAL_STATE = {
    allUsers: [],
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_ALL_USERS:
            return state;
        case SET_ALL_USERS:
            console.log('entteee');
            return Object.assign({}, state, { allUsers: action.allUsers });
        default:
            return state;
    }
};



