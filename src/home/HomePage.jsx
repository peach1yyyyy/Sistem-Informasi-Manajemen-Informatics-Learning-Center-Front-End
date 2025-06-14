import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './homepage.css';

const programs = [
  { title: 'ReactJS Dasar', type: 'Course', date: '2025-06-01', harga: 50000 },
  { title: 'NextJS Lanjutan', type: 'Course', date: '2025-06-15', harga: 70000 },
  { title: 'VueJS untuk Pemula', type: 'Course', date: '2025-06-12', harga: 55000 },
  { title: 'NodeJS Intermediate', type: 'Course', date: '2025-06-22', harga: 65000 },
  { title: 'Workshop UI/UX', type: 'Workshop', date: '2025-06-05', harga: 60000 },
  { title: 'Figma Pro Design', type: 'Workshop', date: '2025-06-20', harga: 65000 },
  { title: 'Design Sprint', type: 'Workshop', date: '2025-06-25', harga: 70000 },
  { title: 'Data Science Intro', type: 'Seminar', date: '2025-06-10', harga: 85000 },
  { title: 'Tech Future Talk', type: 'Seminar', date: '2025-06-18', harga: 80000 },
  { title: 'AI Ethics Seminar', type: 'Seminar', date: '2025-06-27', harga: 82000 },
  { title: 'AI Challenge 2025', type: 'Competition', date: '2025-06-15', harga: 75000 },
  { title: 'Hackathon UNTAN', type: 'Competition', date: '2025-06-25', harga: 100000 },
  { title: 'Code Arena', type: 'Competition', date: '2025-06-30', harga: 90000 },
  { title: 'UI/UX Seminar', type: 'Seminar', date: '2025-06-27', harga: 98000 },
  { title: 'NLP Challenge 2025', type: 'Competition', date: '2025-06-15', harga: 50000 },
  { title: 'NodeJS Advanced', type: 'Course', date: '2025-06-22', harga: 135000 },
  { title: 'Workshop ReactJS', type: 'Workshop', date: '2025-06-05', harga: 68000 },
];

const programDescriptions = {
  Course: 'Pelatihan intensif untuk meningkatkan keterampilan teknis secara bertahap dan terstruktur.',
  Workshop: 'Sesi praktikal dan interaktif untuk memperdalam pemahaman lewat praktik langsung.',
  Seminar: 'Diskusi dan presentasi bersama ahli untuk memperluas wawasan di bidang teknologi terkini.',
  Competition: 'Ajang kompetitif untuk menguji kemampuan dan kreativitas dalam dunia nyata.',
};

const formatDate = (dateStr) => {
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year}`;
};

const formatHarga = (harga) => {
  if (harga === 0 || harga === 'Gratis') return 'Gratis';
  return `Rp ${harga.toLocaleString('id-ID', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

const HomePage = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const aboutRef = useRef(null);
  const programRef = useRef(null);
  const contactRef = useRef(null);

  // ✅ Carousel refs untuk masing-masing program type
  const courseRef = useRef(null);
  const workshopRef = useRef(null);
  const seminarRef = useRef(null);
  const competitionRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToRef = (ref) => ref.current?.scrollIntoView({ behavior: 'smooth' });
  const handleCardClick = () => navigate('/login');

  const scrollContainer = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = 300;
      ref.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  // ✅ Sekarang menerima ref dari luar
  const renderProgramSection = (type, carouselRef) => {
    const filteredPrograms = programs.filter(p => p.type === type);

    return (
      <div className="program-type-section">
        <h3>{type}</h3>
        <p className="program-desc">{programDescriptions[type]}</p>
        <div className="carousel-wrapper">
          <button className="carousel-arrow left" onClick={() => scrollContainer(carouselRef, 'left')}>&#8249;</button>
          <div className="carousel-scroll" ref={carouselRef}>
            {filteredPrograms.map((program, idx) => (
              <div
                key={idx}
                className="carousel-card enhanced-card"
                onClick={handleCardClick}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleCardClick()}
              >
                <div className="card-content">
                  <h4 className="card-title">{program.title}</h4>
                  <p><strong>Tanggal:</strong> {formatDate(program.date)}</p>
                  <p><strong>Harga:</strong> {formatHarga(program.harga)}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="carousel-arrow right" onClick={() => scrollContainer(carouselRef, 'right')}>&#8250;</button>
        </div>
      </div>
    );
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
            <button className="auth-btn" onClick={() => scrollToRef(contactRef)}>Contact</button>
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
        {renderProgramSection('Course', courseRef)}
        {renderProgramSection('Workshop', workshopRef)}
        {renderProgramSection('Seminar', seminarRef)}
        {renderProgramSection('Competition', competitionRef)}
      </section>

      <section className="contact-section" ref={contactRef}>
        <h2>Hubungi Kami</h2>
        <p>Kami siap membantu kamu. Silakan hubungi kami melalui form di bawah ini atau kontak langsung!</p>
        <div className="contact-form">
          <input type="text" placeholder="Nama Lengkap" />
          <input type="email" placeholder="Email" />
          <textarea placeholder="Pesan Anda" rows="4" />
          <button className="submit-btn">Kirim Pesan</button>
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
