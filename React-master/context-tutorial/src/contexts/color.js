import React, { createContext, useState } from 'react';

const ColorContext = createContext({
    state: { color: 'black', subcolor: 'red' },
    actions: {
        setColor: () => {},
        setSubColor: () => {}
    }
});

const ColorProvider = ({ children }) => {
    const [color, setColor] = useState('black');
    const [subcolor, setSubcolor] = useState('red');

    const value = {
        state: { color, subcolor },
        actions: { setColor, setSubcolor }
    };

    return (
        <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
    );
};

// const ColorConsumer = ColorContext.Consumer
const { Consumer: ColorConsumer } = ColorContext;

// exporting ColorProvider, ColorConsumer
export { ColorProvider, ColorConsumer };

export default ColorContext;