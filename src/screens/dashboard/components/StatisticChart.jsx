// src/screens/dashboard/components/StatisticChart.jsx
import React, { useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import './statisticchart.css';

const StatisticChart = () => {
  const [period, setPeriod] = useState('weekly');

  // Contoh data dummy untuk 2 course
  const xAxisData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const course1Data = [2, 3, 1.5, 4, 2, 3, 1];
  const course2Data = [1, 2.5, 3, 2, 1.5, 2.5, 2];

  const handlePeriodChange = (e) => {
    setPeriod(e.target.value);
    // Nanti kamu bisa sesuaikan datanya berdasarkan periode yang dipilih
  };

  return (
    <div className="statistic-chart">
      <div className="chart-header">
        <h3>Study Time Chart</h3>
        <select value={period} onChange={handlePeriodChange}>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>
      <LineChart
        xAxis={[{ scaleType: 'point', data: xAxisData }]}
        series={[
          { data: course1Data, label: 'Course A', color: '#3f72af' },
          { data: course2Data, label: 'Course B', color: '#ff7f50' }
        ]}
        height={300}
      />
    </div>
  );
};

export default StatisticChart;
