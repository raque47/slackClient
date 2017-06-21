import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth_reducer';
import userReducer from './userReducer'
import allUsersReducer from './allUsersReducer'
import currentMessageReducer from './currentMessageReducer'
import allMessagesReducer from './allMessagesReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  form: formReducer,
  user: userReducer,
  allUsers: allUsersReducer,
  allCurrentMessages: currentMessageReducer,
  allMessages : allMessagesReducer,
});

export default rootReducer;  