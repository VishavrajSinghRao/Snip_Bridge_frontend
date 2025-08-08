import React, { useState, useEffect } from 'react';
import { Globe, BarChart3, Database, Users, TrendingUp } from 'lucide-react';
import APIUsageChart from './APIUsageChart';
import RecentActivity from './RecentActivity';
import VisitorCounter from '../VisitorCounter'; // ✅ Add this line
import './Dashboard.css';

const backendUrl = 'http://localhost:5000';

// Updated StatsCard with proper color support
const StatsCard = ({ title, value, icon: Icon, color }) => {
  const colorStyles = {
    blue: { background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)' },
    green: { background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)' },
    purple: { background: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)' },
    orange: { background: 'linear-gradient(135deg, #ea580c 0%, #f97316 100%)' }
  };

  return (
    <div 
      className="stats-card"
      style={{
        ...colorStyles[color],
        padding: '24px',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        minWidth: '240px',
        flex: 1,
        color: 'white'
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <h3 style={{ 
            fontSize: '14px', 
            fontWeight: '500', 
            margin: 0, 
            color: 'white', 
            opacity: 0.9 
          }}>
            {title}
          </h3>
          <Icon style={{ 
            width: '24px', 
            height: '24px', 
            color: 'white', 
            opacity: 0.8 
          }} />
        </div>
        <div style={{ 
          fontSize: '32px', 
          fontWeight: '700', 
          color: 'white', 
          lineHeight: 1.2 
        }}>
          {value}
        </div>
      </div>
    </div>
  );
};

const Dashboard = ({ dashboardStats, apiUsageData, queries }) => {
  const [count, setCount] = useState();
  const [error, setError] = useState();
  const [querie, setQueries] = useState();

  useEffect(() => {
    fetch(`${backendUrl}/total-databases`)
      .then(res => res.json())
      .then(data => {
        setCount(data.total_databases);
      })
      .catch(() => {
        setError('Failed to load datasets');
      });
  }, []);

  useEffect(() => {
    fetch(`${backendUrl}/total-queries`)
      .then(res => res.json())
      .then(data => {
        setQueries(data.total_queries);
      })
      .catch(() => {
        setError('Failed to load datasets');
      });
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2 className="dashboard-title">Dashboard</h2>
        <div className="dashboard-subtitle">
          <Globe className="dashboard-subtitle-icon" />
          <span>National Statistics Office, MoSPI</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="dashboard-stats">
        <StatsCard
          title="Total Downloads"
          value={dashboardStats.totalQueries.toLocaleString()}
          icon={BarChart3}
          color="blue"
        />
        <StatsCard
          title="Active Datasets"
          value={dashboardStats.activeDatasets}
          icon={Database}
          color="green"
        />
        <StatsCard
          title="Total Users"
          value={dashboardStats.totalUsers}
          icon={Users}
          color="purple"
        />
        <StatsCard
          title="System Uptime"
          value={dashboardStats.systemUptime}
          icon={TrendingUp}
          color="orange"
        />
      </div>

      {/* Charts */}
      <div className="dashboard-charts">
        {apiUsageData && <APIUsageChart data={apiUsageData} />}
        <RecentActivity queries={queries} />
      </div>

      {/* ✅ Visitor Counter added at the bottom */}
      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <VisitorCounter />
      </div>
    </div>
  );
};

export default Dashboard;


