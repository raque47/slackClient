import React from 'react';
import { connect } from 'react-redux';
//import Room from '../components/user-list';
//import store from '../store';
import io from 'socket.io-client';
import axios from 'axios'
import Chat from '../components/chat/chat'
import appStyle from '../components/app/_app.scss'


class ChatContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
 
        return (
            <Chat/>
        );
    }

}

export default ChatContainer;