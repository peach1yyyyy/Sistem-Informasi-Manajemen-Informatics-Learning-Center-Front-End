import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './left_regis.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Left_Regis = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi input
    if (!fullName.trim()) {
      toast.error('Nama tidak boleh kosong!');
      return;
    }
    if (!email.trim()) {
      toast.error('Email tidak boleh kosong!');
      return;
    }
    if (!password) {
      toast.error('Password tidak boleh kosong!');
      return;
    }

    // Kirim data ke backend
    try {
      const response = await fetch('http://localhost/react-backend/register.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: fullName,
          email: email,
          password: password,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Registrasi berhasil!');
        setFullName('');
        setEmail('');
        setPassword('');
      } else {
        toast.error(result.message || 'Registrasi gagal!');
      }
    } catch (error) {
      toast.error('Terjadi kesalahan saat menghubungi server!');
      console.error(error);
    }
  };

  return (
    <div className="left-container">
      <div className="form-box">
        <h2>Create an account</h2>
        <p><br /></p>
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="submit-btn">Submit</button>
        </form>

        <p className="signin-link">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Left_Regis;
