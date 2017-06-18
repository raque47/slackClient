import React from 'react';
import './mainChat.scss';
import Messages from '../dateMessagesChat/dateMessageChat';
import '../../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';
class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div className='col-md-7 '>
        <main className='main__position'>
          <div className='row'>
            <div className='col-md-12 main main__center mainChat'>
              <Messages />
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
                <input className='inputMessage' type='text' placeholder='Message' />
                <button className='buttonSmile' href='#' id='' >
                  <img className='imgSmile'  src={require(`../../images/smile.svg`)} />
                </button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
export default Chat;  

