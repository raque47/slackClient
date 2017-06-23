import React from 'react';
import { BrowserRouter as Router, Route, IndexRoute, Switch } from 'react-router-dom';

import NotFoundPage from './components/pageNotFound/pageNotFound';
import LoginContainer from './containers/LoginContainer'
import ChatContainer from './containers/ChatContainer'

const routes = () => (
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={LoginContainer} />
                <Route path="/chat" component={ChatContainer} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </Router>
);
export default routes;
