import React from 'react';
import { withRouter } from 'react-router-dom';
import WithRouterSample from './WithRouterSample';

const data = {
    songle: {
        name: 'Eric',
        description: 'React lover'
    },
    carolys: {
        name: 'Carol',
        description: 'Eric lover'
    }
};

const Profile = ({ match }) => {
    const { username } = match.params;
    const profile = data[username];

    if(!profile) {
        return <div>User does not exist.</div>;
    }

    return (
        <div>
            <h3>{username}({profile.name})</h3>
            <p>{profile.description}</p>
            <WithRouterSample />
        </div>
    );
};

export default Profile;