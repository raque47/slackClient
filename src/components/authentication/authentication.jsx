// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

// export default function (ComposedComponent) {
//   class Authentication extends Component {
//     constructor(props, context) {
//       super(props);
//       context.router// will work
//     }
//     componentWillMount(context) {
//       if (!this.props.authenticated) {
//         this.context.history.pushState(null, '/login');
//       }
//     }

//     componentWillUpdate(nextProps, context) {
//       if (!nextProps.authenticated) {
//           this.context.history.pushState(null, '/login');
//       }
//     }

//     render() {
//       return <ComposedComponent {...this.props} />
//     }
//   }
//  Authentication.contextTypes = {
//   history: React.PropTypes.object.isRequired,
// };
//   Authentication.defaultProps = {
//     router: {},
//   };
//   function mapStateToProps(state) {
//     return { authenticated: state.auth.authenticated };
//   };

//   return connect(mapStateToProps)(Authentication);



// }

