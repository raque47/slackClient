import React from 'react';
import { Link } from 'react-router-dom';

// Using "Stateless Functional Components"
export default function(props) {
  return (
    <div>
      {props.directoryOfUsers.map(user => {
        return (
              <Link to={'/chat/' + user.firstName}>
                <span className='user-status offline'>
                    {user.firstName}
                </span>
              </Link>
        );
      })}
    </div>
  );
}
