import React from 'react';
import Sidebar from './../sidebar/Sidebar';
import ProfileBar from './../profilebar/ProfileBar';
import './dashboard.css';
import DashboardHeader from './components/DashboardHeader';
import CourseCards from './components/CourseCards';
import StatisticChart from './components/StatisticChart';
import CertificateBox from './components/CertificateBox';


const Dashboard = () => {
  // Jika ingin pakai search, aktifkan fungsi ini dan passing ke DashboardHeader
  // const handleSearch = (query) => {
  //   console.log('Search keyword:', query);
  //   // Tambahkan logika pencarian/fiter di sini jika perlu
  // };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        {/* Jika butuh search, pakai: 
            <DashboardHeader onSearch={handleSearch} /> 
            Jika tidak, cukup:
        */}
        <DashboardHeader />
        <CourseCards />
        <StatisticChart />
        <CertificateBox />
      </div>
      <ProfileBar />
    </div>
  );
};

export default Dashboard;
