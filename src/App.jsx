// App.jsx
import React, { useState } from 'react';
import {
  Database,
  Users as UsersIcon,
} from 'lucide-react';
import Header from './components/Header.jsx';
import Sidebar from './components/Sidebar.jsx';
import Dashboard from './components/Dashboard/Dashboard';
import DatasetExplorer from './components/Query/DatasetExplorer';

import './App.css';

// Placeholder Datasets Component
const Datasets = () => (
  <div className="page-container">
    <h2 className="page-title">Datasets</h2>
    <div className="datasets-grid">
      {/* ... same cards */}
    </div>
  </div>
);

// Placeholder Users Component
const Users = () => (
  <div className="page-container">
    <h2 className="page-title">Users</h2>
    <div className="users-table">
      <table>
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Role</th><th>Last Login</th><th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John Doe</td><td>john@mospi.gov.in</td><td>Analyst</td><td>2024-01-25</td><td><span className="user-status active">Active</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

const SettingsComponent = () => (
  <div className="page-container">
    <h2 className="page-title">Settings</h2>
    {/* ...same content */}
  </div>
);

// ✅ Login Component
const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (email === 'admin@gmail.com' && password === '1234') {
      onLogin('admin');
    } else {
      onLogin('user');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>Survey API Gateway</h2>
        <p className="login-subtitle">Ministry of Statistics and Programme Implementation</p>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        {error && <p className="login-error">{error}</p>}
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

  const handleLogin = (userRole) => {
    setLoggedIn(true);
    setRole(userRole);
  };

  const dashboardStats = { totalQueries: 125670, activeDatasets: 24, totalUsers: 342, systemUptime: '99.8%' };
  const apiUsageData = [
    { month: 'Jan', queries: 8500, users: 120 },
    { month: 'Feb', queries: 9200, users: 135 },
    { month: 'Mar', queries: 7800, users: 115 },
    { month: 'Apr', queries: 10500, users: 150 },
    { month: 'May', queries: 11200, users: 165 },
    { month: 'Jun', queries: 9800, users: 140 }
  ];

  const queries = [
    { id: 1, query: 'SELECT * FROM plfs WHERE ...', dataset: 'PLFS 2023-24', timestamp: '2024-01-25 14:30', resultCount: 1250 },
    { id: 2, query: 'SELECT ...', dataset: 'NSS Consumer Expenditure', timestamp: '2024-01-25 13:45', resultCount: 36 },
  ];

  const [datasets] = useState([]);
  const [currentQuery, setCurrentQuery] = useState('');
  const [selectedDataset, setSelectedDataset] = useState('');
  const [loading, setLoading] = useState(false);
  const [queryResults, setQueryResults] = useState(null);

  const executeQuery = () => {
    setLoading(true);
    setTimeout(() => {
      setQueryResults([{ id: 1, state: 'Test', value: 100 }]);
      setLoading(false);
    }, 2000);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard
            dashboardStats={dashboardStats}
            apiUsageData={role === 'admin' ? apiUsageData : null}
            queries={queries}
          />
        );
      case 'query':
        return (
          <DatasetExplorer
            currentQuery={currentQuery}
            setCurrentQuery={setCurrentQuery}
            selectedDataset={selectedDataset}
            setSelectedDataset={setSelectedDataset}
            datasets={datasets}
            loading={loading}
            executeQuery={executeQuery}
            queryResults={queryResults}
            queries={queries}
          />
        );
      case 'datasets':
        return <Datasets />;
      case 'users':
        return role === 'admin' ? <Users /> : null;
      case 'settings':
        return <SettingsComponent />;
      default:
        return <Dashboard dashboardStats={dashboardStats} apiUsageData={apiUsageData} queries={queries} />;
    }
  };

  if (!loggedIn) return <Login onLogin={handleLogin} />;

  return (
    <div className="app">
      <Header />
      <div className="app-body">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} role={role} />
        <main className="main-content">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
