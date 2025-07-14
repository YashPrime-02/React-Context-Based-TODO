import React from 'react';
// Import global context provider (Todo state management)
import { TodoProvider } from './context/TodoContext';
// Global CSS styles (layout, reset, fonts, etc.)
import './assets/styles/shared/index.css';

// Component imports
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoFilters from './components/TodoFilters'; // ✅ Now active

function App() {
  return (
    // Wrap the entire app with TodoProvider to share global todo state
    <TodoProvider>
      <div className="app">
        {/* Page Title */}
        <h1>📝 Todo App (React + Context API)</h1>

        {/* ✅ Form to add new todos */}
        <TodoForm />

        {/* ✅ Filters for status and priority */}
        <TodoFilters />

        {/* ✅ Todo list (shows filtered todos) */}
        <TodoList />
      </div>
    </TodoProvider>
  );
}

export default App;
