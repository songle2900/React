import React, { useState, useRef, useCallback } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';


const App = () => {
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
  const nextId = useRef(4);

  const onInsert = useCallback(
    text => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      };
      setTodos(todos.concat(todo));
      nextId.current += 1;  // Add 1 to nextId
    },
    [todos],
  )

  const onRemove = useCallback(
    id => {
      setTodos(todos.filter(todo => todo.id !== id));
    },
    [todos],
  );

  const onToggle = useCallback(
    id => {
      setTodos(todos.map(
        todo => todo.id === id ? { ...todo, checked: !todo.checked } : todo,
      ));
    }, [todos]
  );

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  )
};

export default App;