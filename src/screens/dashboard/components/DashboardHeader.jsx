import React, { useEffect, useState } from 'react';
import './dashboardheader.css';

const DashboardHeader = ({ onSearch }) => {
  const [userName, setUserName] = useState('User');
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserName(user.name || 'User');
    }
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setKeyword(value);
    if (typeof onSearch === 'function') {
      onSearch(value);
    }
  };

  return (
    <div className="dashboard-header">
      <div className="greeting">
        <h2>Hi, {userName}</h2>
        <p>Welcome back! Get ready for today’s course</p>
      </div>
      <div className="search-bar-only">
        <input
          type="text"
          placeholder="Search for course here"
          value={keyword}
          onChange={handleSearchChange}
        />
        <button><i className="fa fa-search"></i></button>
      </div>
    </div>
  );
};

DashboardHeader.defaultProps = {
  onSearch: () => {},
};

export default DashboardHeader;
