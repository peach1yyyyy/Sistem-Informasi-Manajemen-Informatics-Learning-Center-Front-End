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

  const [forgotMode, setForgotMode] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);

  const [resetMode, setResetMode] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetLoading, setResetLoading] = useState(false);

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
        localStorage.setItem('loggedInUser', JSON.stringify(data.user));
        setTimeout(() => {
          navigate(data.user.role === 'admin' ? '/admin/dashboard' : '/dashboard');
        }, 1000);
      } else {
        toast.error(data.message || 'Login gagal');
      }
    } catch (error) {
      setLoading(false);
      toast.error('Terjadi kesalahan saat login');
    }
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    if (!forgotEmail.trim()) {
      toast.error('Email tidak boleh kosong!');
      return;
    }

    setForgotLoading(true);
    try {
      const response = await fetch('http://localhost/react-backend/forgot_password.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail }),
      });

      const data = await response.json();
      setForgotLoading(false);

      if (data.success) {
        toast.success('Instruksi reset password telah dikirim ke email Anda.');
        setForgotEmail('');
        setForgotMode(false);
        setResetMode(true); // Simulasi: langsung masuk ke reset password
      } else {
        toast.error(data.message || 'Gagal mengirim instruksi.');
      }
    } catch (error) {
      setForgotLoading(false);
      toast.error('Terjadi kesalahan saat mengirim permintaan.');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      toast.error('Semua kolom wajib diisi!');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Password tidak cocok!');
      return;
    }

    setResetLoading(true);

    try {
      // Simulasi kirim password baru ke backend
      const response = await fetch('http://localhost/react-backend/reset_password.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          newPassword,
          token: 'dummy-token-dari-email', // nanti bisa ambil dari URL param
        }),
      });

      const data = await response.json();
      setResetLoading(false);

      if (data.success) {
        toast.success('Password berhasil direset. Silakan login.');
        setResetMode(false);
      } else {
        toast.error(data.message || 'Reset password gagal.');
      }
    } catch (error) {
      setResetLoading(false);
      toast.error('Terjadi kesalahan saat reset password.');
    }
  };

  return (
    <div className="login-container">
      <div className="form-box">
        {resetMode ? (
          <>
            <h2>Buat Password Baru</h2>
            <br/>
            <form className="form" onSubmit={handleResetPassword}>
              <input
                type="password"
                placeholder="Password Baru"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={resetLoading}
              />
              <input
                type="password"
                placeholder="Konfirmasi Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={resetLoading}
              />
              <button type="submit" className="submit-btn" disabled={resetLoading}>
                {resetLoading ? 'Menyimpan...' : 'Reset Password'}
              </button>
            </form>
            <p
              className="forgot-password-link"
              style={{ cursor: 'pointer', color: 'blue', marginTop: '10px' }}
              onClick={() => {
                setResetMode(false);
              }}
            >
              Kembali ke Login
            </p>
          </>
        ) : !forgotMode ? (
          <>
            <h2>Login To Your Account</h2>
            <br/>
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

            <p
              className="forgot-password-link"
              style={{ cursor: 'pointer', color: 'blue', marginTop: '10px' }}
              onClick={() => setForgotMode(true)}
            >
              Lupa Password?
            </p>

            <p className="signup-link">
              Don't have an account? <Link to="/register">Sign up</Link>
            </p>
          </>
        ) : (
          <>
            <h2>Reset Password</h2>
            <p style={{ marginBottom: '30px' }}>
              Masukkan email Anda untuk instruksi reset password!
            </p>
            <form className="form" onSubmit={handleForgotSubmit}>
              <input
                type="email"
                placeholder="Email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                disabled={forgotLoading}
              />
              <button type="submit" className="submit-btn" disabled={forgotLoading}>
                {forgotLoading ? 'Mengirim...' : 'Kirim Instruksi'}
              </button>
            </form>
            <p
              className="forgot-password-link"
              style={{ cursor: 'pointer', color: 'blue', marginTop: '10px' }}
              onClick={() => setForgotMode(false)}
            >
              Kembali ke Login
            </p>
          </>
        )}
      </div>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Left;
