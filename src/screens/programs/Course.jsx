import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import ProfileBar from '../profilebar/ProfileBar';
import DashboardHeader from '../dashboard/components/DashboardHeader';
import CourseCard from './components/CourseCard';
import Filter from './components/Filter';  // Import Filter component
import './course.css';

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
  const [selectedFilter, setSelectedFilter] = useState('All');

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

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
  };

  const filteredPrograms = programs.filter((program) => {
    const matchesSearch =
      program.title.toLowerCase().includes(searchKeyword) ||
      (program.description && program.description.toLowerCase().includes(searchKeyword));

    const matchesFilter = selectedFilter === 'All' || program.type === selectedFilter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="course-container">
      <Sidebar />
      <div className="course-content">
        <DashboardHeader onSearch={handleSearch} />

        <Filter selected={selectedFilter} onSelect={handleFilterSelect} />

        <div className="course-grid">
          {filteredPrograms.length === 0 && <p>No programs found.</p>}
          {filteredPrograms.map((program) => (
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
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h3>{selectedCourse.title}</h3>
            <p>{selectedCourse.description || '-'}</p>
            <p>
              <strong>Tanggal:</strong> {formatDate(selectedCourse.date)}
            </p>
            <p>
              <strong>Harga:</strong> {formatRupiah(selectedCourse.price)}
            </p>
            <p>
              <strong>Jenis:</strong> {selectedCourse.type || '-'}
            </p>
            <div className="modal-buttons">
              <button
                className="pay"
                onClick={() => {
                  localStorage.setItem('selectedProgram', JSON.stringify(selectedCourse));
                  navigate(`/payment`);
                }}
              >
                Join
              </button>
              <button className="close" onClick={() => setSelectedCourse(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgramPage;
