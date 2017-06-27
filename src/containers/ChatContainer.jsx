import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/types';
import io from 'socket.io-client';
import axios from 'axios';
import Chat from '../components/chat/chat';
import appStyle from '../components/app/_app.scss';
import Cookies from 'universal-cookie';
import store from '../store';
import { SET_USER, SET_OTHER_USER_ID } from '../actions/types';
import { fetchAllUsers, fetchAllCurrentMessages,fetchMessagesForEveryone,sendNewMessage,sendNewMessageBroadcast } from '../actions/index';
import { changeMessageType,updateMessagesFromSocket,updateMessagesBroadcastFromSocket,getUserSelectedData,getUserEmisorData } from '../actions/index';
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
        //connection to socket by socket.io-client
        socket = io.connect('https://agile-journey-45148.herokuapp.com');
        // Send the id of the current user to the socket of the server side
        if(this.props.user !== null && this.props.user !== undefined){
            socket.emit('connected', this.props.user.user._id);
        } 

        // Socket listen when sendMessage action is activate by the server side and receive the message data
        socket.on('sendMessage', (username, content, idReceiver, hour) => {
        });

        // Socket listen when updateMessages action is activate by the server side and call a method to update the information of a private message with the data that received
        socket.on('updateMessages', (username, content, idReceiver, hour) => {
            this.props.updateMessagesFromSocket(username, content, idReceiver, hour);
        });

        // Socket listen when updateMessagesBroadcast action is activate by the server side and call a method to update the message of type general
        socket.on('updateMessagesBroadcast', (username, content, idReceiver, hour, channel) => {
            this.props.updateMessagesBroadcastFromSocket(username, content, idReceiver, hour, channel);

        });
    };

    //load all the messages of a private conversation, when the logged user select a user of the contacts list.
    loadAllCurrentMessagesOfChat(userSelectedId) {
        socket.emit('addUser', userSelectedId);
        this.props.loadAllCurrentMessages(userSelectedId, this.props.user.user._id);
        store.dispatch({
            type: SET_OTHER_USER_ID,
            userSelectedId: userSelectedId,
        });
        this.props.getUserSelectedData(userSelectedId);
    };

    //load all the messages of a channel conversation, when the logged user select the channel.
    loadAllCurrentMessagesOfRoom(channel) {
        this.props.fetchMessagesForEveryone(this.props.user.user._id);
    }

    //Send the new message, check if it is a personal or general message and call the respective method of redux actions.
    sendNewMessage(newMessage) {
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const hour = `${hours}:${minutes}`;
        //if the new message is a personal message
        if (store.getState().allCurrentMessages.messageType === 'personal') {
            this.props.sendNewMessage(this.props.user.user._id, newMessage, store.getState().user.userSelectedId, hour, socket);
        }
        else { //if the new message is a general message (chatroom)
            this.props.sendNewMessageBroadcast(this.props.user.user._id, newMessage, '00', hour, socket);
        }
    };

    render() {
        const { allUsers, allCurrentMessages, allMessagesForEveryone, allMessagesForShow, user, userSelected, userSelectedId, messageType } = this.props;
        return (
            <Chat
                allUsers={allUsers}
                allCurrentMessages={allCurrentMessages}
                allMessagesForShow={allMessagesForShow}
                allMessagesForEveryone={allMessagesForEveryone}
                messageType={messageType}
                user={user}
                userSelected={userSelected}
                directoryReady={this.state.directoryReady}
                loadAllCurrentMessagesOfChat={this.loadAllCurrentMessagesOfChat}
                loadAllCurrentMessagesOfRoom={this.loadAllCurrentMessagesOfRoom}
                sendNewMessage={this.sendNewMessage}
                getUserEmisorData={this.props.getUserEmisorData}
            />
        );
    };
};

ChatContainer.propTypes = {
    loadAllUsers: PropTypes.func,
    loadAllCurrentMessages: PropTypes.func,
    fetchMessagesForEveryone: PropTypes.arrayOf(PropTypes.object),
    allUsers: PropTypes.arrayOf(PropTypes.object),
    allCurrentMessages: PropTypes.arrayOf(PropTypes.object),
    allMessagesForShow: PropTypes.arrayOf(PropTypes.object),
    user: PropTypes.object,
    userSelected: PropTypes.object,
    userSelectedId: PropTypes.string,
    messageType: PropTypes.string,
    dataOfUserSelected: PropTypes.string,
    dataOfUserEmisor: PropTypes.string,
};

ChatContainer.defaultProps = {
    allUsers: [{}],
    allCurrentMessages: [],
    allMessagesForEveryone: [],
    allMessagesForShow: [{}],
    user: {},
    userSelected: {},
    dataOfUserSelected: {},
    dataOfUserEmisor: {},
    userSelectedId: '',
    setDirectoryReady: false,
    messageType: '',
};

const mapStateToProps = (state) => {
    return {
        allUsers: state.allUsers,
        allCurrentMessages: state.allCurrentMessages,
        allMessagesForShow: state.allMessagesForShow,
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
        updateMessagesFromSocket: (username, content, idReceiver, hour) => dispatch(updateMessagesFromSocket(username, content, idReceiver, hour)),
        updateMessagesBroadcastFromSocket: (username, content, idReceiver, hour, channel) => dispatch(updateMessagesBroadcastFromSocket(username, content, idReceiver, hour, channel)),
        getUserSelectedData: (userSelectedId) => dispatch(getUserSelectedData(userSelectedId)),
        getUserEmisorData: (userEmisorId) => dispatch(getUserEmisorData(userEmisorId)),
        sendNewMessageBroadcast: (username, content, idReceiver, hour, soket) => dispatch(sendNewMessageBroadcast(username, content, idReceiver, hour, soket)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);
