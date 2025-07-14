import React from 'react';
// Global Context Providers
import { TodoProvider } from './context/TodoContext';
import ThemeToggle from './components/ThemeToggle';

// CSS (moved to shared folder)
import './assets/styles/shared/index.css';

// Components
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoFilters from './components/TodoFilters';

function App() {
  return (
    // Share global state via context (todos + filters)
    <TodoProvider>
      <div className="app">
        {/* 🌗 Theme toggle button (top-right) */}
        <ThemeToggle />

        {/* App Title */}
        <h1>📝 Todo App (React + Context API)</h1>

        {/* ✅ Add new todo form */}
        <TodoForm />

        {/* ✅ Filter by status and priority */}
        <TodoFilters />

        {/* ✅ Render todo list */}
        <TodoList />
      </div>
    </TodoProvider>
  );
}

export default App;
