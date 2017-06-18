import React from 'react';
import { connect } from 'react-redux';
//import Room from '../components/user-list';
//import store from '../store';
import io from 'socket.io-client';
import appStyle from '../components/app/_app.scss'
import axios from 'axios'
import Login from '../components/login/login'


class LoginContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
 
        return (
            <Login/>
        );
    }

}

export default LoginContainer;