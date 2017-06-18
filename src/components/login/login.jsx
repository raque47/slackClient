
import React from 'react';
import { render } from 'react-dom';
import loginStyle from './login.scss';

class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
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
                        <div className="inputRectangleUser">
                            <input className="rectangleInputUser"></input>
                        </div>
                        <div className="inputRectangle">
                            <input className="rectangleInput"></input>
                            <div className="rectangleSubmitArrow">
                                <img src={require(`../../images/loginarrow.svg`)} className="arrowSubmit" />
                            </div>
                        </div>

                        <div className="informationText">
                        </div>

                    </div>

                </div>

            </div>
        );
    }
};

export default Login;  