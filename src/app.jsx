import React from 'react';
import ReactDOM from 'react-dom';  
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';  
import { createStore, applyMiddleware } from 'redux';   
import reduxThunk from 'redux-thunk';  
import routes from './routes';  
import reducers from './reducers/index';  
import store from './store'
// import cookie from 'universal-cookie';  
// const token = cookie.load('token');

// if (token) {  
//   store.dispatch({ type: AUTH_USER });
// }
const App = () => (
        <Provider store={ store }>
            { routes () }
        </Provider>
);

ReactDOM.render(<App />, document.getElementById('app'));
