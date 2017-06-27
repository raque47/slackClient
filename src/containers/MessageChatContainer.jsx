import React from 'react';
import store from '../store';
import MessageChat from '../components/messageChat/messageChat';
// import './messageChat.scss';
// import '../../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';

class MessageChatContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      pathImage: '../../src/images/users/noPhoto.png',
    };
  }
  render() {

    if (store.getState().allUsers != undefined && store.getState().allUsers.allUsers != undefined) {
      if ((store.getState().allUsers.allUsers.find((element) => (element._id === this.props.userEmisor))) != undefined) {

        this.state.name = store.getState().allUsers.allUsers.find((element) => (element._id === this.props.userEmisor)).profile.firstName;

        const userInChat = (store.getState().allUsers.allUsers.find((element) => (element.profile.firstName === this.state.name)));
        if (userInChat != undefined) {
          if (userInChat.photo === "yes") {
            this.state.pathImage = `../../src/images/users/${this.state.name}.png`;
          }
          else {
            this.state.pathImage = '../../src/images/users/noPhoto.png';
          }
        }
      }
    }
    
    return (

        <MessageChat
              pathImage = {this.state.pathImage}
              name = {this.state.name}
              date = {this.props.date}
              content =  {this.props.content}
        />


    );
  }
}
export default MessageChatContainer;