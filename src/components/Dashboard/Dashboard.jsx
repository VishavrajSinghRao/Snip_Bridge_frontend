
import React, { useState, useEffect } from 'react';
import { Globe, BarChart3, Database, Users, TrendingUp } from 'lucide-react';
import APIUsageChart from './APIUsageChart';
import RecentActivity from './RecentActivity';

import './Dashboard.css';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

// Updated StatsCard to use CSS classes instead of inline styles
const StatsCard = ({ title, value, icon: Icon, colorClass }) => {
  return (
    <div className={`card ${colorClass}`}>
      <div className="card-header">
        <h3 className="card-title" style={{ color: 'white', fontWeight: '300', fontSize: '15px' }}>{title}</h3>
        <Icon className="card-icon" />
      </div>
      <div className="card-value">{value}</div>
    </div>
  );
};

const Dashboard = ({ dashboardStats, apiUsageData, queries }) => {
  // const [count, setCount] = useState();
  // const [error, setError] = useState();
  // const [querie, setQueries] = useState();

  // useEffect(() => {
  //   fetch(`${backendUrl}/total-databases`)
  //     .then(res => res.json())
  //     .then(data => {
  //       setCount(data.total_databases);
  //     })
  //     .catch(() => {
  //       setError('Failed to load datasets');
  //     });
  // }, []);

  // useEffect(() => {
  //   fetch(`${backendUrl}/total-queries`)
  //     .then(res => res.json())
  //     .then(data => {
  //       setQueries(data.total_queries);
  //     })
  //     .catch(() => {
  //       setError('Failed to load datasets');
  //     });
  // }, []);

   const [counts, setCounts] = useState();
  const [error, setError] = useState();
  const [user, setUser] = useState(0)
  const [count, setCount] = useState(0)
  const [queri, setQueri] = useState()


  useEffect(() => {
    fetch(`${backendUrl}/api/get-download-count`)
      .then(res => res.json())
      .then(data => setCount(Number(data.count)))
      .catch(err => console.error("Error fetching count:", err));
  }, []);

  useEffect(() => {
    fetch(`${backendUrl}/total-databases`)
      .then(res => res.json())
      .then(data => {
        setCounts(Number(data.total_databases));
      })
      .catch(() => {
        setError('Failed to load datasets');
      });
  }, []);

  useEffect(() => {
    const res = fetch(`${backendUrl}/api/user-count`)
      .then((res) => res.json())
      .then((data) => {
        setUser(Number(data.count));
      })
  }, [])

  useEffect(() => {
    fetch(`${backendUrl}/usage-data`)
      .then(res => res.json())
      .then(data => {
        setQueri(Number(data.total_querie));
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
          value={count}
          icon={BarChart3}
          colorClass="queries"
        />
        <StatsCard
          title="Active Datasets"
          value={counts}
          icon={Database}
          colorClass="datasets"
        />
        <StatsCard
          title="Total Users"
          value={user}
          icon={Users}
          colorClass="users"
        />
        <StatsCard
          title="System Uptime"
          value={dashboardStats.systemUptime}
          icon={TrendingUp}
          colorClass="uptime"
        />
      </div>

      {/* Charts */}
      <div className="dashboard-charts">
        <div class="video-box">
          <iframe width="560" height="315" src="https://www.youtube.com/embed/718yxpT-eTM?si=fIbVXdPFGAbZP28j" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>

        <RecentActivity queries={queries} />

      </div>

      {/* ✅ Visitor Counter added at the bottom */}

    </div>
  );
};

export default Dashboard;