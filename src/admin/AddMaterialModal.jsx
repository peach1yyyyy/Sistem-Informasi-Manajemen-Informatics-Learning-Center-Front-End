import React, { useState, useEffect } from 'react';
import './admin.css';

const AddMaterialModal = ({ onClose, onSave, defaultData, programId }) => {
  const [moduleNumber, setModuleNumber] = useState('');
  const [youtubeLink, setYoutubeLink] = useState('');

  useEffect(() => {
    if (defaultData) {
      setModuleNumber(defaultData.module_number || '');
      setYoutubeLink(defaultData.youtube_link || '');
    } else {
      setModuleNumber('');
      setYoutubeLink('');
    }
  }, [defaultData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!moduleNumber || !youtubeLink) {
      alert('Nomor modul dan link YouTube harus diisi!');
      return;
    }

    // Optional: Validasi sederhana YouTube link
    const ytRegex = /(youtube\.com|youtu\.be)/;
    if (!ytRegex.test(youtubeLink)) {
      alert('Link harus berupa URL YouTube yang valid!');
      return;
    }

    onSave({
      id: defaultData ? defaultData.id : undefined,
      program_id: programId,
      module_number: Number(moduleNumber), // pastikan tipe number
      youtube_link: youtubeLink.trim(),
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{defaultData ? 'Update Modul' : 'Tambah Modul'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nomor Modul</label>
            <input
              type="number"
              min="1"
              value={moduleNumber}
              onChange={(e) => setModuleNumber(e.target.value)}
              placeholder="Contoh: 1"
              required
            />
          </div>
          <div className="form-group">
            <label>Link YouTube</label>
            <input
              type="text"
              placeholder="https://youtube.com/..."
              value={youtubeLink}
              onChange={(e) => setYoutubeLink(e.target.value)}
              required
            />
          </div>

          <div className="modal-actions">
            <button type="submit" className="admin-btn edit">
              {defaultData ? 'Update' : 'Simpan'}
            </button>
            <button type="button" className="admin-btn delete" onClick={onClose}>
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMaterialModal;
