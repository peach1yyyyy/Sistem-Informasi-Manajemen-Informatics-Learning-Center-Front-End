import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../../sidebar/Sidebar';
import ProfileBar from '../../profilebar/ProfileBar';
import './materidetailpage.css';

// Ambil video ID dari berbagai format YouTube
const extractYoutubeVideoId = (url) => {
  if (!url) return null;
  const regex = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

const getYoutubeEmbedUrl = (url) => {
  const videoId = extractYoutubeVideoId(url);
  return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
};

const MateriDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [materi, setMateri] = useState(null);
  const [modules, setModules] = useState([]);

  useEffect(() => {
    if (!id) return;

    // Ambil program dari localStorage
    const savedPrograms = localStorage.getItem('programs');
    if (savedPrograms) {
      const programs = JSON.parse(savedPrograms);
      const foundProgram = programs.find((p) => String(p.id) === String(id));
      setMateri(foundProgram);
    }

    // Ambil modules dari localStorage
    const savedModules = localStorage.getItem(`modules_program_${id}`);
    setModules(savedModules ? JSON.parse(savedModules) : []);
  }, [id]);

  if (!id) {
    return <div style={{ padding: "2rem", color: "white" }}>ID program tidak ditemukan.</div>;
  }

  return (
    <div className="materi-detail-layout">
      <Sidebar />
      <div className="materi-detail-main">
        <div className="materi-header">
          <h2 className="materi-detail-title">
            Materi Program
            {/* Materi Program {materi?.title || "(Nama Program Tidak Ditemukan)"} */}
          </h2>
          <button className="back-button" onClick={() => navigate(-1)}>Back</button>
        </div>

        <div className="materi-detail-modules">
          {modules.length === 0 ? (
            <p style={{ color: "#ccc" }}>Belum ada modul untuk program ini.</p>
          ) : (
            modules.map((modul, idx) => (
              <details key={idx} className="modul-dropdown">
                <summary>{modul.name || `Modul ${modul.module_number || idx + 1}`}</summary>
                <div className="modul-content">
                  {/* File PDF */}
                  {modul.fileName?.endsWith('.pdf') && (
                    <iframe 
                      src={modul.file} 
                      width="100%" 
                      height="500px" 
                      title={`PDF Modul ${modul.name || idx + 1}`} 
                    />
                  )}

                  {/* Gambar */}
                  {modul.fileName?.match(/\.(jpg|jpeg|png|gif)$/i) && (
                    <img src={modul.file} alt={modul.name} className="modul-image" />
                  )}

                  {/* Video */}
                  {modul.fileName?.match(/\.(mp4|webm|ogg)$/i) && (
                    <video controls width="100%">
                      <source src={modul.file} type="video/mp4" />
                      Browser tidak mendukung video.
                    </video>
                  )}

                  {/* YouTube langsung tampil iframe */}
                  {modul.youtube_link && getYoutubeEmbedUrl(modul.youtube_link) && (
                    <div className="youtube-embed" style={{ marginTop: '1rem' }}>
                      <iframe
                        width="100%"
                        height="315"
                        src={getYoutubeEmbedUrl(modul.youtube_link)}
                        title="YouTube Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  )}

                  {/* Jika tidak ada file dan link */}
                  {!modul.file && !modul.youtube_link && (
                    <p>Tidak ada file atau link diunggah untuk modul ini.</p>
                  )}
                </div>
              </details>
            ))
          )}
        </div>
      </div>
      <ProfileBar />
    </div>
  );
};

export default MateriDetailPage;
