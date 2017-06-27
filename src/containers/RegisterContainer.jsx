import React from 'react';
import { connect } from 'react-redux';
//import io from 'socket.io-client';
import appStyle from '../components/app/_app.scss'
import store from '../store';
//import axios from 'axios'
//import Register from '../components/Register/Register'
import { registerUser } from '../actions/index';
import { Field, reduxForm } from 'redux-form';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const form = reduxForm({
    form: 'register',
    validate
});
const renderField = field => (
    <div>
        <input className="form-control" {...field.input} />
        {field.touched && field.error && <div className="error">{field.error}</div>}
    </div>
);

function validate(formProps) {
    const errors = {};

    if (!formProps.firstName) {
        errors.firstName = 'Please enter a first name';
    }

    if (!formProps.lastName) {
        errors.lastName = 'Please enter a last name';
    }

    if (!formProps.email) {
        errors.email = 'Please enter an email';
    }

    if (!formProps.password) {
        errors.password = 'Please enter a password';
    }

    return errors;
}
class RegisterContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            continue: false
        }
    }
    handleFormSubmit(formProps) {
        Promise.all([
            this.props.registerUser(formProps)
        ]).then(() => {
            this.continue = true;
            this.setState({ continue: true });
            this.seeIfCanLoad();
        })
    }
    seeIfCanLoad() {
       // this.state.continue === true ? this.context.router.history.push('/chat') : null
       // Promise.all([
            store.getState().user.userLogged === true ?
                this.context.router.history.push('/chat') : null
        //]).then(() => {
          //  {
        //         store.getState().user.userLogged === true ?
        //             this.context.router.history.push('/chat')
        //             : null
        //    // }
        //})
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
                        <img src={require(`../images/logoModal.png`)} className="imageLogoModal imageLogoModalRegister" />
                        <div className="textModalRegister">Sign up</div>
                    </div>
                    <div className="containerInputsModalRegister">
                        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                            {this.renderAlert()}
                            <div className="inputRectangleUser">
                                <p className="labelRegister">First name:</p>
                                <Field name="firstName" className="rectangleInputUserRegister" component={renderField} type="text" placeholder="Enter your name" />
                            </div>
                            <div className="inputRectangleUser">
                                <p className="labelRegister">Last name:</p>
                                <Field name="lastName" className="rectangleInputUserRegister" component={renderField} type="text" placeholder="Enter your last name" />
                            </div>
                            <div className="inputRectangleUser">
                                <p className="labelRegisterPassword">Email:</p>
                                <Field name="email" className="rectangleInputUserRegister" component={renderField} type="text" placeholder="Enter your email" />
                            </div>
                            <div className="inputRectangle">
                                <p className="labelRegister">Password:</p>
                                <Field name="password" className="rectangleInputUserRegister" component={renderField} type="password" placeholder="Entrer your password" />
                                <button className="rectangleSubmitArrowRegister" href='#' id='' type='submit'>
                                    <img src={require(`../images/loginarrow.svg`)} className="arrowSubmit" />
                                </button>
                            </div>
                        </form>
                        {/*<div className="informationText">
                        </div>*/}
                        <div className="informationText">
                            <p className='loginText'>Already have an account?  </p>
                            <Link to="/" className='loginTextSignUp'>Sign in here!</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
RegisterContainer.contextTypes = {
    router: PropTypes.func.isRequired
};
function mapStateToProps(state) {
    return {
        errorMessage: state.auth.error,
        message: state.auth.message
    };
}

export default connect(mapStateToProps, { registerUser })(form(RegisterContainer));  