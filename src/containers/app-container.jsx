import React from 'react';
import { connect } from 'react-redux';
//import Room from '../components/user-list';
//import store from '../store';
import io from 'socket.io-client';

import appStyle from '../components/app/_app.scss'
import axios from 'axios'

let socket = null;

class AppContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            connected: false,
            userLogged: 'Raquel',
            userName: 'caro',// other(s []) person
            message: '',
            data: 'hola',
            socketActivate:false,
            //socket: ''
        }
        this.addUserLogged = this.addUserLogged.bind(this);
        this.updateChat = this.updateChat.bind(this);
        this.sendMessageToChat = this.sendMessageToChat.bind(this);
        this.handleOnKeyPress = this.handleOnKeyPress.bind(this);
        this.handleOnChangeMessage = this.handleOnChangeMessage(this);
        this.handleOnClickButton = this.handleOnClickButton.bind(this);
    }

    componentDidMount() {
        console.log('Entre a componentWILLMount');
        socket = io.connect('http://localhost:3000');
    }
    addUserLogged(/*id*/) {
        //socket.emit('adduser', this.state.userLogged);
        //** socket.emit('adduser', id);
        //this.props.getChats(id, this.props.userData.userData._id);
    }
    updateChat() {
        // listener, whenever the server emits 'updatechat', this updates the chat body
        socket.on('updatechat', function (username, data) {
            this.setState({ userName: username, data: data });
            console.log('Estoy en cliente: Serverhizo updateChat con username: ' + this.state.username + ' y data: ' + this.state.data);
        });
    }
    sendMessageToChat() {
        console.log('Palabra enviada es: ' + this.state.message);
        socket.emit('sendchat', this.state.message);
    }
    // when the client hits ENTER on their keyboard
    handleOnKeyPress(event) {
        if (event.key === 'Enter') {
            this.sendMessageToChat();
        }
    }
    // when the user make a change in the input
    handleOnChangeMessage(event) {
        console.log(event.target);
        if( event.target != undefined) {
            console.log('Cliente: el mensaje a enviar es: ' + event.target.value);
            this.setState({ message: event.target.value });
            //this.props.resetTKeyboardInput();
        }
    }
    // when the client clicks SEND
    handleOnClickButton(event) {
        this.sendMessageToChat();
    }
    render() {
        return (
            <div>
                <div>
                    <h2>ROOMS</h2>
                    <div className="chatContainer" id="rooms"></div>
                    <button onClick={this.addUserLogged}> Enviar usuario logueado </button>
                </div>
                <div>
                    <div id="conversation">
                        <h4>{this.state.userName + ': ' + this.state.data} </h4>
                    </div>
                    <input onChange={this.handleOnChangeMessage} onKeyPress={this.handleOnKeyPress} type="text" className="form-control" id="data" />
                    <button onClick={this.handleOnClickButton} className="button" id="datasend"> Send</button>
                </div>
            </div>
        );
    }

}

export default AppContainer;