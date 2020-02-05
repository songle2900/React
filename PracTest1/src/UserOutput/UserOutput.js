import React from 'react';
import './UserOutput.css';

const UserOutput = (props) => {
    return (
        <div className="UserOutput">
            <p>Name: {props.name}</p>
            <p>Random Text</p>
        </div>
    );
};

export default UserOutput;