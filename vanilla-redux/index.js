// Importing createStore function from redux
import { createStore } from 'redux';

// Creating DOM reference
const divToggle = document.querySelector('.toggle');
const counter = document.querySelector('h1');
const btnIncrease = document.querySelector('#increase');
const btnDecrease = document.querySelector('#decrease');

// Action type & action creator
const TOGGLE_SWITCH = 'TOGGLE_SWITCH';
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';

const toggleSwitch = () => ({ type: TOGGLE_SWITCH });
const increase = difference => ({ type: INCREASE, difference });
const decrease = () => ({ type: DECREASE });

// Initial state
const initialState = {
    toggle: false,
    counter: 0
};

// Reducer
// If state is undefined use initialState as default value
function reducer(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_SWITCH:
            return {
                ...state,
                toggle: !state.toggle
            };
        case INCREASE:
            return {
                ...state,
                counter: state.counter + action.difference
            }
        case DECREASE:
            return {
                ...state,
                counter: state.counter - 1
            };
        default:
            return state;
    }
}

// Store
const store = createStore(reducer);

// Creating render function
const render = () => {
    const state = store.getState(); // current state

    if (state.toggle) {
        divToggle.classList.add('active');
    } else {
        divToggle.classList.remove('active');
    }

    counter.innerText = state.counter;
};

render();

// Subscribe
store.subscribe(render);

// Dispatch
divToggle.onClick = () => {
    store.dispatch(toggleSwitch());
};
btnIncrease.onClick = () => {
    store.dispatch(increase(1));
};
btnDecrease.onClick = () => {
    store.dispatch(decrease());
};
