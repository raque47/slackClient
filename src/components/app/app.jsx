import React from 'react';
import { render } from 'react-dom';
import AppContainer from '../../containers/app-container';
import {  BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import LoginContainer from '../../containers/login-container'
import ChatContainer from '../../containers/ChatContainer'


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <div className='container-fluid'>
          <div className='row' id='mainView'>
             <Route path='/' component={ ChatContainer } />
          </div>
        </div>
      </Router>
    );
  }
};

render(<App />, document.getElementById('app'));