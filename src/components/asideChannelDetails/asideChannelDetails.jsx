import React from 'react';
import './_rightAside.scss';
import '../../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';
class RightAside extends React.Component {
  render() {
    return (
      <div className='col-md-3 details'>
        <div className='row'>
          <div className='listContainer'>
            <ul className='list-group'>
              <li className='list-group-item'>Channel Details
                <span className='listArrow'>
                  {/*<img src={ arrow } alt='' />*/}
                  >
                </span>
              </li>
              <li className='list-group-item'>4 Pinned Items
                <span className='listArrow'>
                  {/*<img src={ arrow } alt='' />*/}
                  >
                </span>
              </li>
              <li className='list-group-item'>18 Members
                <span className='listArrow'>
                  {/*<img src={ arrow } alt='' />*/}
                  >
                </span>
              </li>
              <li className='list-group-item'>Shared Files
                <span className='listArrow'>
                  {/*<img src={ arrow } alt='' />*/}
                  >
                </span>
              </li>
              <li className='list-group-item'>Notification Preferences
                <span className='listArrow'>
                  {/*<img src={ arrow } alt='' />*/}
                  >
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
// {/*FIN DEL CHUNCHE DEL LADO DERECHO*/}
    );
  }
}

export default RightAside;
