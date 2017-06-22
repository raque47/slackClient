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
import { updateMessagesFromSocket } from '../actions/index';
import { getUserSelectedData } from '../actions/index';
import {getUserEmisorData} from '../actions/index'
import PropTypes from 'prop-types';

let socket = null;

class ChatContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            directoryReady: false,
        }
        this.loadAllCurrentMessagesOfChat = this.loadAllCurrentMessagesOfChat.bind(this);
        this.loadAllCurrentMessagesOfRoom = this.loadAllCurrentMessagesOfRoom.bind(this);
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
    
        socket.on('sendMessage', (username, content, idReceiver, hour) => {
            //console('OJOOOOOO AQUI VA DE NUEVO!!!! ');
        });
        socket.on('updateMessages', (username, content, idReceiver, hour) => {
            this.props.updateMessagesFromSocket(username, content, idReceiver, hour);
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
        this.props.getUserSelectedData(userSelectedId);
    };
    loadAllCurrentMessagesOfRoom(){
        this.props.fetchMessagesForEveryone(this.props.user.user._id);
    }
    sendNewMessage(newMessage) {
        const hour = "10:02";
        console.log('new message!');
        console.log(newMessage);
        console.log('Mensaje: ', this.props.user, newMessage, hour);
        console.log('Personal o grupal???  ');
        console.log(store.getState().allCurrentMessages.messageType);
        //IF THE MESSAGE IS A PERSONAL MESSAGE
        if (store.getState().allCurrentMessages.messageType === 'personal') {
            console.log('OJO A ESTE QUE NO SE NULL ');
            console.log(store.getState().user.userSelectedId);
            this.props.sendNewMessage(this.props.user.user._id, newMessage, store.getState().user.userSelectedId, hour, socket);
        }
        else { //IF THE MESSAGE IS A GRUPAL MESSAGE (CHATROOM)
            socket.emit('subscribe', 'General'); 
            this.props.sendNewMessage(this.props.user.user._id, newMessage, '00', hour, socket);
        }
    };
    render() {
        const { allUsers, allCurrentMessages,allMessagesForEveryone, user, userSelected, userSelectedId, messageType } = this.props;
        return (
            <Chat
                allUsers={allUsers}
                allCurrentMessages={allCurrentMessages}
                allMessagesForEveryone={allMessagesForEveryone}
                messageType={messageType}
                user={user}
                userSelected={userSelected}
                directoryReady={this.state.directoryReady}
                loadAllCurrentMessagesOfChat={this.loadAllCurrentMessagesOfChat}
                loadAllCurrentMessagesOfRoom = {this.loadAllCurrentMessagesOfRoom}
                sendNewMessage={this.sendNewMessage}
                getUserEmisorData = {this.props.getUserEmisorData}
            />
        );
    };
};

ChatContainer.propTypes = {
    loadAllUsers: PropTypes.func,
    loadAllCurrentMessages: PropTypes.func,
    fetchMessagesForEveryone: PropTypes.func,
    allUsers: PropTypes.arrayOf(PropTypes.object),
    allCurrentMessages: PropTypes.arrayOf(PropTypes.object),
    user: PropTypes.object,
    userSelected: PropTypes.object,
    userSelectedId: PropTypes.string,
    messageType: PropTypes.string,
    dataOfUserSelected : PropTypes.string,
    dataOfUserEmisor: PropTypes.string,
};

ChatContainer.defaultProps = {
    allUsers: [{}],
    allCurrentMessages: [{}],
    allMessagesForEveryone: [{}],
    user: {},
    userSelected: {},
    dataOfUserSelected:{},
    dataOfUserEmisor:{},
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
        dataOfUserSelected: state.dataOfUserSelected,
        dataOfUserEmisor: state.dataOfUserEmisor,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        loadAllUsers: () => dispatch(fetchAllUsers()),
        loadAllCurrentMessages: (userEmisor, userSelected) => dispatch(fetchAllCurrentMessages(userEmisor, userSelected)),
        fetchMessagesForEveryone: (userEmisor) => dispatch(fetchMessagesForEveryone(userEmisor)),
        sendNewMessage: (username, content, idReceiver, hour, soket) => dispatch(sendNewMessage(username, content, idReceiver, hour, soket)),
        changeMessageType: (typeOfMessage) => dispatch(changeMessageType(typeOfMessage)),
        updateMessagesFromSocket: (username, content, idReceiver, hour) => dispatch(updateMessagesFromSocket(username, content, idReceiver, hour) ),
        getUserSelectedData:(userSelectedId) => dispatch(getUserSelectedData(userSelectedId) ),
        getUserEmisorData:(userEmisorId) => dispatch(getUserEmisorData(userEmisorId) ),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);
