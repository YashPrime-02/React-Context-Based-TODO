import React, { useContext, useState } from 'react';
import { TodoContext } from '../context/TodoContext';
import '../assets/styles/shared/todo-item.css';

const TodoItem = ({ todo }) => {
  const { toggleComplete, deleteTodo, updateTodo } = useContext(TodoContext);

  // Edit mode state
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);
  const [editedPriority, setEditedPriority] = useState(todo.priority);

  // Format due date
  const formatDate = (isoDate) => {
    if (!isoDate) return 'No due date';
    return new Date(isoDate).toLocaleDateString();
  };

  // Save the edited changes
  const handleSave = () => {
    if (editedText.trim()) {
      updateTodo(todo.id, {
        text: editedText.trim(),
        priority: editedPriority,
      });
      setIsEditing(false);
    }
  };

  return (
    <div className={`todo-item glass-card ${todo.completed ? 'completed' : ''}`}>
      <div className="left">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleComplete(todo.id)}
        />

        {isEditing ? (
          <div className="text-details edit-mode">
            <input
              type="text"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              className="edit-input"
            />
            <select
              value={editedPriority}
              onChange={(e) => setEditedPriority(e.target.value)}
              className="edit-select"
            >
              <option value="high">🔴 High</option>
              <option value="medium">🟡 Medium</option>
              <option value="low">🔵 Low</option>
            </select>
          </div>
        ) : (
          <div className="text-details">
            <p className="text">{todo.text}</p>
            <p className="meta">
              Due: {formatDate(todo.due)} • Priority:{' '}
              <span className={`priority ${todo.priority}`}>
                {todo.priority}
              </span>
            </p>
          </div>
        )}
      </div>

      <div className="actions">
        {isEditing ? (
          <>
            <button onClick={handleSave} className="save-btn">💾</button>
            <button onClick={() => setIsEditing(false)} className="cancel-btn">✖</button>
          </>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)} className="edit-btn">✏️</button>
            <button onClick={() => deleteTodo(todo.id)} className="delete">🗑️</button>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
