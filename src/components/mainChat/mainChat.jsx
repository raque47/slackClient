import React from 'react';
import ReactDOM from 'react-dom';
import './mainChat.scss';
import Messages from '../messages/messages';
import '../../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';
class MainChat extends React.Component {
  constructor(props) {
    super(props);
    this.onHandleKeyPress = this.onHandleKeyPress.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }
  componentDidMount() {
    this.scrollToBottom();
  }
  componentDidUpdate() {
    this.scrollToBottom();
  }
  scrollToBottom () {
    const messagesContainer = ReactDOM.findDOMNode(this.messagesContainer);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
  onHandleKeyPress(event) {
    if (event.key === 'Enter') {
      const newMessage = event.currentTarget.value;
      this.props.sendNewMessage(newMessage);
      event.currentTarget.value = '';
    }
  }

  render() {
    return (
      <div className='col-md-7 col-sm-8 col-xs-8 '>
        <main className='main__position'>
          <div className='row'>
            <div ref={(el) => { this.messagesContainer = el; }}
              className='col-md-12 main main__center mainChat scrollbar' id='style-1'>
              <Messages
                allCurrentMessages={this.props.allCurrentMessages}
                allMessagesForEveryone={this.props.allMessagesForEveryone}
                allMessagesForShow={this.props.allMessagesForShow}
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
