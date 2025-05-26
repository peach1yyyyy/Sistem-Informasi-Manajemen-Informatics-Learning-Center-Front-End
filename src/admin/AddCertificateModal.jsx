import React, { useState, useEffect } from 'react';
import './admin.css';

const AddCertificateModal = ({ onClose, onSave, defaultData }) => {
  const [nama, setNama] = useState('');
  const [tanggal, setTanggal] = useState('');

  useEffect(() => {
    if (defaultData) {
      setNama(defaultData.nama);
      setTanggal(defaultData.tanggal);
    }
  }, [defaultData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ nama, tanggal });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{defaultData ? 'Update Sertifikat' : 'Tambah Sertifikat Baru'}</h2>
        <form onSubmit={handleSubmit}>
          <label>Nama Sertifikat</label>
          <input type="text" value={nama} onChange={(e) => setNama(e.target.value)} required />

          <label>Tanggal Terbit</label>
          <input type="date" value={tanggal} onChange={(e) => setTanggal(e.target.value)} required />

          <div className="modal-actions">
            <button type="submit" className="admin-btn add">Simpan</button>
            <button type="button" className="admin-btn delete" onClick={onClose}>Batal</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCertificateModal;
