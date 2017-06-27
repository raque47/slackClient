import React from 'react';
import { BrowserRouter as Router, Route, IndexRoute, Switch } from 'react-router-dom';
import store from './store'
import NotFoundPage from './components/pageNotFound/pageNotFound';
import LoginContainer from './containers/LoginContainer'
import ChatContainer from './containers/ChatContainer'
import RegisterContainer from './containers/RegisterContainer'

const routes = () => (
    <Router>
        <div>
            <Route exact path="/" component={LoginContainer} />
            <Route exact path="/register" component={RegisterContainer} />
            <Route exact path="/chat" component={ChatContainer} />
        </div>
    </Router>
);
export default routes;
