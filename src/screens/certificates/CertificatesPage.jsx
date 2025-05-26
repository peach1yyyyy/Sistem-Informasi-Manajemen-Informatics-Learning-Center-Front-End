import React from 'react';
import './certificatespage.css';
import Sidebar from '../sidebar/Sidebar';
import ProfileBar from '../profilebar/ProfileBar';

const certificates = [
  { id: 1, title: "Front-End Web Development", issued: "10 April 2025" },
  { id: 2, title: "Machine Learning Dasar", issued: "28 Maret 2025" },
  { id: 3, title: "Pemrograman Python Lanjutan", issued: "18 Februari 2025" },
  { id: 4, title: "Manajemen Proyek Agile", issued: "5 Januari 2025" },
  { id: 5, title: "Dasar Kecerdasan Buatan", issued: "20 Desember 2024" }
];

const CertificatesPage = () => {
  const getImageById = (id) => {
    return id % 2 === 0
      ? '/images/sertif2.png' // genap
      : '/images/sertif1.png'; // ganjil
  };

  return (
    <div className="certificates-layout">
      <Sidebar />
      <div className="certificates-main">
        <div className="certificates-container">
          <h2 className="certificates-title">Sertifikat Saya</h2>
          <div className="certificates-grid">
            {certificates.map(cert => (
              <div className="certificate-card" key={cert.id}>
                <img
                  src={getImageById(cert.id)}
                  alt={cert.title}
                  className="certificate-image"
                />
                <div className="certificate-content">
                  <h3>{cert.title}</h3>
                  <p>Diterbitkan: {cert.issued}</p>
                  <button className="download-button">Download</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ProfileBar />
    </div>
  );
};

export default CertificatesPage;
