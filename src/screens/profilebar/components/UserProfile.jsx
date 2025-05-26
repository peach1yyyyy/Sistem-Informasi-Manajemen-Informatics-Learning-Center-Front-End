import React, { useEffect, useState } from 'react';
import './userprofile.css';

const UserProfile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    role: '',
    level: '',
    status: 'Offline',
    avatarUrl: '',
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(prev => ({
        ...prev,
        name: userData.name || '',
        email: userData.email || '',
        role: userData.role || '',
        level: userData.level || 'Basic', // jika level tidak ada
        avatarUrl: userData.avatarUrl || 'https://i.pravatar.cc/100?img=47', // default avatar
      }));
    }

    const updateStatus = (isOnline) => {
      setUser(prev => ({
        ...prev,
        status: isOnline ? 'Online' : 'Offline',
      }));
    };

    updateStatus(true);

    window.addEventListener('focus', () => updateStatus(true));
    window.addEventListener('blur', () => updateStatus(false));

    return () => {
      window.removeEventListener('focus', () => updateStatus(true));
      window.removeEventListener('blur', () => updateStatus(false));
    };
  }, []);

  return (
    <div className="user-profile">
      <div className="profile-header">
        <img
          src={user.avatarUrl}
          alt="User Avatar"
          className="profile-avatar"
        />
        <div className="profile-info">
          <h3>{user.name}</h3>
          <p className="user-role">{user.role}</p>
        </div>
      </div>

      <div className="profile-details">
        <div className="detail-item">
          <span className="label">Email:</span>
          <span className="value">{user.email}</span>
        </div>
        <div className="detail-item">
          <span className="label">Level Member:</span>
          <span className="value">{user.level}</span>
        </div>
        <div className="detail-item">
          <span className="label">Status:</span>
          <span
            className={`value ${user.status === 'Online' ? 'online' : 'offline'}`}
          >
            {user.status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
