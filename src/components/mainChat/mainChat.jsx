import React from 'react';
import './mainChat.scss';
import Messages from '../dateMessagesChat/dateMessageChat';
import store from '../../store';
import '../../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';
class MainChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = { type: ''  };
    this.onHandleKeyPress = this.onHandleKeyPress.bind(this);
  }
  onHandleKeyPress(event) {
    if (event.key === 'Enter') {
      const newMessage = event.currentTarget.value;
      this.props.sendNewMessage(newMessage);
      event.currentTarget.value = '';
    }
  }
  render() {

    if (store.getState().allCurrentMessages.messageType === 'personal') {
       this.state.type = 'personal';
       console.log('!!PEEERRSSOOONAAALLLLL!!');
    } else {
       this.state.type = 'general';
       console.log('!!GENERAAAALLLL!!');
    } //HACER ABAJO IF this.state.type es tal if ternario vector es igual al correspondiene
    return (
      <div className='col-md-7 '>
        <main className='main__position'>
          <div className='row'>
            <div className='col-md-12 main main__center mainChat scrollbar' id='style-1'>
              <Messages
                allCurrentMessages={this.props.allCurrentMessages}
                allMessagesForEveryone={this.props.allMessagesForEveryone}
                userEmisor={this.props.userEmisor} />
            </div>
          </div>
        </main>
        <footer>
          <div className='row'>
            <div className='col-md-12 footer__center'>
              <div className='messageEntry'>
                <button className='buttonPlus' href='#' id='' >
                  <img className='imgPlus' src={require(`../../images/plus.svg`)} />
                </button>
                <input className='inputMessage' ref='form' onKeyDown={this.onHandleKeyPress} type='text' placeholder='Message' />
                <button className='buttonSmile' href='#' id='' >
                  <img className='imgSmile' src={require(`../../images/smile.svg`)} />
                </button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}


export default MainChat;
