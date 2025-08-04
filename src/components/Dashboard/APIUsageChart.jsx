import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './APIUsageChart.css';

const APIUsageChart = ({ data }) => {
  return (
    <div className="chart-container">
      <h3 className="chart-title">API Usage Trends</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="queries" stroke="#3B82F6" strokeWidth={3} />
          <Line type="monotone" dataKey="users" stroke="#10B981" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default APIUsageChart;