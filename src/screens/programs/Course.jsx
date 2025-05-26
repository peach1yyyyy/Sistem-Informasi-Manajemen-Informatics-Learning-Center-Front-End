import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import ProfileBar from '../profilebar/ProfileBar';
import DashboardHeader from '../dashboard/components/DashboardHeader';
import CourseCard from './components/CourseCard';
import './course.css';

const imageMap = {
  Course: '/images/course.png',
  Competition: '/images/competition.png',
  Seminar: '/images/seminar.png',
  Workshop: '/images/workshop.png',
};

const ProgramPage = () => {
  const [programs, setPrograms] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await fetch('http://localhost/react-backend/programs.php');
        const data = await res.json();
        setPrograms(data);
      } catch (error) {
        console.error('Fetch error:', error);
        setPrograms([]);
      }
    };
    fetchPrograms();
  }, []);

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword.toLowerCase());
  };

  const filteredPrograms = programs.filter(program =>
    program.title.toLowerCase().includes(searchKeyword) ||
    (program.description && program.description.toLowerCase().includes(searchKeyword))
  );

  return (
    <div className="course-container">
      <Sidebar />
      <div className="course-content">
        <DashboardHeader onSearch={handleSearch} />
        <div className="course-grid">
          {filteredPrograms.length === 0 && <p>No programs found.</p>}
          {filteredPrograms.map(program => (
            <CourseCard
              key={program.id}
              title={program.title}
              type={program.type}
              image={imageMap[program.type] || '/images/default.png'}
              date={program.date}
              price={program.price}
              description={program.description}
              onClick={() => setSelectedCourse(program)}
            />
          ))}
        </div>
      </div>
      <ProfileBar />

      {selectedCourse && (
        <div className="modal-overlay" onClick={() => setSelectedCourse(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <h3>{selectedCourse.title}</h3>
            <p>{selectedCourse.description || '-'}</p>
            <p><strong>Tanggal:</strong> {selectedCourse.date ? new Date(selectedCourse.date).toLocaleDateString() : '-'}</p>
            <p><strong>Harga:</strong> Rp{selectedCourse.price ?? '0'}</p>
            <p><strong>Jenis:</strong> {selectedCourse.type || '-'}</p>
            <div className="modal-buttons">
              <button
                className="pay"
                onClick={() => {
                  navigate(`/materi/detail/${selectedCourse.id}`);
                }}
              >
                Continue
              </button>
              <button className="close" onClick={() => setSelectedCourse(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgramPage;
