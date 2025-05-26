import React, { useState, useEffect } from 'react';
import './admin.css';

const AddForumModal = ({ onClose, onSave, defaultData }) => {
  const [judul, setJudul] = useState('');
  const [urutan, setUrutan] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [subforumInput, setSubforumInput] = useState('');
  const [subforumList, setSubforumList] = useState([]);

  useEffect(() => {
    if (defaultData) {
      setJudul(defaultData.judul || '');
      setUrutan(defaultData.urutan || '');
      setTanggal(defaultData.tanggal || '');
      setSubforumList(defaultData.subforum || []);
    }
  }, [defaultData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      judul,
      urutan,
      tanggal,
      subforum: subforumList,
    };
    onSave(data);
    onClose();
  };

  const handleAddSubforum = () => {
    if (subforumInput.trim() !== '') {
      setSubforumList([...subforumList, subforumInput.trim()]);
      setSubforumInput('');
    }
  };

  const handleRemoveSubforum = (index) => {
    const updated = subforumList.filter((_, i) => i !== index);
    setSubforumList(updated);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{defaultData ? 'Edit Forum' : 'Tambah Forum Baru'}</h2>
        <form onSubmit={handleSubmit}>
          <label>Judul Forum</label>
          <input type="text" value={judul} onChange={(e) => setJudul(e.target.value)} required />

          <label>Urutan</label>
          <input type="number" value={urutan} onChange={(e) => setUrutan(e.target.value)} required />

          <label>Tanggal</label>
          <input type="date" value={tanggal} onChange={(e) => setTanggal(e.target.value)} required />

          <label>Subforum</label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              value={subforumInput}
              onChange={(e) => setSubforumInput(e.target.value)}
              placeholder="Tambah subforum"
            />
            <button type="button" className="admin-btn add" onClick={handleAddSubforum}>+</button>
          </div>

          {subforumList.length > 0 && (
            <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
              {subforumList.map((sf, index) => (
                <li key={index}>
                  {sf}
                  <button type="button" onClick={() => handleRemoveSubforum(index)} style={{ marginLeft: '10px' }}>
                    ❌
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="modal-actions">
            <button type="submit" className="admin-btn add">Simpan</button>
            <button type="button" className="admin-btn delete" onClick={onClose}>Batal</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddForumModal;
