import React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import appStyle from '../components/app/_app.scss'
import axios from 'axios'
import Login from '../components/login/login'
import { loginUser } from '../actions/index';
import { Field, reduxForm } from 'redux-form';


const form = reduxForm({
    form: 'login'
});

class LoginContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    handleFormSubmit(formProps) {
        console.log(formProps);
        this.props.loginUser(formProps);
    }
    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div>
                    <span><strong>Error!</strong> {this.props.errorMessage}</span>
                </div>
            );
        }
    }

    render() {
        const { handleSubmit } = this.props;

        return (
           <div className='container-fluid'>
                <div className='row'>
                    <div className='header row'>
                        <div className='col-md-12'>

                            <div className="containerElementsNavBar">
                                <div className="logo">
                                    <img src={require(`../images/logoSlackHeader.png`)} className="imageLogoModal" />
                                </div>
                                <div className="navBar">
                                    <a className="linkHeader"> <span className="navBarLetters"> Product </span> </a>
                                    <a className="linkHeader"> <span className="navBarLetters">Pricing </span></a>
                                    <a className="linkHeader"> <span className="navBarLetters">Support </span></a>
                                    <button className="buttonHeader"> <span className="navBarLetters">Your team</span></button>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
                <div className="row backgroundElemnts">
                    <div className="image-background row">
                        <div className="col-md-12">

                        </div>
                    </div>
                    <div className="background row">
                        <div className="col-md-12">

                        </div>
                    </div>

                </div>

                <div className="modalLogin">

                    <div className="containerLogoModal">
                        <img src={require(`../images/logoModal.png`)} className="imageLogoModal" />
                        <div className="textModal">Sign in</div>
                    </div>
  
                    <div className="containerInputsModal">
                        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                        {this.renderAlert()}
                            <div className="inputRectangleUser">
                                 <Field name="email" className="rectangleInputUser" component="input" type="text" placeholder="Enter your email"/>
                            </div>
                            <div className="inputRectangle">
                                 <Field name="password" className="rectangleInput" component="input" type="password" placeholder="Entrer your password" />
                                <button className="rectangleSubmitArrow" href='#' id='' type='submit'>
                                    <img src={require(`../images/loginarrow.svg`)} className="arrowSubmit" />
                                </button>
                            </div>
                        </form>

                        <div className="informationText">
                        </div>

                    </div>

                </div>

            </div>

        );
    }
}




function mapStateToProps(state) {  
  return {
    errorMessage: state.auth.error,
    message: state.auth.message
  };
}

export default connect(mapStateToProps, { loginUser })(form(LoginContainer));  