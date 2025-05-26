import React, { useState, useEffect } from 'react';
import AdminSidebar from './AdminSidebar';
import './admin.css';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [deletedUsers, setDeletedUsers] = useState([]);

  // Ambil data user dari backend
  const fetchUsers = () => {
    fetch('http://localhost/react-backend/getUsers.php')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setUsers(data.users || []);
          setDeletedUsers(data.deletedUsers || []);
        } else {
          alert('Gagal mengambil data pengguna: ' + data.message);
        }
      })
      .catch(err => {
        alert('Terjadi kesalahan: ' + err.message);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Update status user di DB
  const updateUserStatus = (id, status) => {
    fetch('http://localhost/react-backend/updateUserStatus.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          fetchUsers();
        } else {
          alert('Gagal memperbarui status user: ' + data.message);
        }
      })
      .catch(err => alert('Error: ' + err.message));
  };

  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menonaktifkan pengguna ini?")) {
      updateUserStatus(id, 'deleted');
    }
  };

  const handleRestore = (id) => {
    updateUserStatus(id, 'active');
  };

  return (
    <div style={{ display: 'flex' }}>
      <AdminSidebar />
      <div className="admin-page scroll-hidden" style={{ flex: 1 }}>
        <h1>Kelola Pengguna</h1>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Nama</th>
              <th>Email</th>
              <th>Peran</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button className="admin-btn payment-cancel" onClick={() => handleDelete(user.id)}>Hapus</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center' }}>Tidak ada pengguna aktif.</td>
              </tr>
            )}
          </tbody>
        </table>

        {deletedUsers.length > 0 && (
          <>
            <h1 style={{ marginTop: '30px' }}>Pengguna Terhapus</h1>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Email</th>
                  <th>Peran</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {deletedUsers.map(user => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <button className="admin-btn payment-verify" onClick={() => handleRestore(user.id)}>Pulihkan</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
