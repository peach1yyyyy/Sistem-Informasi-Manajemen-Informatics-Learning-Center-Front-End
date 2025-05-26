import React from 'react';
import './filter.css';

const Filter = ({ selected, onSelect }) => {
  const filters = ['All', 'Course', 'Seminar', 'Workshop', 'Competition'];

  return (
    <div className="course-filter">
      {filters.map((filter) => (
        <button
          key={filter}
          className={`filter-button ${selected === filter ? 'active' : ''}`}
          onClick={() => onSelect(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default Filter;
