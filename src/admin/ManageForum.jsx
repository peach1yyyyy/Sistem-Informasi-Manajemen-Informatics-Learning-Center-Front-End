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

  return (
    <div style={{ display: 'flex' }}>
      <AdminSidebar />
      <div className="admin-page scroll-hidden" style={{ flex: 1 }} >
        <h1>Kelola Forum</h1>
        <div className="admin-actions">
          <button className="admin-btn add" onClick={handleAdd}>Tambah Forum</button>
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Judul Forum</th>
              <th>Urutan</th>
              <th>Tanggal</th>
              <th>Subforum</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {forums.map((item, index) => (
              <React.Fragment key={index}>
                <tr>
                  <td>{item.judul}</td>
                  <td>{item.urutan}</td>
                  <td>{item.tanggal}</td>
                  <td>
                    {item.subforum?.length > 0 ? (
                      <ul style={{ paddingLeft: '16px' }}>
                        {item.subforum.map((sub, idx) => (
                          <li key={idx}>{sub}</li>
                        ))}
                      </ul>
                    ) : '–'}
                  </td>
                  <td>
                    <button className="admin-btn edit" onClick={() => handleEdit(index)}>Update</button>
                    <button className="admin-btn delete" onClick={() => handleDelete(index)}>Hapus</button>
                  </td>
                </tr>
              </React.Fragment>
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
