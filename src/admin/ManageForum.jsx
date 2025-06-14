import React, { useState, useEffect } from 'react';
import AdminSidebar from './AdminSidebar';
import AddForumModal from './AddForumModal';
import './admin.css';

const ManageForum = () => {
  const [forums, setForums] = useState(() => {
    const saved = localStorage.getItem('forums');
    return saved ? JSON.parse(saved) : [];
  });

  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem('forums', JSON.stringify(forums));
  }, [forums]);

  const handleAdd = () => {
    setEditIndex(null);
    setShowModal(true);
  };

  const handleSave = (data) => {
    if (editIndex !== null) {
      const updated = [...forums];
      updated[editIndex] = data;
      setForums(updated);
    } else {
      setForums([...forums, data]);
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setShowModal(true);
  };

  const handleDelete = (index) => {
    const updated = forums.filter((_, i) => i !== index);
    setForums(updated);
  };

  // Fungsi format tanggal ke "dd MMMM yyyy" dalam Bahasa Indonesia
  const formatTanggal = (tanggal) => {
    if (!tanggal) return '–';
    const dateObj = new Date(tanggal);
    if (isNaN(dateObj)) return tanggal; // fallback kalau bukan tanggal valid

    return dateObj.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div style={{ display: 'flex' }}>
      <AdminSidebar />
      <div className="admin-page scroll-hidden" style={{ flex: 1 }}>
        <h1>Kelola Forum</h1>
        <div className="admin-actions">
          <button className="admin-btn add" onClick={handleAdd}>
            Tambah Forum
          </button>
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Judul Forum</th>
              <th>Tanggal</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {forums.map((item, index) => (
              <tr key={index}>
                <td>{item.judul}</td>
                <td>{formatTanggal(item.tanggal)}</td>
                <td>
                  <button
                    className="admin-btn edit"
                    onClick={() => handleEdit(index)}
                  >
                    Update
                  </button>
                  <button
                    className="admin-btn delete"
                    onClick={() => handleDelete(index)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showModal && (
          <AddForumModal
            onClose={() => setShowModal(false)}
            onSave={handleSave}
            defaultData={editIndex !== null ? forums[editIndex] : null}
          />
        )}
      </div>
    </div>
  );
};

export default ManageForum;
