import React, { useState, useRef, useCallback } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

// function createBulkTodos() {
//   const array = [];
//   for (let i = 1; i <= 2500; i++) {
//     array.push({
//       id: i,
//       text: `To do ${i}`,
//       checked: false,
//     });
//   }
//   return array;
// }

const App = () => {
  // const [todos, setTodos] = useState(createBulkTodos);
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: 'Basic concepts of React',
      checked: true,
    },
    {
      id: 2,
      text: 'Styling for Component',
      checked: true,
    },
    {
      id: 3,
      text: 'Creating Agenda App',
      checked: false,
    },
  ]);

  // id for each value
  const nextId = useRef(2501);

  const onInsert = useCallback(
    text => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      };
      setTodos(todos => todos.concat(todo));
      nextId.current += 1;  // Add 1 to nextId
    }, []
  );

  const onRemove = useCallback(
    id => {
      setTodos(todos => todos.filter(todo => todo.id !== id));
    }, []
  );

  const onToggle = useCallback(
    id => {
      setTodos(todos => todos.map(
        todo => todo.id === id ? { ...todo, checked: !todo.checked } : todo,
      ));
    }, []
  );

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  )
};

export default App;