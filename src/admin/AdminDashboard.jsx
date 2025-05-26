import React from 'react';
import AdminSidebar from './AdminSidebar';
import './admin.css';

const AdminDashboard = () => {
  return (
    <div style={{ display: 'flex' }}>
      <AdminSidebar />
      <div className="admin-page scroll-hidden" style={{ flex: 1 }}>
        <h1>Admin Dashboard</h1>
        <div className="admin-grid">
          <div className="admin-card">
            <span className="admin-icon">👥</span>
            <div className="admin-card-content">
              <p>Total Pengguna</p>
              <h3>120</h3>
            </div>
          </div>

          <div className="admin-card">
            <span className="admin-icon">📚</span>
            <div className="admin-card-content">
              <p>Total Program</p>
              <h3>15</h3>
            </div>
          </div>

          <div className="admin-card">
            <span className="admin-icon">🎓</span>
            <div className="admin-card-content">
              <p>Total Sertifikat</p>
              <h3>78</h3>
            </div>
          </div>

          <div className="admin-card">
            <span className="admin-icon">💬</span>
            <div className="admin-card-content">
              <p>Total Forum</p>
              <h3>120</h3>
            </div>
          </div>

          <div className="admin-card">
            <span className="admin-icon">💳</span>
            <div className="admin-card-content">
              <p>Total Payment</p>
              <h3>15</h3>
            </div>
          </div>

          <div className="admin-card">
            <span className="admin-icon">📩</span>
            <div className="admin-card-content">
              <p>Total Feedback</p>
              <h3>78</h3>
            </div>
          </div>

          <div className="admin-card highlight">
            <span className="admin-icon">🔥</span>
            <div className="admin-card-content">
              <p>Program Aktif Bulan Ini</p>
              <h3>4</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
