import React from 'react';
import store from '../../store';
import './messageChat.scss';
import '../../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';

class Message extends React.Component {
  render() {
    return (
      <div>
        <div className='row message'>
          <div className='containerOfImage'>
            <img className='imgMessage' src=  {this.props.pathImage} />
          </div>
          <div className='col-md-10'>
            <div className='messageTitle'>
              <h4 className='name__style'>{this.props.name}</h4>
              <h5 className='time__style'> {this.props.date}</h5>
            </div>
            <p className='p__style'>
              {this.props.content}
            </p>
          </div>
        </div>
      </div>
    );
  }
}
export default Message;