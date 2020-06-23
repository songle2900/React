import React, { useEffect } from 'react';
import Users from '../components/Users';
import { connect } from 'react-redux';
import { getUsers } from '../modules/users';
import { Preloader } from '../lib/PreloadContext';

const UsersContainer = ({ users, getUsers }) => {
    // invoke when component mount
    useEffect(() => {
        if (users) return; // no request if users validate
        getUsers();
    }, [getUsers, users]);
    return (
        <>
            <Users users={users} />
            <Preloader resolve={getUsers} />
        </>
    );
};

export default connect(
    state => ({
        users: state.users.users
    }),
    {
        getUsers
    }
)(UsersContainer);