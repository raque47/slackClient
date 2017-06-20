import React from 'react';
import { BrowserRouter as Router, Route, IndexRoute, Switch } from 'react-router-dom';

import AppContainer from './containers/app-container';

import NotFoundPage from './components/pageNotFound/pageNotFound';
import LoginContainer from './containers/login-container'
import ChatContainer from './containers/ChatContainer'

// import Register from './components/register/register';   
// import RequireAuth from './components/auth/require-auth';

const routes = () => (
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={LoginContainer} />
                {/*<Route path="register" component={Register} />*/}
                {/*<Route path="login" component={LoginContainer} />*/}
                <Route path="/chat" component={ChatContainer} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </Router>
);
export default routes;
