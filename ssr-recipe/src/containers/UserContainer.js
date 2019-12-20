import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import User from '../components/User';
import { usePreloader } from '../lib/PreloadContext';
import { getUser } from '../modules/users';

const UserContainer = ({ id }) => {
    const user = useSelector(state => state.users.user);
    const dispatch = useDispatch();

    usePreloader(() => dispatch(getUser(id))); // API invoke when server side rendering

    useEffect(() => {
        if (user && user.id === parseInt(id, 10)) return;
        dispatch(getUser(id));
    }, [dispatch, id, user]);

    if (!user) {
        // return <Preloader resolve={() => dispatch(getUser(id))} />;
        return null;
    }
    return <User user={user} />;
};

export default UserContainer;