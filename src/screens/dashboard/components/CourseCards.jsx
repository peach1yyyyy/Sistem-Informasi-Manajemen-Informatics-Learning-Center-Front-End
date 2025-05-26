import React, { useEffect, useState } from 'react';
import './coursecards.css';
import { useNavigate } from 'react-router-dom';

const CourseCards = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('programs');
    if (saved) {
      let parsed = JSON.parse(saved);

      let updated = false;
      parsed = parsed.map(item => {
        if (item.progress === undefined) {
          updated = true;
          return { ...item, progress: Math.floor(Math.random() * 101) };
        }
        return item;
      });

      if (updated) {
        localStorage.setItem('programs', JSON.stringify(parsed));
      }

      if (parsed.length > 0 && parsed[0].date) {
        parsed = parsed.sort((a, b) => new Date(b.date) - new Date(a.date));
      }

      setCourses(parsed.slice(0, 2));
    }
  }, []);

  const handleCardClick = (id) => {
    navigate(`/materi/detail/${id}`);
  };

  if (courses.length === 0) {
    return <div className="course-cards"><p>Tidak ada materi terbaru.</p></div>;
  }

  return (
    <div className="course-cards">
      <div className="cards-container">
        {courses.map(course => (
          <div
            key={course.id}
            className="card"
            onClick={() => handleCardClick(course.id)}
            style={{ cursor: 'pointer' }}
          >
            <h3>{course.title}</h3>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
            <p>{course.progress}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseCards;
