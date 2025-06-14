import React from 'react';
import './coursecard.css';

// Format Rupiah
const formatRupiah = (angka) => {
  if (!angka) return 'Rp. 0,00';
  const number = Number(angka);
  return 'Rp. ' + number.toLocaleString('id-ID') + ',00';
};

// Format tanggal: 27 Mei 2025
const formatDate = (dateStr) => {
  if (!dateStr) return '-';
  const date = new Date(dateStr);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return date.toLocaleDateString('id-ID', options);
};

const CourseCard = ({ title, type, image, date, price, description, onClick }) => {
  return (
    <div className="course-card" onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      <img
        src={image || 'https://via.placeholder.com/150'}
        alt={title || 'Program Image'}
        className="course-image"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://via.placeholder.com/150';
        }}
      />
      <div className="course-info">
        <h3 className="course-title">{title}</h3>
        <p className="course-description">{description || '-'}</p>
        <div className="course-meta">
          <p><span role="img" aria-label="calendar">📅</span> {formatDate(date)}</p>
          <p><span role="img" aria-label="money">💰</span> {formatRupiah(price)}</p>
          <p><span role="img" aria-label="type">📝</span> {type || '-'}</p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
