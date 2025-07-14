import React, { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import TodoItem from './TodoItem';
import '../assets/styles/shared/todo-list.css';

const TodoList = () => {
  const { todos, filters } = useContext(TodoContext);

  // Apply filters (status, priority)
  const filteredTodos = todos.filter(todo => {
    const matchesStatus =
      filters.status === 'all' ||
      (filters.status === 'completed' && todo.completed) ||
      (filters.status === 'active' && !todo.completed);

    const matchesPriority =
      filters.priority === 'all' || filters.priority === todo.priority;

    return matchesStatus && matchesPriority;
  });

  return (
    <div className="todo-list">
      {filteredTodos.length === 0 ? (
        <p className="empty">🎉 Nothing to do! Add a new task.</p>
      ) : (
        filteredTodos.map(todo => <TodoItem key={todo.id} todo={todo} />)
      )}
    </div>
  );
};

export default TodoList;
