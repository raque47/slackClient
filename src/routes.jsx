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
            <Switch>
                <Route exact path="/" component={LoginContainer} />
                <Route path="/register" component={RegisterContainer} />
                <Route path="/chat" component={ChatContainer} />
                <Route component={NotFoundPage} />
            </Switch>

            {/*<Route exact path="/" render={() => (
                store.getState().user.userLogged === true ? (
                    <Redirect to="/chat" />
                ) :  <LoginContainer/>
            )} />*/}
        </div>
    </Router>
);
export default routes;
