import React from 'react';
import { connect } from 'react-redux';
import AsideDirectory from '../components/asideDirectory/asideDirectory';
import store from '../store';
import axios from 'axios';

import { fetchAllUsers, setFetchUsersReady } from '../actions/index'
import PropTypes from 'prop-types';

class AsideDirectoryContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            directoryReady: false
        }
    }
    componentDidMount() {
        this.props.loadAllUsers();
    }
    render() {
        const { allUsers } = this.props;
        console.log(allUsers);
        if (allUsers !== undefined) {
            console.log(' allUsers NO es undeifned');
            if (allUsers.length !== 0) {
                console.log(' allUsers es distinto 0');
                this.props.setDirectoryReady(true);
                //this.setState({ directoryReady: true });
                this.state.directoryReady = true;
                dispatch(setFetchUsersReady(true))
            }
            else {
                //this.state.directoryReady = false;
            }
        }
        else {
            this.state.directoryReady = false;
        }
        return (
            <AsideDirectory allUsers={allUsers} directoryReady={this.state.directoryReady} />
        );
    }
}

AsideDirectoryContainer.propTypes = {
    loadAllUsers: PropTypes.func,
    setDirectoryReady: PropTypes.func,
    allUsers: PropTypes.arrayOf(PropTypes.object)
};
// Specifies the default values for props:
AsideDirectoryContainer.defaultProps = {
    allUsers: [],
    setDirectoryReady: false
};


const mapStateToProps = (state) => {
    return {
        allUsers: state.allUsers,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        loadAllUsers: () => dispatch(fetchAllUsers()),
       // setDirectoryReady: () => dispatch(setFetchUsersReady())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AsideDirectoryContainer);
