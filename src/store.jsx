import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';  

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore); 

const enhancers= compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f,
);
const store = createStoreWithMiddleware(
    rootReducer,
    enhancers
);

export default store;

