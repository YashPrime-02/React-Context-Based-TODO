import React, { useState, useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import '../assets/styles/shared/todo-form.css';

const TodoForm = () => {
  const { addTodo } = useContext(TodoContext); // Access context function to add todos

  // Local states for form inputs
  const [text, setText] = useState('');
  const [due, setDue] = useState('');
  const [priority, setPriority] = useState('medium');
  const [error, setError] = useState('');

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate: text input must not be empty
    if (!text.trim()) {
      setError('Task description is required');
      return;
    }

    // Call context function to add a new todo
    addTodo(text, due, priority);

    // Reset form fields after submission
    setText('');
    setDue('');
    setPriority('medium');
    setError('');
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      {/* Text Input */}
      <input
        type="text"
        placeholder="Enter your task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {/* Due Date Input */}
      <input
        type="date"
        value={due}
        onChange={(e) => setDue(e.target.value)}
      />

      {/* Priority Dropdown */}
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="low">Low 🔵</option>
        <option value="medium">Medium 🟡</option>
        <option value="high">High 🔴</option>
      </select>

      {/* Submit Button */}
      <button type="submit">Add Todo</button>

      {/* Show error if validation fails */}
      {error && <small className="error">{error}</small>}
    </form>
  );
};

export default TodoForm;
