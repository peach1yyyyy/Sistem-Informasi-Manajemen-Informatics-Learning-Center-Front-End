import React, { useEffect, useState } from 'react';
import Sidebar from '../sidebar/Sidebar';
import './payment.css';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const [program, setProgram] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('selectedProgram'));
    setProgram(data);
  }, []);

  const handlePayNow = () => {
    if (!program) return;

    const existing = JSON.parse(localStorage.getItem('myLearnings')) || [];
    const alreadyBought = existing.find(item => item.id === program.id);

    if (!alreadyBought) {
      existing.push(program);
      localStorage.setItem('myLearnings', JSON.stringify(existing));
    }

    localStorage.removeItem('selectedProgram'); // optional, untuk kebersihan
    navigate('/materi');
  };

  if (!program) return <p>Loading...</p>;

  return (
    <div className="payment-container">
      <Sidebar />
      <div className="payment-main">
        <div className="payment-box">
          <h2>Payment</h2>
          <p className="payment-desc">Please review your payment details before proceeding.</p>

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
              <strong>Rp {program.price}</strong>
            </div>
          </div>

          <div className="payment-method">
            <label htmlFor="method">Payment Method</label>
            <select id="method">
              <option>Bank Transfer</option>
              <option>Credit Card</option>
              <option>E-Wallet (OVO, GoPay, etc)</option>
            </select>
          </div>

          <div className="payment-input">
            <label htmlFor="account">Account / Phone Number</label>
            <input type="text" id="account" placeholder="Enter your number or account" />
          </div>

          <button className="pay-button" onClick={handlePayNow}>Pay Now</button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
