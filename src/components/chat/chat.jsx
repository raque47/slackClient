import React from 'react';
import './chat.scss';
import AsideDirectory from '../asideDirectory/asideDirectory';
//import AsideDirectoryContainer from '../../containers/AsideDirectoryContainer'
import NavBarChat from '../navBarChat/navBarChat'
import MainChat from '../mainChat/mainChat';
import AsideChannelDetails from '../asideChannelDetails/asideChannelDetails';
import store from '../../store'
import '../../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';

class Chat extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      console.log('SI ESTO ESTA VACIO ESTAMOS MAL'),
      console.log(this.props.allUsers),
      console.log(this.props.directoryReady),
    
      <div className='row home'>
        <AsideDirectory
           allUsers={ this.props.allUsers } directoryReady={ this.props.directoryReady} user= {this.props.user}
         />
        <NavBarChat />
        <MainChat />
        <AsideChannelDetails />
      </div>
    );
  }
}

export default Chat;

