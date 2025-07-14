import React, { createContext, useCallback, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { v4 as uuidv4 } from 'uuid';

// Create the TodoContext
export const TodoContext = createContext();

// This component wraps the entire app and provides state
export const TodoProvider = ({ children }) => {
  // Todos stored in localStorage
  const [todos, setTodos] = useLocalStorage('todos', []);

  // Filter state: 'all', 'completed', 'active'
  const [filters, setFilters] = useLocalStorage('filters', {
    status: 'all',       // Filter by status
    priority: 'all',     // Filter by priority
    due: ''              // Filter by due date
  });

  // Add new todo
  const addTodo = useCallback((text, due, priority) => {
    const newTodo = {
      id: uuidv4(),
      text,
      due,
      priority,
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTodos(prev => [...prev, newTodo]);
  }, [setTodos]);

  // Update fields in a specific todo
  const updateTodo = useCallback((id, updatedFields) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, ...updatedFields } : todo
      )
    );
  }, [setTodos]);

  // Delete a todo by id
  const deleteTodo = useCallback((id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, [setTodos]);

  // Toggle completed state
  const toggleComplete = useCallback((id) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, [setTodos]);

  // Reorder list (for drag & drop)
  const reorderTodos = useCallback((startIdx, endIdx) => {
    setTodos(prev => {
      const updated = [...prev];
      const [removed] = updated.splice(startIdx, 1);
      updated.splice(endIdx, 0, removed);
      return updated;
    });
  }, [setTodos]);

  // Update filters
  const setFilter = useCallback((newFilter) => {
    setFilters(prev => ({ ...prev, ...newFilter }));
  }, []);

  // Only update context value when dependencies change
  const value = useMemo(() => ({
    todos,
    filters,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleComplete,
    reorderTodos,
    setFilter
  }), [todos, filters]);

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};
