import React from 'react';
import TodoListItem from './TodoListItem';
import './TodoList.scss';

const TodoList = ({ todos, onRemove }) => {
    return (
        <div className="TodoList">
            {todos.map(todo => (
                // key props is necessary when using map function
                <TodoListItem todo={todo} key={todo.id} onRemove={onRemove} />
            ))}
        </div>
    );
};

export default TodoList;