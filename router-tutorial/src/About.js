import React from 'react';
import qs from 'qs';

const About = ({ location }) => {
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true // remove ?
    });

    const showDetail = query.detail === 'true'; // parsing result of query is string

    return (
        <div>
            <h1>Intro</h1>
            <p>Testing route</p>
            {showDetail && <p>detail value is true</p>}
        </div>
    );
};

export default About;