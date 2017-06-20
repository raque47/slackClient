
import React from 'react';
import { render } from 'react-dom';
import loginStyle from './login.scss';
import { Field, reduxForm } from 'redux-form';  

class Login extends React.Component {
    constructor(props) {
        super(props);
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
                                    <img src={require(`../../images/logoSlackHeader.png`)} className="imageLogoModal" />
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
                        <img src={require(`../../images/logoModal.png`)} className="imageLogoModal" />
                        <div className="textModal">Sign in</div>
                    </div>
  
                    <div className="containerInputsModal">
                        <form onSubmit={handleSubmit(this.props.handleFormSubmit.bind(this))}>
                        {this.props.renderAlert()}
                            <div className="inputRectangleUser">
                                 <Field name="email" className="rectangleInputUser" component="input" type="text" placeholder="Enter your email"/>
                            </div>
                            <div className="inputRectangle">
                                 <Field name="password" className="rectangleInput" component="input" type="password" placeholder="Entrer your password" />
                                <div className="rectangleSubmitArrow">
                                    <img src={require(`../../images/loginarrow.svg`)} className="arrowSubmit" />
                                </div>
                            </div>
                        </form>

                        <div className="informationText">
                        </div>

                    </div>

                </div>

            </div>
        );
    }
};

export default Login;  