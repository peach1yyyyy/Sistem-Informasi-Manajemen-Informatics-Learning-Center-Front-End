import React, { useState, useEffect } from 'react';
import AdminSidebar from './AdminSidebar';
import AddProgramModal from './AddProgramModal';
import './admin.css';

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });
};

const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
};

const ManagePrograms = () => {
  const [programs, setPrograms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editProgram, setEditProgram] = useState(null);

  const fetchPrograms = async () => {
    const res = await fetch('http://localhost/react-backend/programs.php');
    const data = await res.json();
    setPrograms(data);
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const handleAdd = () => {
    setEditProgram(null);
    setShowModal(true);
  };

  const handleSave = async (programData) => {
    if (editProgram) {
      await fetch('http://localhost/react-backend/programs.php', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...programData, id: editProgram.id }),
      });
    } else {
      await fetch('http://localhost/react-backend/programs.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(programData),
      });
    }
    setShowModal(false);
    fetchPrograms();
  };

  const handleEdit = (program) => {
    setEditProgram(program);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus program ini?')) {
      await fetch('http://localhost/react-backend/programs.php', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      fetchPrograms();
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <AdminSidebar />
      <div className="admin-page scroll-hidden" style={{ flex: 1 }}>
        <h1>Kelola Program</h1>
        <div className="admin-actions">
          <button className="admin-btn add" onClick={handleAdd}>Tambah Program</button>
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Judul Program</th>
              <th>Deskripsi</th>
              <th>Tanggal</th>
              <th>Jenis</th>
              <th>Harga</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {programs.map((program) => (
              <tr key={program.id}>
                <td>{program.title}</td>
                <td>{program.description}</td>
                <td>{formatDate(program.date)}</td>
                <td>{program.type}</td>
                <td>{formatRupiah(program.price)}</td>
                <td>
                  <button className="admin-btn edit" onClick={() => handleEdit(program)}>Update</button>
                  <button className="admin-btn delete" onClick={() => handleDelete(program.id)}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showModal && (
          <AddProgramModal
            onClose={() => setShowModal(false)}
            onSave={handleSave}
            defaultData={editProgram}
          />
        )}
      </div>
    </div>
  );
};

export default ManagePrograms;
