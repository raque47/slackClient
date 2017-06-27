import React from 'react'
import asideStyle from './_aside.scss';
import UserDirectoryList from '../userDirectoryList/userDirectoryList';
import '../../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import store from '../../store';
import { SET_MESSAGES_TYPE } from '../../actions/types';

class AsideDirectory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {ready: false}
    this.onHandleClickChat = this.onHandleClickChat.bind(this);
    this.onHandleClickGeneral = this.onHandleClickGeneral.bind(this);
  }
  /**Method for loading all the messages of a private message 
   and changing the state of type of message to private/personal messages **/
  onHandleClickChat(event) {
    this.props.loadAllCurrentMessagesOfChat(event.target.id);
    {
      store.dispatch({
        type: SET_MESSAGES_TYPE,
        messageType: 'personal',
      });
    } 
  }
  /**Method for loading all the messages of the general channel
   and changing the state of type of message to general/channel messages **/
  onHandleClickGeneral(event) {
    this.props.loadAllCurrentMessagesOfRoom();
    {
      store.dispatch({
        type: SET_MESSAGES_TYPE,
        messageType: 'room',
      });
    }
  }
  render() {
    if (store.getState().allUsers.allUsers.length > 1) {
      this.state.ready = true;
    } else {
      this.state.ready = false;
    }
    return (
      <div className='aside col-md-2 col-sm-4 col-xs-4 '>
        <div className='row'>
          <header className='col-md-12 header'>
            <div className='header-content aside-margin-left'>
              <span className='white-text'>Konrad Group</span>
              <span className='name-letter user-status online'> {(this.state.ready ? store.getState().user.user.firstName : <div />)} </span>
            </div>
          </header>
          <div className='col-md-12 body'>
            <div className='body-wrapper aside-margin-left scrollbarDirectory' id='styleDirectory' >
              <div className='channels-info'>
                <a><span className='channels-options'>ALL UNREADS</span></a>
                <a><span className='channels-options'>ALL THREADS</span></a>
                <a><span className='channels-options'>CHANNELS</span></a>
                <div className='channels'>
                  <a onClick={this.onHandleClickGeneral} >
                    <span className= {(store.getState().allCurrentMessages.messageType === 'room')  ? 'focus channel':'notFocus channel'} >General</span> 
                  </a> 
                </div>
              </div>
              <div className='direct-messages'>
                <span className='channels-options'>DIRECT MESSAGES</span>
                {(this.state.ready ?
                  store.getState().allUsers.allUsers
                    .map((user) => (
                      <a key={user._id} onClick={this.onHandleClickChat} >
                        <span className= {(store.getState().user.userSelectedId=== user._id && store.getState().allCurrentMessages.messageType !== 'room') ? 'focus online':'notFocus online'}  id={user._id} >  
                          {user.profile.firstName}  
                        </span>   
                      </a>))
                  : '')}  

              </div>
            </div>
          </div>
          <footer className='col-md-12 footer '>
            <div className='aside-margin-left'>
              <span className='white-text'> <img src={require(`../../images/searchAside.svg`)} className='search-icon' alt='Search' /> Search </span>
            </div>
          </footer>
        </div>
      </div>
    );

  };
}
export default AsideDirectory;