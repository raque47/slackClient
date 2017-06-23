import React from 'react';
import './dateMessageChat.scss';
import Message from '../messageChat/messageChat';
import store from '../../store';
import { SET_MESSAGES_TO_SHOW } from '../../actions/types'
import '../../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';

// allCurrentMessages={this.props.allCurrentMessages}
// allMessagesForEveryone={this.props.allMessagesForEveryone}
// userEmisor={this.props.userEmisor} />
class DateMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      //arrayOfMessagesToShow: [{}]
    };
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
                      console.log('ESTOY EN privado'),
                      console.log(message),
                      console.log('ID TRANSMITTER'),
                      console.log(message.idTransmitter),
                      console.log('TIENE QUE LLEGARR EL IDDDDDDD!!!!!!'),
                      console.log(message._id),
                      <Message
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
                      console.log('ESTOY EN GENERAL'),
                      console.log(message),
                      console.log(message.content),
                      <Message
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
export default DateMessage;

