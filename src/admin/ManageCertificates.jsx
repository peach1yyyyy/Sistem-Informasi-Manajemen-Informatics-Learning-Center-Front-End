import React, { useState, useEffect } from 'react';
import AdminSidebar from './AdminSidebar';
import AddCertificateModal from './AddCertificateModal';
import './admin.css';

const ManageCertificate = () => {
  const [certificates, setCertificates] = useState(() => {
    const savedData = localStorage.getItem('certificates');
    return savedData ? JSON.parse(savedData) : [];
  });

  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem('certificates', JSON.stringify(certificates));
  }, [certificates]);

  const handleAdd = () => {
    setEditIndex(null);
    setShowModal(true);
  };

  const handleSave = (newData) => {
    if (editIndex !== null) {
      const updated = [...certificates];
      updated[editIndex] = newData;
      setCertificates(updated);
    } else {
      setCertificates([...certificates, newData]);
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setShowModal(true);
  };

  const handleDelete = (index) => {
    const updated = certificates.filter((_, i) => i !== index);
    setCertificates(updated);
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
        <h1>Kelola Sertifikat</h1>
        <div className="admin-actions">
          <button className="admin-btn add" onClick={handleAdd}>
            Tambah Sertifikat
          </button>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Nama Sertifikat</th>
              <th>Tanggal</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {certificates.map((item, index) => (
              <tr key={index}>
                <td>{item.nama}</td>
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
          <AddCertificateModal
            onClose={() => setShowModal(false)}
            onSave={handleSave}
            defaultData={editIndex !== null ? certificates[editIndex] : null}
          />
        )}
      </div>
    </div>
  );
};

export default ManageCertificate;
