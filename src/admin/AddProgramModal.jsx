// AddProgramModal.jsx
import React, { useState, useEffect } from 'react';
import './admin.css';

const AddProgramModal = ({ onClose, onSave, defaultData }) => {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    type: 'Course',
    price: '',
  });
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (defaultData) {
      setFormData({
        title: defaultData.title,
        date: defaultData.date,
        type: defaultData.type,
        price: defaultData.price,
      });
      setDescription(defaultData.description || '');
    }
  }, [defaultData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullData = {
      ...formData,
      description,
    };
    onSave(fullData);
    onClose();
  };

  return (
    <div className="modal-overlay scroll-hidden">
      <div className="modal-content scroll-hidden">
        <h2>{defaultData ? 'Update Program' : 'Tambah Program'}</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <input
            type="text"
            name="title"
            placeholder="Judul Program"
            value={formData.title}
            onChange={handleChange}
            required
          />

          {/* Deskripsi */}
          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Deskripsi Program
            </label>
            <textarea
              id="description"
              className="form-textarea scroll-hidden w-full p-2 border border-gray-300 rounded resize-none h-20"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Masukkan deskripsi singkat program..."
            />
          </div>


          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />

          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="Course">Course</option>
            <option value="Seminar">Seminar</option>
            <option value="Competition">Competition</option>
            <option value="Workshop">Workshop</option>
          </select>

          <input
            type="number"
            name="price"
            placeholder="Harga Program (Rp)"
            value={formData.price}
            onChange={handleChange}
            required
            min="10000"
            step="1"
          />

          <div className="modal-actions">
            <button type="submit" className="admin-btn add">Simpan</button>
            <button type="button" className="admin-btn delete" onClick={onClose}>Batal</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProgramModal;
