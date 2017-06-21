import React from 'react';
import './messageChat.scss';
import '../../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    console.log(this.props.userEmisor + this.props.content );
    return (
      <div>
        <div className='row message'>
          <div className='col-md-2'>
              <img className='imgMessage' src={require(`../../images/girl.png`)} />
          </div>
          <div className='col-md-10'>
            <div className='messageTitle'>
              <h4 className='name__style'> {this.props.userEmisor}</h4>
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

