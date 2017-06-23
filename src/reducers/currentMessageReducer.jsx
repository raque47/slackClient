import { SET_CURRENT_MESSAGES, GET_CURRENT_MESSAGES, SET_MESSAGES_FOR_EVERYONE, GET_MESSAGES_FOR_EVERYONE, SET_MESSAGES_TYPE, UPDATE_MESSAGE,SET_MESSAGES_TO_SHOW,UPDATE_MESSAGE_CHANNELS } from '../actions/types';

const INITIAL_STATE = {
    allCurrentMessages: [],
    allMessagesForEveryone: [],
    allMessagesForShow: [],
    messageType: '',
};


export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_CURRENT_MESSAGES:
            console.log('AQUIII VAN AHORA SIIIIIIII');
            console.log(action.allCurrentMessages);
            return Object.assign({}, state, { allCurrentMessages: action.allCurrentMessages });
        case GET_CURRENT_MESSAGES:
            return state.allCurrentMessages;
        case SET_MESSAGES_FOR_EVERYONE:
            return Object.assign({}, state, { allMessagesForEveryone: action.allMessagesForEveryone });
        case GET_MESSAGES_FOR_EVERYONE:
            return state.allMessagesForEveryone;
        case SET_MESSAGES_TYPE:
            return Object.assign({}, state, { messageType: action.messageType });
        case UPDATE_MESSAGE:
            //console.log('ENTRE A UPDATE');
            //console.log('Mensaje nuevo a actualizar ',action.allCurrentMessages)
            //console.log('Mensajes de state ',state.allCurrentMessages);
            //[ ...state.allCurrentMessages, action.allCurrentMessages ]; // updating the messages without mutation
            //console.log('Este tiene q estar cambiado',state.allCurrentMessages);
            const messagesUpdated = state.allCurrentMessages;
            messagesUpdated.push(action.allCurrentMessages);
            return Object.assign({}, state, { allCurrentMessages: messagesUpdated });
        case UPDATE_MESSAGE_CHANNELS:
            const messagesUpdatedChannel = state.allMessagesForEveryone;
            messagesUpdatedChannel.push(action.allMessagesForEveryone);
            return Object.assign({}, state, { allMessagesForEveryone: messagesUpdatedChannel });
        case SET_MESSAGES_TO_SHOW:
            return Object.assign({}, state, { allMessagesForShow: action.allMessagesForShow});
        default:
            return state;
    }
};

