import React, { useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import './statisticchart.css';

const StatisticChart = () => {
  const [period, setPeriod] = useState('weekly');

  const xAxisData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const course1Data = [2, 3, 1.5, 4, 2, 3, 1];
  const course2Data = [1, 2.5, 3, 2, 1.5, 2.5, 2];

  const handlePeriodChange = (e) => {
    setPeriod(e.target.value);
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
      <BarChart
        xAxis={[{ scaleType: 'band', data: xAxisData }]}
        series={[
          { data: course1Data, label: 'Course A', color: '#5a9bd4' },
          { data: course2Data, label: 'Course B', color: '#f48c74' }
        ]}
        height={300}
      />
    </div>
  );
};

export default StatisticChart;
