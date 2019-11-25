import React, { useState } from 'react';
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

  return (
    <TodoTemplate>
      <TodoInsert />
      <TodoList todos={todos} />
    </TodoTemplate>
  )
};

export default App;