
import React from 'react';
import { render } from 'react-dom';
import navBarStyle from './_navBar.scss';
import '../../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';
class NavBarChat extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (            
            <div className='navBarContainer'>
                  <div className='col-md-10'>
                    <div className='navBarChat'>
                        <div className='navBarLeft'>
                            <div className='title'>
                                <h3 className='titleNavBarLeft'>Channel#2</h3>
                            </div>
                            <div className='images'>
                                <img src={require(`../../images/star.svg`)} className='imageNavBarLeft starImage' />
                                <img src={require(`../../images/user.svg`)} className='imageNavBarLeft userImage' />
                                <img src={require(`../../images/pin.svg`)} className='imageNavBarLeft pinImage' />
                                <img src={require(`../../images/add.svg`)} className='imageNavBarLeft addImage' />
                                <p className='textNavBarLeft'>Add a topic</p>
                            </div>
                        </div>
                        <div className='navBarRight'>
                            <div className='searchInputContainer'>
                                <input type='text' className='searchInputNavBar' name='srch-term'/>
                                <img src={require(`../../images/search.svg`)} className='searchInputImage'/>
                                <span className='searchInputSpan'>Search</span>
                            </div>

                            <img src={require(`../../images/call.svg`)} className='imageNavBarRight callImage' />
                            <img src={require(`../../images/settings.svg`)} className='imageNavBarRight settingsImage' />
                            <img src={require(`../../images/files.svg`)} className='imageNavBarRight filesImage' />
                        </div>
                    </div>
              </div>

            </div>
        );
    }
};

export default NavBarChat;                   
