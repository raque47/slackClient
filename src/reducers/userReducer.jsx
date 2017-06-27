import { SET_OTHER_USER_ID, SET_USER, GET_USER, SET_ALL_USERS, SET_USER_LOGGED, SET_USER_SELECTED } from '../actions/types';

const INITIAL_STATE = {
    user: { _id: '', firstName: '', lastName: '', email: '' },
    userSelectedId: '',
    dataOfUserSelected: {},
    dataOfUserEmisor: {},
    userLogged: false,
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_USER:
            return Object.assign({}, state, { user: action.user });
        case GET_USER:
            return state;
        case SET_USER_LOGGED:
            console.log('entreeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
            return Object.assign({}, state, { userLogged: action.userLogged });
        case SET_OTHER_USER_ID:
            return Object.assign({}, state, { userSelectedId: action.userSelectedId });
        case SET_USER_SELECTED:
            return Object.assign({}, state, { dataOfUserSelected: action.dataOfUserSelected });
        case SET_USER_SELECTED:
            return Object.assign({}, state, { dataOfUserEmisor: action.dataOfUserEmisor });
        default:
            return state;
    }
};



