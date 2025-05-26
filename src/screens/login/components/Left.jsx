import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './left.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Left = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error('Email tidak boleh kosong!');
      return;
    }

    if (!password) {
      toast.error('Password tidak boleh kosong!');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost/react-backend/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      setLoading(false);

      if (data.success) {
        toast.success(data.message);
        // Simpan user ke localStorage dengan key 'loggedInUser'
        localStorage.setItem('loggedInUser', JSON.stringify(data.user));

        // Arahkan sesuai role
        if (data.user.role === 'admin') {
          setTimeout(() => navigate('/admin/dashboard'), 1000);
        } else {
          setTimeout(() => navigate('/dashboard'), 1000);
        }
      } else {
        toast.error(data.message || 'Login gagal');
      }
    } catch (error) {
      setLoading(false);
      toast.error('Terjadi kesalahan saat login');
    }
  };

  return (
    <div className="login-container">
      <div className="form-box">
        <h2>Login to your account</h2>
        <p><br /></p>
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>

        <p className="signup-link">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Left;
