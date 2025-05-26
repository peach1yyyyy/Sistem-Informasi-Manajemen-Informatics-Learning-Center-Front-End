import React, { useState } from 'react';
import './calendar.css';

const daysOfWeek = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

const Calendar = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDayIndex = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const generateCalendarDays = () => {
    const days = [];

    // Padding awal
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Tanggal bulan ini
    for (let d = 1; d <= lastDate; d++) {
      const isToday =
        d === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear();

      days.push(
        <div
          key={d}
          className={`calendar-day${isToday ? ' today' : ''}`}
        >
          {d}
        </div>
      );
    }

    return days;
  };

  return (
        <div className="calendar-container">
            <div className="calendar-header">
                <button onClick={handlePrevMonth}>‹</button>
                <h3>
                {currentDate.toLocaleString('id-ID', { month: 'long' })} {year}
                </h3>
                <button onClick={handleNextMonth}>›</button>
            </div>
            <div className="calendar-days">
                {daysOfWeek.map((day, i) => (
                <div key={i} className="calendar-day-name">{day}</div>
                ))}
                {generateCalendarDays()}
            </div>
        </div>
  );
};

export default Calendar;
