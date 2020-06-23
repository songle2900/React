import { createAction, handleActions } from 'redux-actions';

// define action type
const CHANGE_INPUT = 'todos/CHANGE_INPUT';
const INSERT = 'todos/INSERT';
const TOGGLE = 'todos/TOGGLE';
const REMOVE = 'todos/REMOVE';

// action creator
// export const changeInput = input => ({
//     type: CHANGE_INPUT,
//     input
// });
export const changeInput = createAction(CHANGE_INPUT, input => input);

let id = 3; // Add 1 when insert called
// export const insert = text => ({
//     type: INSERT,
//     todo: {
//         id: id++,
//         text,
//         done: false
//     }
// });
export const insert = createAction(INSERT, text => ({
    id: id++,
    text,
    done: false,
}));

// export const toggle = id => ({
//     type: TOGGLE,
//     id
// });
export const toggle = createAction(TOGGLE, id => id);

// export const remove = id => ({
//     type: REMOVE,
//     id
// });
export const remove = createAction(REMOVE, id => id);

// reducer
const initialState = {
    input: '',
    todos: [
        {
            id: 1,
            text: 'Redux Tutorial',
            done: true
        },
        {
            id: 2,
            text: 'React & Redux',
            done: false
        }
    ]
};

// function todos(state = initialState, action) {
//     switch (action.type) {
//         case CHANGE_INPUT:
//             return {
//                 ...state,
//                 input: action.input
//             };
//         case INSERT:
//             return {
//                 ...state,
//                 todos: state.todos.concat(action.todo)
//             };
//         case TOGGLE:
//             return {
//                 ...state,
//                 todos: state.todos.map(todo =>
//                     todo.id === action.id ? { ...todo, done: !todo.done } : todo
//                 )
//             }
//         case REMOVE:
//             return {
//                 ...state,
//                 todos: state.todos.filter(todo => todo.id !== action.id)
//             };
//         default:
//             return state;
//     }
// };

const todos = handleActions(
    {
        [CHANGE_INPUT]: (state, { payload: input }) => ({ ...state, input: input }),
        [INSERT]: (state, { payload: todo }) => ({
            ...state,
            todos: state.todos.concat(todo)
        }),
        [TOGGLE]: (state, { payload: id }) => ({
            ...state,
            todos: state.todos.map(todo => 
                todo.id === id ? { ...todo, done: !todo.done } : todo,
            ),
        }),
        [REMOVE]: (state, { payload: id }) => ({
            ...state,
            todos: state.todos.filter(todo => todo.id !== id)
        }),
    }, initialState
);

export default todos;