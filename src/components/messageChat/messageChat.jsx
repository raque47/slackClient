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
            {this.props.name === 'Juan' ?
              <img className='imgMessage' src={require(`../../images/users/Juan.png`)} />
              :
              this.props.name === 'Mario' ?
                <img className='imgMessage' src={require(`../../images/users/Mario.png`)} />
                :
                this.props.name === 'Lola' ?
                  <img className='imgMessage' src={require(`../../images/users/Lola.png`)} />
                  :
                  this.props.name === 'Raquel' ?
                    <img className='imgMessage' src={require(`../../images/users/Raquel.png`)} />
                    :
                    <img className='imgMessage' src={require(`../../images/users/noPhoto.png`)} />
            }
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

