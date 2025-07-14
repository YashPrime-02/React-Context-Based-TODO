import React, { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import '../assets/styles/shared/todo-filters.css'; // CSS for filter buttons

const TodoFilters = () => {
  const { filters, setFilter } = useContext(TodoContext);

  // Filter button handler
  const handleFilterChange = (type, value) => {
    setFilter({ [type]: value });
  };

  return (
    <div className="todo-filters">
      {/* Status Filters */}
      <div className="filter-group">
        <label>Status:</label>
        <button
          className={filters.status === 'all' ? 'active' : ''}
          onClick={() => handleFilterChange('status', 'all')}
        >
          All
        </button>
        <button
          className={filters.status === 'active' ? 'active' : ''}
          onClick={() => handleFilterChange('status', 'active')}
        >
          Active
        </button>
        <button
          className={filters.status === 'completed' ? 'active' : ''}
          onClick={() => handleFilterChange('status', 'completed')}
        >
          Completed
        </button>
      </div>

      {/* Priority Filters */}
      <div className="filter-group">
        <label>Priority:</label>
        <button
          className={filters.priority === 'all' ? 'active' : ''}
          onClick={() => handleFilterChange('priority', 'all')}
        >
          All
        </button>
        <button
          className={filters.priority === 'high' ? 'active' : ''}
          onClick={() => handleFilterChange('priority', 'high')}
        >
          High 🔴
        </button>
        <button
          className={filters.priority === 'medium' ? 'active' : ''}
          onClick={() => handleFilterChange('priority', 'medium')}
        >
          Medium 🟡
        </button>
        <button
          className={filters.priority === 'low' ? 'active' : ''}
          onClick={() => handleFilterChange('priority', 'low')}
        >
          Low 🔵
        </button>
      </div>
    </div>
  );
};

export default TodoFilters;
