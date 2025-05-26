import React, { useState, useEffect } from 'react';
import AdminSidebar from './AdminSidebar';
import './admin.css';

const ManagePayment = () => {
  const localKey = 'paymentStatus';

  // Ambil dari localStorage atau pakai default
  const [payments, setPayments] = useState(() => {
    const saved = localStorage.getItem(localKey);
    if (saved) {
      return JSON.parse(saved);
    }
    return [
      { id: 1, name: 'Ivana', paket: 'ReactJS Dasar', verified: false },
      { id: 2, name: 'Raka', paket: 'ML Lanjutan', verified: true },
    ];
  });

  // Simpan ke localStorage setiap kali `payments` berubah
  useEffect(() => {
    localStorage.setItem(localKey, JSON.stringify(payments));
  }, [payments]);

  const toggleVerification = (id) => {
    setPayments((prev) =>
      prev.map((payment) =>
        payment.id === id ? { ...payment, verified: !payment.verified } : payment
      )
    );
  };

  return (
    <div style={{ display: 'flex' }}>
      <AdminSidebar />
      <div className="admin-page scroll-hidden" style={{ flex: 1 }}>
        <h1>Kelola Pembayaran</h1>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Nama</th>
              <th>Paket</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.name}</td>
                <td>{payment.paket}</td>
                <td>{payment.verified ? 'Terverifikasi' : 'Menunggu Verifikasi'}</td>
                <td>
                  <button
                    className={`admin-btn ${payment.verified ? 'payment-cancel' : 'payment-verify'}`}
                    onClick={() => toggleVerification(payment.id)}
                  >
                    {payment.verified ? 'Batalkan' : 'Verifikasi'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagePayment;
