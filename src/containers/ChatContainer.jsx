import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import io from 'socket.io-client';
import axios from 'axios';
import Chat from '../components/chat/chat';
import appStyle from '../components/app/_app.scss';

import Cookies from 'universal-cookie';
import store from '../store';
import { SET_USER, SET_OTHER_USER_ID } from '../actions/types';
import { fetchAllUsers } from '../actions/index';
import { fetchAllCurrentMessages } from '../actions/index';
import { fetchMessagesForEveryone } from '../actions/index';
import { sendNewMessage } from '../actions/index';
import { changeMessageType } from '../actions/index';

import PropTypes from 'prop-types';

let socket = null;

class ChatContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            directoryReady: false,
        }
        this.loadAllCurrentMessagesOfChat = this.loadAllCurrentMessagesOfChat.bind(this);
        this.sendNewMessage = this.sendNewMessage.bind(this);
    };
    componentDidMount() {
        this.props.loadAllUsers();
    };
    componentWillMount() {
        const cookies = new Cookies();
        const token = cookies.get('token');
        if (token) {
            store.dispatch({
                type: SET_USER,
                user: token,
            });
        }
        socket = io.connect('http://localhost:3000');
        socket.emit('connected', token._id);
        console.log('TOKEN ID ES: ', token._id);
        console.log('USER ID ES: ', this.props.user.user._id);

        socket.on('sendMessage', (username, data, idReceiver, time, id) => {
        });


    };
    loadAllCurrentMessagesOfChat(userSelectedId) {
        console.log('parametro lola ' + userSelectedId + ' yo ' + this.props.user.user._id);
        socket.emit('addUser', userSelectedId);
        this.props.loadAllCurrentMessages(userSelectedId, this.props.user.user._id);
        store.dispatch({
                type: SET_OTHER_USER_ID,
                userSelectedId: userSelectedId,
            });
    };
    sendNewMessage(newMessage) {
        const hour = "10:02";
        console.log('new message!');
        console.log(newMessage);
        console.log('Mensaje: ', this.props.user, newMessage, hour);
        console.log('Personal o grupal???  ');
        console.log(store.getState().allCurrentMessages.messageType);
        if ( store.getState().allCurrentMessages.messageType === 'personal') {
            console.log('OJO A ESTE QUE NO SE NULL ');
            console.log(store.getState().user.userSelectedId);
             //console.log(this.props.userSelectedId);
            this.props.sendNewMessage(this.props.user.user._id, newMessage, store.getState().user.userSelectedId, hour, socket);
            
        }
        else {
            this.props.sendNewMessage(this.props.user.user._id, newMessage, '00', hour, socket);
        }
    };

    render() {
        const { allUsers, allCurrentMessages, user, userSelected,userSelectedId, messageType } = this.props;

        return (
            <Chat
                allUsers={allUsers}
                allCurrentMessages={allCurrentMessages}
                messageType={messageType}
                user={user}
                userSelected={userSelected}
                directoryReady={this.state.directoryReady}
                loadAllCurrentMessagesOfChat={this.loadAllCurrentMessagesOfChat}
                sendNewMessage={this.sendNewMessage}
            />
        );
    };
};

ChatContainer.propTypes = {
    loadAllUsers: PropTypes.func,
    loadAllCurrentMessages: PropTypes.func,
    allUsers: PropTypes.arrayOf(PropTypes.object),
    allCurrentMessages: PropTypes.arrayOf(PropTypes.object),
    user: PropTypes.object,
    userSelected: PropTypes.object,
    userSelectedId: PropTypes.string,
    messageType: PropTypes.string,
};

ChatContainer.defaultProps = {
    allUsers: [{}],
    allCurrentMessages: [{}],
    allMessagesForEveryone: [{}],
    user: {},
    userSelected: {},
    userSelectedId: '',
    setDirectoryReady: false,
    messageType: '',
};

const mapStateToProps = (state) => {
    return {
        allUsers: state.allUsers,
        allCurrentMessages: state.allCurrentMessages,
        allMessagesForEveryone: state.allMessagesForEveryone,
        user: state.user,
        userSelected: state.userSelected,
        userSelectedId: state.userSelectedId,
        messageType: state.messageType,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        loadAllUsers: () => dispatch(fetchAllUsers()),
        loadAllCurrentMessages: (userEmisor, userSelected) => dispatch(fetchAllCurrentMessages(userEmisor, userSelected)),
        fetchMessagesForEveryone: (userEmisor) => dispatch(fetchMessagesForEveryone(userEmisor)),
        sendNewMessage: (username, content, idReceiver, hour, soket) => dispatch(sendNewMessage(username, content, idReceiver, hour, soket)),
        changeMessageType: (typeOfMessage) => dispatch(changeMessageType(typeOfMessage)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);
