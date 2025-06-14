import React, { useEffect, useState } from 'react';
import Sidebar from '../sidebar/Sidebar';
import './payment.css';
import { useNavigate } from 'react-router-dom';
import ProfileBar from '../profilebar/ProfileBar';

const formatRupiah = (angka) => {
  if (!angka) return 'Rp. 0,00';
  const number = Number(angka);
  return 'Rp. ' + number.toLocaleString('id-ID') + ',00';
};

const Payment = () => {
  const [program, setProgram] = useState(null);
  const [virtualAccount, setVirtualAccount] = useState('');
  const [paymentHistory, setPaymentHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('selectedProgram'));
    const history = JSON.parse(localStorage.getItem('paymentHistory')) || [];
    setPaymentHistory(history);

    if (data) {
      setProgram(data);
      const va = '1234 ' + Math.floor(100000000 + Math.random() * 900000000);
      setVirtualAccount(va);
    }
  }, []);

  const handlePayNow = () => {
    if (!program) return;

    const existingLearnings = JSON.parse(localStorage.getItem('myLearnings')) || [];
    if (!existingLearnings.includes(program.id)) {
      existingLearnings.push(program.id);
      localStorage.setItem('myLearnings', JSON.stringify(existingLearnings));
    }

    const existingHistory = JSON.parse(localStorage.getItem('paymentHistory')) || [];
    const alreadyExists = existingHistory.some((entry) => entry.programId === program.id);

    if (!alreadyExists) {
      const newHistory = {
        id: Date.now(),
        programId: program.id,
        programTitle: program.title,
        programType: program.type,
        programPrice: program.price,
        paymentDate: new Date().toLocaleDateString('id-ID'),
      };

      const updatedHistory = [...existingHistory, newHistory];
      localStorage.setItem('paymentHistory', JSON.stringify(updatedHistory));
      setPaymentHistory(updatedHistory);
    }

    localStorage.removeItem('selectedProgram');
    navigate('/materi');
  };

  return (
    <div className="payment-container">
      <Sidebar />
      <div className="payment-main">
        {program ? (
          <div className="payment-box">
            <h2>Payment</h2>
            <p className="payment-desc">
              Silakan membayar melalui Bank Transfer ke nomor virtual account berikut:
            </p>

            <div className="payment-summary">
              <div className="payment-row">
                <span>Program</span>
                <strong>{program.title}</strong>
              </div>
              <div className="payment-row">
                <span>Jenis</span>
                <strong>{program.type}</strong>
              </div>
              <div className="payment-row">
                <span>Total</span>
                <strong>{formatRupiah(program.price)}</strong>
              </div>
              <div className="payment-row">
                <span>Nomor Virtual Account</span>
                <strong>{virtualAccount}</strong>
              </div>
            </div>

            <div className="payment-instructions">
              <p><strong>Instruksi:</strong></p>
              <ol>
                <li>Salin nomor virtual account di atas.</li>
                <li>Lakukan transfer ke nomor tersebut melalui mobile banking/ATM.</li>
                <li>Pastikan jumlah transfer sesuai dengan total pembayaran.</li>
                <li>Setelah pembayaran, klik tombol <strong>"Saya Sudah Bayar"</strong> di bawah.</li>
              </ol>
            </div>

            <button className="pay-button" onClick={handlePayNow}>Saya Sudah Bayar</button>
          </div>
        ) : (
          <div className="history-box">
            <h2>Riwayat Pembayaran</h2>
            {paymentHistory.length === 0 ? (
              <p>Tidak ada riwayat pembayaran.</p>
            ) : (
              <table className="history-table">
                <thead>
                  <tr>
                    <th>Judul Program</th>
                    <th>Jenis</th>
                    <th>Harga</th>
                    <th>Tanggal Pembayaran</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentHistory.map((item) => (
                    <tr key={item.id}>
                      <td>{item.programTitle}</td>
                      <td>{item.programType}</td>
                      <td>{formatRupiah(item.programPrice)}</td>
                      <td>{item.paymentDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
      <ProfileBar />
    </div>
  );
};

export default Payment;
