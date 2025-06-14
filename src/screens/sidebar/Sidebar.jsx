// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import {
//   FaHome, FaBook, FaCertificate, FaComments,
//   FaMoneyBill, FaPhone, FaSignOutAlt, FaFolderOpen
// } from 'react-icons/fa'; // Tambah FaFolderOpen
// import './sidebar.css';

// const Sidebar = () => {
//   return (
//     <div className="sidebar">
//       <div className="sidebar-logo">
//         <img src="/images/logo.png" alt="ILC Logo" className="sidebar-logo-img" />
//       </div>
//       <nav className="sidebar-nav">
//         <NavLink to="/dashboard" className="nav-item" activeclassname="active">
//           <FaHome /> Dashboard
//         </NavLink>
//         <NavLink to="/programs" className="nav-item" activeclassname="active">
//           <FaBook /> Programs
//         </NavLink>
//         <NavLink to="/materi" className="nav-item" activeclassname="active">
//           <FaFolderOpen /> My Learnings
//         </NavLink>
//         <NavLink to="/certificates" className="nav-item" activeclassname="active">
//           <FaCertificate /> Certificates
//         </NavLink>
//         <NavLink to="/forum" className="nav-item" activeclassname="active">
//           <FaComments /> Forum
//         </NavLink>
//         <NavLink to="/payment" className="nav-item" activeclassname="active">
//           <FaMoneyBill /> Payment
//         </NavLink>
//         <NavLink to="/contact" className="nav-item" activeclassname="active">
//           <FaPhone /> Contact Us
//         </NavLink>
//         <NavLink to="/" className="nav-item" activeclassname="active">
//           <FaSignOutAlt /> Logout
//         </NavLink>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;


import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaHome, FaBook, FaCertificate, FaComments,
  FaMoneyBill, FaPhone, FaSignOutAlt, FaFolderOpen
} from 'react-icons/fa'; // Tambah FaFolderOpen
import './sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src="/images/logo.png" alt="ILC Logo" className="sidebar-logo-img" />
      </div>

      <nav className="sidebar-nav">
        <div className="sidebar-main-links">
          <NavLink to="/dashboard" className="nav-item" activeclassname="active">
            <FaHome /> Dashboard
          </NavLink>
          <NavLink to="/programs" className="nav-item" activeclassname="active">
            <FaBook /> Programs
          </NavLink>
          <NavLink to="/forum" className="nav-item" activeclassname="active">
            <FaComments /> Forum
          </NavLink>
          <NavLink to="/payment" className="nav-item" activeclassname="active">
            <FaMoneyBill /> Payments
          </NavLink>
        </div>
        
        <div className="sidebar-logout">
          <NavLink to="/" className="nav-item" activeclassname="active">
            <FaSignOutAlt /> Logout
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
