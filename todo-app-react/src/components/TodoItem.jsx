import React, { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import '../assets/styles/shared/todo-item.css';

const TodoItem = ({ todo }) => {
  const { toggleComplete, deleteTodo } = useContext(TodoContext);

  // Format date for better readability
  const formatDate = (isoDate) => {
    if (!isoDate) return 'No due date';
    return new Date(isoDate).toLocaleDateString();
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="left">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleComplete(todo.id)}
        />
        <div className="text-details">
          <p className="text">{todo.text}</p>
          <p className="meta">
            Due: {formatDate(todo.due)} • Priority: <span className={`priority ${todo.priority}`}>{todo.priority}</span>
          </p>
        </div>
      </div>

      <button className="delete" onClick={() => deleteTodo(todo.id)}>✖</button>
    </div>
  );
};

export default TodoItem;
