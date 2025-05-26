import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import './header.css';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      navigate(`/programs?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  return (
    <header className="header">
      <img src="/images/logo.png" alt="Logo" className="logo" />

      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Cari program..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">Cari</button>
      </form>

      <div className="nav-links">
        <NavLink
          to="/register"
          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
        >
          Register
        </NavLink>
        <NavLink
          to="/"
          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
        >
          Login
        </NavLink>
        <AccountCircleOutlinedIcon className="profile-icon" />
      </div>
    </header>
  );
};

export default Header;
