import React from 'react';
import './chat.scss';
import AsideDirectory from '../asideDirectory/asideDirectory';
//import AsideDirectoryContainer from '../../containers/AsideDirectoryContainer'
import NavBarChat from '../navBarChat/navBarChat';
import MainChat from '../mainChat/mainChat';
import AsideChannelDetails from '../asideChannelDetails/asideChannelDetails';
import store from '../../store';
import '../../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';

class Chat extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='row home'>
        <AsideDirectory 
          allUsers={this.props.allUsers} 
          user={this.props.user} 
          loadAllCurrentMessagesOfRoom = {this.props.loadAllCurrentMessagesOfRoom} 
          loadAllCurrentMessagesOfChat={this.props.loadAllCurrentMessagesOfChat} 
          directoryReady={this.props.directoryReady} />
        <NavBarChat />
        <MainChat 
          allCurrentMessages={this.props.allCurrentMessages} 
          allMessagesForEveryone ={this.props.allMessagesForEveryone}
          allMessagesForShow={this.props.allMessagesForShow}
          sendNewMessage={this.props.sendNewMessage} />
        <AsideChannelDetails />
      </div>
    );
  }
}

export default Chat;

