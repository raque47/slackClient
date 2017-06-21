import { SET_ALL_MESSAGES, SEND_MESSAGES} from '../actions/types';

const INITIAL_STATE = {
    allMessages: [],
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_ALL_MESSAGES:
            return Object.assign({}, state, { allMessages: action.allMessages });
        case SEND_MESSAGES:
            const newMessages = state.allMessages;
            return Object.assign({}, state, { allMessages: newMessages.push(action.messages)  });
        default:
            return state;
    }
};



