import React, { useState, useEffect } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import id from 'date-fns/locale/id';
import 'react-datepicker/dist/react-datepicker.css';
import './admin.css';

registerLocale('id', id);

const AddCertificateModal = ({ onClose, onSave, defaultData }) => {
  const [nama, setNama] = useState('');
  const [tanggal, setTanggal] = useState(null); // simpan Date object

  useEffect(() => {
    if (defaultData) {
      setNama(defaultData.nama || '');

      if (defaultData.tanggal) {
        const d = new Date(defaultData.tanggal);
        setTanggal(isNaN(d) ? null : d);
      } else {
        setTanggal(null);
      }
    } else {
      setNama('');
      setTanggal(null);
    }
  }, [defaultData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      nama,
      tanggal: tanggal ? tanggal.toISOString().split('T')[0] : '',
    };
    onSave(data);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{defaultData ? 'Update Sertifikat' : 'Tambah Sertifikat Baru'}</h2>
        <form onSubmit={handleSubmit}>
          <label>Nama Sertifikat</label>
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            required
            className="input-text"
          />

          <label>Tanggal Terbit</label>
          <DatePicker
            selected={tanggal}
            onChange={(date) => setTanggal(date)}
            dateFormat="dd MMMM yyyy"
            locale="id"
            placeholderText="Pilih tanggal"
            required
            className="input-text"
          />

          <div className="modal-actions">
            <button type="submit" className="admin-btn add">
              Simpan
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

export default AddCertificateModal;
