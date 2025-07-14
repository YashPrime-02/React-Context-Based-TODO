import React, { createContext, useCallback, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { v4 as uuidv4 } from 'uuid';

// Create the TodoContext
export const TodoContext = createContext();

// Context provider component for global todo state
export const TodoProvider = ({ children }) => {
  // Todos stored in localStorage
  const [todos, setTodos] = useLocalStorage('todos', []);

  // Filters stored in localStorage
  const [filters, setFilters] = useLocalStorage('filters', {
    status: 'all',       // 'all', 'completed', 'active'
    priority: 'all',     // 'all', 'high', 'medium', 'low'
    due: ''              // optional due date filter
  });

  // ✅ Add new todo
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

  // ✅ Update specific fields of a todo (used for edit)
  const updateTodo = useCallback((id, updatedFields) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, ...updatedFields } : todo
      )
    );
  }, [setTodos]);

  // ✅ Delete todo by ID
  const deleteTodo = useCallback((id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, [setTodos]);

  // ✅ Toggle completion state
  const toggleComplete = useCallback((id) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, [setTodos]);

  // ✅ Clear all completed todos
  const clearCompleted = useCallback(() => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  }, [setTodos]);

  // ✅ Reorder todos (used for drag-and-drop)
  const reorderTodos = useCallback((startIdx, endIdx) => {
    setTodos(prev => {
      const updated = [...prev];
      const [removed] = updated.splice(startIdx, 1);
      updated.splice(endIdx, 0, removed);
      return updated;
    });
  }, [setTodos]);

  // ✅ Set filters
  const setFilter = useCallback((newFilter) => {
    setFilters(prev => ({ ...prev, ...newFilter }));
  }, [setFilters]);

  // ✅ Memoize all exposed values to avoid unnecessary rerenders
  const value = useMemo(() => ({
    todos,
    filters,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleComplete,
    clearCompleted,
    reorderTodos,
    setFilter
  }), [todos, filters, addTodo, updateTodo, deleteTodo, toggleComplete, clearCompleted, reorderTodos, setFilter]);

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};
