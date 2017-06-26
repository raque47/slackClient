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
import { sendNewMessageBroadcast } from '../actions/index';
import { changeMessageType } from '../actions/index';
import { updateMessagesFromSocket } from '../actions/index';
import { updateMessagesBroadcastFromSocket } from '../actions/index';
import { getUserSelectedData } from '../actions/index';
import { getUserEmisorData } from '../actions/index'
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
        //socket = io.connect('http://localhost:3000');
        socket = io.connect('https://agile-journey-45148.herokuapp.com');
        socket.emit('connected', token._id);

        socket.on('sendMessage', (username, content, idReceiver, hour) => {
        });
        socket.on('updateMessages', (username, content, idReceiver, hour) => {
            this.props.updateMessagesFromSocket(username, content, idReceiver, hour);

        });
        socket.on('updateMessagesBroadcast', (username, content, idReceiver, hour, channel) => {
            this.props.updateMessagesBroadcastFromSocket(username, content, idReceiver, hour, channel);

        });
    };
    loadAllCurrentMessagesOfChat(userSelectedId) {
        socket.emit('addUser', userSelectedId);
        this.props.loadAllCurrentMessages(userSelectedId, this.props.user.user._id);
        store.dispatch({
            type: SET_OTHER_USER_ID,
            userSelectedId: userSelectedId,
        });
        this.props.getUserSelectedData(userSelectedId);
    };
    loadAllCurrentMessagesOfRoom(channel) {
        this.props.fetchMessagesForEveryone(this.props.user.user._id);
    }
    sendNewMessage(newMessage) {
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const hour = `${hours}:${minutes}`;
        //IF THE MESSAGE IS A PERSONAL MESSAGE
        if (store.getState().allCurrentMessages.messageType === 'personal') {
            this.props.sendNewMessage(this.props.user.user._id, newMessage, store.getState().user.userSelectedId, hour, socket);
        }
        else { //IF THE MESSAGE IS A GRUPAL MESSAGE (CHATROOM)
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
        //content: state.auth.contents
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
