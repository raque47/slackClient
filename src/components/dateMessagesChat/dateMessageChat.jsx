import React from 'react';
import './dateMessageChat.scss';
import Message from '../messageChat/messageChat';
import '../../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';

class DateMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    console.log('****LLEGUE A DONDE LOS VOY A MOSTRAR LOS TENGO????');
    console.log(this.props.allCurrentMessages );
    return (
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
                  console.log(message),
                  console.log(message.content),
                  <Message
                    key={message._id}
                    content={message.content}
                    idReceiver = {message.idReceiver}
                    date= {message.hour}
                    userEmisor= {message.idTransmitter}
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

