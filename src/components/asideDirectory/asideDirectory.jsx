import React from 'react'
import asideStyle from './_aside.scss';
import UserDirectoryList from '../userDirectoryList/userDirectoryList';
import '../../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import store from '../../store';
import { SET_MESSAGES_TYPE } from '../../actions/types';

class AsideDirectory extends React.Component {

  constructor(props) {
    super(props);
    this.state = { ready: false, userSelected:'' }
    this.onHandleClickChat = this.onHandleClickChat.bind(this);
    this.onHandleClickGeneral = this.onHandleClickGeneral.bind(this);
  }
  onHandleClickChat(event) {
    this.props.loadAllCurrentMessagesOfChat(event.target.id);
    {
      store.dispatch({
        type: SET_MESSAGES_TYPE,
        messageType: 'personal',
      });
    } 
  }
  onHandleClickGeneral(event) {
    console.log('me estan presioanndo');
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
          <div className='col-md-12 body scrollbar'>
            <div className='body-wrapper aside-margin-left'>
              <div className='channels-info'>
                <a><span className='channels-options'>ALL UNREADS</span></a>
                <a><span className='channels-options'>ALL THREADS</span></a>
                <a><span className='channels-options'>CHANNELS</span></a>
                <div className='channels'>
                  <a onClick={this.onHandleClickGeneral} ><span className='channel'>General</span> </a>
                  <a><span className='channel'>Channel 2</span> </a>
                </div>
              </div>
              <div className='direct-messages'>
                <span className='channels-options'>DIRECT MESSAGES</span>
                {(this.state.ready ?
                  store.getState().allUsers.allUsers
                    .map((user) => (
                      //console.log('user id de seleccionado '+ user._id),
                      <a key={user._id} onClick={this.onHandleClickChat} >
                        <span className= {(store.getState().user.userSelectedId=== user._id) ? 'focus online':'notFocus online'}  id={user._id} >  
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