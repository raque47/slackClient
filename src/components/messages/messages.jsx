import React from 'react';
import './messages.scss';
import MessageChatContainer from '../../containers/MessageChatContainer';
import store from '../../store';
import { SET_MESSAGES_TO_SHOW } from '../../actions/types'
import '../../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {type: ''};
  }
  render() {

    return (
      (store.getState().allCurrentMessages.messageType === 'personal') ?
        <div className='row'>
          <div className='col-md-2 col-md-offset-5'>
            <h2 className='dateMessage'>
              Today
              </h2>
          </div>
          <div className='col-md-12'>
            {
              this.props.allCurrentMessages !== undefined && this.props.allCurrentMessages !== null ?
                this.props.allCurrentMessages.allCurrentMessages !== undefined ?
                  this.props.allCurrentMessages.allCurrentMessages
                    .map((message) => (
                      <MessageChatContainer
                        key={message._id}
                        content={message.content}
                        idReceiver={message.idReceiver}
                        date={message.hour}
                        userEmisor={message.idTransmitter}
                      />
                    ))
                  :
                  null
                :
                null
            }
          </div>
        </div>
        :
        <div className='row'>
          <div className='col-md-2 col-md-offset-5'>
            <h2 className='dateMessage'>
              Today
          </h2>
          </div>
          <div className='col-md-12'>
            {
              this.props.allCurrentMessages !== undefined && this.props.allCurrentMessages !== null ?
                this.props.allCurrentMessages.allMessagesForEveryone !== undefined ?
                  this.props.allCurrentMessages.allMessagesForEveryone
                    .map((message) => (
                      <MessageChatContainer
                        key={message._id}
                        content={message.content}
                        idReceiver={message.idReceiver}
                        date={message.hour}
                        userEmisor={message.idTransmitter}
                      />
                    ))
                  :
                  null
                :
                null
            }
          </div>
        </div>
    );
  }
}
export default Messages;

