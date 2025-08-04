import React from 'react';
import { Globe, BarChart3, Database, Users, TrendingUp } from 'lucide-react';
import StatsCard from './StatsCard';
import APIUsageChart from './APIUsageChart';
import RecentActivity from './RecentActivity';
import './Dashboard.css';

const Dashboard = ({ dashboardStats, apiUsageData, queries }) => {
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
          title="Total Queries"
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
        <APIUsageChart data={apiUsageData} />
        <RecentActivity queries={queries} />
      </div>
    </div>
  );
};

export default Dashboard;