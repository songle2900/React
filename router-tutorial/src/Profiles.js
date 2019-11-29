import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import Profile from './Profile';

const Profiles = () => {
    const activeStyle = {
        background: 'black',
        color: 'white'
    };
    return (
        <div>
            <h3>User list:</h3>
            <ul>
                <li>
                    <NavLink activeStyle={activeStyle} to="/profiles/songle" active>
                        songle
                    </NavLink>
                </li>
                <li>
                    <NavLink activeStyle={activeStyle} to="/profiles/carolys">
                        carolys
                    </NavLink>
                </li>
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