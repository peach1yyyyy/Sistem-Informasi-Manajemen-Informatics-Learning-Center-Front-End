import React, { useState, useEffect } from 'react';
import './calendar.css';

const daysOfWeek = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

const Calendar = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [events, setEvents] = useState([]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDayIndex = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  useEffect(() => {
    const taskData = JSON.parse(localStorage.getItem('tasks')) || [];
    const materiData = JSON.parse(localStorage.getItem('myLearnings')) || [];

    const combinedEvents = [];

    taskData.forEach(task => {
      combinedEvents.push({
        date: task.deadline,
        title: task.title,
        type: 'Task',
      });
    });

    materiData.forEach(materi => {
      if (materi.date) {
        combinedEvents.push({
          date: materi.date,
          title: materi.title,
          type: 'Materi',
        });
      }
    });

    setEvents(combinedEvents);
  }, [currentDate]);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const generateCalendarDays = () => {
    const days = [];

    for (let i = 0; i < firstDayIndex; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    for (let d = 1; d <= lastDate; d++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const isSunday = new Date(year, month, d).getDay() === 0;
      const isToday = today.toDateString() === new Date(year, month, d).toDateString();
      const eventsToday = events.filter(e => e.date === dateStr);

      const classes = [
        'calendar-day',
        isSunday ? 'sunday' : '',
        isToday ? 'today' : '',
        eventsToday.length > 0 ? 'has-event' : '',
      ].join(' ').trim();

      days.push(
        <div
          key={d}
          className={classes}
          title={eventsToday.map(e => `${e.type}: ${e.title}`).join('\n')}
        >
          {d}
          {eventsToday.length > 0 && <span className="event-dot" />}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>‹</button>
        <h3>{currentDate.toLocaleString('id-ID', { month: 'long' })} {year}</h3>
        <button onClick={handleNextMonth}>›</button>
      </div>
      <div className="calendar-days">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="calendar-day-name">{day}</div>
        ))}
        {generateCalendarDays()}
      </div>
    </div>
  );
};

export default Calendar;
