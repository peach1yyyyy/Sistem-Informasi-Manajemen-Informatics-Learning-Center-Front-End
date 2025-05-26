import React, { useState, useEffect } from 'react';
import AdminSidebar from './AdminSidebar';
import './admin.css';

const ManageContact = () => {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('userFeedback');
    return saved ? JSON.parse(saved) : [
      {
        nama: 'Ani',
        pesan: 'Saya mengalami masalah saat login.',
        tanggapan: '',
      },
    ];
  });

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [responseText, setResponseText] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    localStorage.setItem('userFeedback', JSON.stringify(messages));
  }, [messages]);

  const handleRespond = (index) => {
    setSelectedIndex(index);
    setResponseText(messages[index].tanggapan || '');
    setShowModal(true);
  };

  const handleSaveResponse = () => {
    const updated = [...messages];
    updated[selectedIndex].tanggapan = responseText;
    setMessages(updated);
    setShowModal(false);
  };

  return (
    <div style={{ display: 'flex' }}>
      <AdminSidebar />
      <div className="admin-page scroll-hidden" style={{ flex: 1 }}>
        <h1>Pesan dari Pengguna</h1>
        <ul className="admin-list contact">
          {messages.map((item, index) => (
            <li className="admin-list-item contact" key={index}>
              <div>
                <div className="admin-list-item-title">Dari: {item.nama}</div>
                <div className="admin-contact-message">{item.pesan}</div>
                {item.tanggapan && (
                  <div className="admin-contact-response">
                    <strong>Tanggapan:</strong> {item.tanggapan}
                  </div>
                )}
              </div>
              <div className="admin-list-buttons">
                <button className="admin-btn edit" onClick={() => handleRespond(index)}>
                  {item.tanggapan ? 'Edit Tanggapan' : 'Tanggapi'}
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Modal Tanggapan */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Tanggapi Pengguna</h2>
              <textarea
                rows="5"
                placeholder="Tulis tanggapan Anda di sini..."
                value={responseText}
                onChange={(e) => setResponseText(e.target.value)}
                style={{ width: '100%', padding: '10px', fontSize: '1rem' }}
              />
              <div className="modal-actions" style={{ marginTop: '1rem' }}>
                <button className="admin-btn add" onClick={handleSaveResponse}>Kirim</button>
                <button className="admin-btn delete" onClick={() => setShowModal(false)} style={{ marginLeft: '1rem' }}>
                  Batal
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageContact;
