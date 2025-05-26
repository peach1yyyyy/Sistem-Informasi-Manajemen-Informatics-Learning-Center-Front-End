import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './homepage.css';

const programs = [
  { title: 'ReactJS Dasar', type: 'Course', date: '2025-06-01', harga: '50.000' },
  { title: 'Workshop UI/UX', type: 'Workshop', date: '2025-06-05', harga: '60.000' },
  { title: 'Data Science Intro', type: 'Seminar', date: '2025-06-10', harga: '85.000' },
  { title: 'AI Challenge 2025', type: 'Competition', date: '2025-06-15', harga: '75.000' }
];

const HomePage = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  const aboutRef = useRef(null);
  const programRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToRef = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handler klik card
  const handleCardClick = () => {
    navigate('/login');
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <nav className={`home-navbar ${scrolled ? 'scrolled' : ''}`}>
          <div className="home-logo-container">
            <img src="/images/logo2.png" alt="ILC Logo" className="ilc-logo" />
            <span className="home-logo-text glow">Informatics Learning Center</span>
          </div>
          <div className="home-nav-buttons">
            <button className="auth-btn" onClick={() => scrollToRef(aboutRef)}>About</button>
            <button className="auth-btn" onClick={() => scrollToRef(programRef)}>Programs</button>
            <button onClick={() => navigate('/login')} className="auth-btn">Sign In</button>
            <button onClick={() => navigate('/register')} className="auth-btn">Sign Up</button>
          </div>
        </nav>
        <h1>Selamat Datang di ILC</h1>
        <p className="subheadline">
          Belajar teknologi kekinian, berbagi ilmu bersama komunitas, dan tumbuh menjadi talenta digital masa depan.
        </p>
      </header>

      <section className="ilc-intro-section" ref={aboutRef}>
        <h2 className="section-title">Tentang ILC</h2>
        <div className="ilc-intro-banner">
          <div className="intro-content">
            <p>
              <strong>Informatics Learning Center (ILC)</strong> adalah wadah pembelajaran mandiri dan kolaboratif
              bagi mahasiswa Teknik Informatika UNTAN. Kami menghadirkan berbagai program menarik seperti pelatihan,
              workshop, seminar, hingga kompetisi untuk mengasah kemampuan digital serta memperluas wawasanmu di bidang teknologi terkini.
            </p>
          </div>
        </div>
      </section>

      <section className="carousel-section" ref={programRef}>
        <h2>Program Unggulan</h2>
        <div className="carousel">
          {programs.map((program, index) => (
            <div 
              key={index} 
              className="carousel-card"
              onClick={handleCardClick}
              style={{ cursor: 'pointer' }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') handleCardClick(); }}
            >
              <h3>{program.title}</h3>
              <p><strong>Jenis:</strong> {program.type}</p>
              <p><strong>Tanggal:</strong> {program.date}</p>
              <p><strong>Harga:</strong> Rp{program.harga}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="home-footer">
        <div>
          <h4>Kontak Kami</h4>
          <p>Email: info@informatika.untan.ac.id</p>
          <p>Telepon: 0878-181-20209</p>
          <p>Alamat: Jl. Prof. Dr. H. Hadari Nawawi, Pontianak</p>
          <p>© 2025 ILC. All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
