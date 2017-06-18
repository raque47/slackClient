import React from 'react';
import './chat.scss';
import AsideDirectory from '../asideDirectory/asideDirectory';
import NavBarChat from '../navBarChat/navBarChat'
import MainChat from '../mainChat/mainChat';
import AsideChannelDetails from '../asideChannelDetails/asideChannelDetails';

import '../../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    return (
      <div className='row home'>
        <AsideDirectory />
        <NavBarChat />
        <MainChat />
        <AsideChannelDetails />
      </div>
    );
  }
}

export default Chat;

