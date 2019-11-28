import React from 'react';
import { Link, Route } from 'react-router-dom';
import Profile from './Profile';

const Profiles = () => {
    return (
        <div>
            <h3>User list:</h3>
            <ul>
                <li><Link to="/profiles/songle">songle</Link></li>
                <li><Link to="/profiles/carolys">carolys</Link></li>
            </ul>

            <Route
                path="/profiles"
                exact
                render={() => <div>Select the user</div>}
            />
            <Route path="/profiles/:username" component={Profile} />
        </div>
    );
};

export default Profiles;