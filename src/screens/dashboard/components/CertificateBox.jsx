import React from 'react';
import { useNavigate } from 'react-router-dom';
import './certificatebox.css';

const sampleCertificates = [
  { id: 1, title: "Front-End Web Development", img: "/images/sertif1.png" },
  { id: 2, title: "Machine Learning Dasar", img: "/images/sertif2.png" },
];

const CertificateBox = () => {
  const navigate = useNavigate();

  return (
    <div className="certificate-box" onClick={() => navigate('/certificates')}>
      <div className="certificate-box-content">
        <h3>Sertifikat Saya</h3>
        <div className="certificate-card-preview-container">
          {sampleCertificates.map(cert => (
            <div className="certificate-card-preview" key={cert.id}>
              <img src={cert.img} alt={cert.title} />
              <div className="certificate-card-preview-text">
                <span>{cert.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="certificate-box-icon">🎓</div>
    </div>
  );
};

export default CertificateBox;
