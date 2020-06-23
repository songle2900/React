import React from 'react';

const Validation = (props) => {
    let textOutput = "Text too short";

    if (props.inputLength > 5) {
        textOutput = "Text long enough";
    };

    return (
        <div>
            <p>{textOutput}</p>
        </div>
    );
};

export default Validation;