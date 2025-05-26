import React from 'react';
import './coursecard.css';

const CourseCard = ({ title, type, image, date, price, description, onClick }) => {
  return (
    <div className="course-card" onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      <img
        src={image || 'https://via.placeholder.com/150'}
        alt={title || 'Program Image'}
        className="course-image"
        onError={e => {
          e.target.onerror = null;
          e.target.src = 'https://via.placeholder.com/150';
        }}
      />
      <div className="course-info">
        <h3 className="course-title">{title}</h3>
        <p className="course-description">{description || '-'}</p>
        <div className="course-meta">
          <p><span role="img" aria-label="calendar">📅</span> {date ? new Date(date).toLocaleDateString() : '-'}</p>
          <p><span role="img" aria-label="money">💰</span> Rp{price ?? '0'}</p>
          <p><span role="img" aria-label="type">📝</span> {type || '-'}</p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
