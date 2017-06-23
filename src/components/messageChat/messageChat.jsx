import React from 'react';
import store from '../../store';
// import {SET_USER_EMISOR}  from '../../actions/types';
// import {getUserEmisorData} from '../actions/index'
import './messageChat.scss';
import '../../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      pathImage: '../../src/images/users/noPhoto.png',
    };
  }
  render() {

    if (store.getState().allUsers != undefined && store.getState().allUsers.allUsers != undefined) {
   console.log( this.props.idReceiver);
            console.log(  );
      if ((store.getState().allUsers.allUsers.find((element) => (element._id === this.props.userEmisor))) != undefined) {

        this.state.name = store.getState().allUsers.allUsers.find((element) => (element._id === this.props.userEmisor)).profile.firstName;

        console.log('Nombre TIENE Q SER JUANNNNNNNNNNNNN', this.state.name);
        console.log('JUAN RETORNO ', store.getState().allUsers.allUsers.find((element) => (element._id === this.props.userEmisor)).profile.firstName);

         const a = (store.getState().allUsers.allUsers.find((element) => (element.profile.firstName === this.state.name)));
        // console.log(a);
        if (a != undefined) {
          console.log('YES O NO ');
          console.log(a.photo);
          if (a.photo === "yes") {
            this.state.pathImage = `../../src/images/users/${this.state.name}.png`;
            console.log('pathh image con foto ', this.state.pathImage);
          }
          else {
            this.state.pathImage = '../../src/images/users/noPhoto.png';
            console.log('pathh image SIN foto ', this.state.pathImage);
          }
        }
      }
    }
    
    return (
     
      <div>
        <div className='row message'>
          <div className='containerOfImage'>
            <img className='imgMessage' src=  {this.state.pathImage} />
          </div>
          <div className='col-md-10'>
            <div className='messageTitle'>
              <h4 className='name__style'>{this.state.name}</h4>
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