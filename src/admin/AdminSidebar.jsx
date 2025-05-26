// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import './adminsidebar.css';

// const AdminSidebar = () => {
//   return (
//     <div className="admin-sidebar scroll-hidden">
//       <h2 className="admin-logo">Admin Panel</h2>
//       <nav className="admin-nav">
//         <NavLink to="/admin/dashboard" className="nav-item">Dashboard</NavLink>
//         <NavLink to="/admin/users" className="nav-item">Manage Users</NavLink>
//         <NavLink to="/admin/programs" className="nav-item">Manage Programs</NavLink>
//         <NavLink to="/admin/materials" className="nav-item">Manage Materials</NavLink>
//         <NavLink to="/admin/certificates" className="nav-item">Manage Certificates</NavLink>
//         <NavLink to="/admin/forum" className="nav-item">Manage Forum</NavLink>
//         <NavLink to="/admin/payment" className="nav-item">Manage Payment</NavLink>
//         <NavLink to="/admin/contact" className="nav-item">Manage Feedback</NavLink>
//         <NavLink to="/" className="nav-item">Logout</NavLink>
//       </nav>
//     </div>
//   );
// };

// export default AdminSidebar;

import React from 'react';
import { NavLink } from 'react-router-dom';
import './adminsidebar.css';

const AdminSidebar = () => {
  return (
    <div className="admin-sidebar scroll-hidden">
      <h2 className="admin-logo">Admin Panel</h2>
      <nav className="admin-nav">
        <NavLink to="/admin/dashboard" className="nav-item">Dashboard</NavLink>
        <NavLink to="/admin/users" className="nav-item">Manage Users</NavLink>
        <NavLink to="/admin/programs" className="nav-item">Manage Programs</NavLink>
        <NavLink to="/admin/materials" className="nav-item">Manage Materials</NavLink>
        {/* <NavLink to="/admin/certificates" className="nav-item">Manage Certificates</NavLink>
        <NavLink to="/admin/forum" className="nav-item">Manage Forum</NavLink>
        <NavLink to="/admin/payment" className="nav-item">Manage Payment</NavLink>
        <NavLink to="/admin/contact" className="nav-item">Manage Feedback</NavLink> */}
        <NavLink to="/" className="nav-item">Logout</NavLink>
      </nav>
    </div>
  );
};

export default AdminSidebar;
