import React, { useContext, useState } from 'react';
import { TodoContext } from '../context/TodoContext';
import '../assets/styles/shared/todo-item.css';

// ✅ Import Lucide icons
import { Edit3, Save, Trash2, X } from 'lucide-react';

const TodoItem = ({ todo }) => {
  const { toggleComplete, deleteTodo, updateTodo } = useContext(TodoContext);

  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);
  const [editedPriority, setEditedPriority] = useState(todo.priority);

  const formatDate = (isoDate) => {
    if (!isoDate) return 'No due date';
    return new Date(isoDate).toLocaleDateString();
  };

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
            <button onClick={handleSave} className="save-btn" title="Save">
              <Save size={18} />
            </button>
            <button onClick={() => setIsEditing(false)} className="cancel-btn" title="Cancel">
              <X size={18} />
            </button>
          </>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)} className="edit-btn" title="Edit">
              <Edit3 size={18} />
            </button>
            <button onClick={() => deleteTodo(todo.id)} className="delete" title="Delete">
              <Trash2 size={18} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
