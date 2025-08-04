// App.jsx
import React, { useState } from 'react';
import {
  Database,
  CheckCircle,
  BarChart3,
  Search,
  Users as UsersIcon,
  Settings,
  Globe,
  TrendingUp,
  Play,
  Download,
  Eye,
  Shield,
  Clock
} from 'lucide-react';
import Header from './components/Header.jsx';
import Sidebar from './components/Sidebar.jsx';
import Dashboard from './components/Dashboard/Dashboard';
import QueryInterface from './components/Query/QueryInterface';
import './App.css';

// Placeholder Datasets Component
const Datasets = () => (
  <div className="page-container">
    <h2 className="page-title">Datasets</h2>
    <div className="datasets-grid">
      <div className="dataset-card">
        <div className="dataset-header">
          <Database className="dataset-icon" />
          <div>
            <h3>PLFS 2023-24</h3>
            <p>Labour Force Survey</p>
          </div>
        </div>
        <div className="dataset-stats">
          <span>45,000 records</span>
          <span className="dataset-status active">Active</span>
        </div>
      </div>
      <div className="dataset-card">
        <div className="dataset-header">
          <Database className="dataset-icon" />
          <div>
            <h3>NSS Consumer Expenditure 2022-23</h3>
            <p>Consumer Survey</p>
          </div>
        </div>
        <div className="dataset-stats">
          <span>89,000 records</span>
          <span className="dataset-status active">Active</span>
        </div>
      </div>
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
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Last Login</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John Doe</td>
            <td>john@mospi.gov.in</td>
            <td>Analyst</td>
            <td>2024-01-25</td>
            <td><span className="user-status active">Active</span></td>
          </tr>
          <tr>
            <td>Jane Smith</td>
            <td>jane@mospi.gov.in</td>
            <td>Administrator</td>
            <td>2024-01-24</td>
            <td><span className="user-status active">Active</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

// Placeholder Settings Component
const SettingsComponent = () => (
  <div className="page-container">
    <h2 className="page-title">Settings</h2>
    <div className="settings-sections">
      <div className="settings-card">
        <h3>API Configuration</h3>
        <div className="setting-item">
          <label>Rate Limit (requests/hour)</label>
          <input type="number" defaultValue="1000" />
        </div>
        <div className="setting-item">
          <label>Timeout (seconds)</label>
          <input type="number" defaultValue="30" />
        </div>
      </div>
      <div className="settings-card">
        <h3>Security Settings</h3>
        <div className="setting-item">
          <label><input type="checkbox" defaultChecked /> Enable SSL/TLS</label>
        </div>
        <div className="setting-item">
          <label><input type="checkbox" defaultChecked /> Require API Authentication</label>
        </div>
      </div>
    </div>
  </div>
);

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentQuery, setCurrentQuery] = useState('');
  const [selectedDataset, setSelectedDataset] = useState('');
  const [loading, setLoading] = useState(false);
  const [queryResults, setQueryResults] = useState(null);

  const [datasets] = useState([
    { id: 1, name: 'PLFS 2023-24', type: 'Labour Force', records: 45000, status: 'active', lastUpdated: '2024-01-15' },
    { id: 2, name: 'NSS Consumer Expenditure 2022-23', type: 'Consumer Survey', records: 89000, status: 'active', lastUpdated: '2024-01-10' },
    { id: 3, name: 'Agricultural Statistics 2023', type: 'Agriculture', records: 67000, status: 'active', lastUpdated: '2024-01-20' },
    { id: 4, name: 'Industrial Production Index', type: 'Industrial', records: 23000, status: 'active', lastUpdated: '2024-01-25' }
  ]);

  const [queries] = useState([
    { id: 1, query: 'SELECT * FROM plfs WHERE employment_status = "employed"', dataset: 'PLFS 2023-24', timestamp: '2024-01-25 14:30', resultCount: 1250 },
    { id: 2, query: 'SELECT state, AVG(expenditure) FROM consumer_exp GROUP BY state', dataset: 'NSS Consumer Expenditure 2022-23', timestamp: '2024-01-25 13:45', resultCount: 36 },
    { id: 3, query: 'SELECT crop_type, production FROM agriculture WHERE year = 2023', dataset: 'Agricultural Statistics 2023', timestamp: '2024-01-25 12:20', resultCount: 450 },
    { id: 4, query: 'SELECT * FROM industrial_data WHERE sector = "manufacturing"', dataset: 'Industrial Production Index', timestamp: '2024-01-25 11:15', resultCount: 890 },
    { id: 5, query: 'SELECT region, COUNT(*) FROM plfs GROUP BY region', dataset: 'PLFS 2023-24', timestamp: '2024-01-25 10:30', resultCount: 8 }
  ]);

  const dashboardStats = {
    totalQueries: 125670,
    activeDatasets: 24,
    totalUsers: 342,
    systemUptime: '99.8%'
  };

  const apiUsageData = [
    { month: 'Jan', queries: 8500, users: 120 },
    { month: 'Feb', queries: 9200, users: 135 },
    { month: 'Mar', queries: 7800, users: 115 },
    { month: 'Apr', queries: 10500, users: 150 },
    { month: 'May', queries: 11200, users: 165 },
    { month: 'Jun', queries: 9800, users: 140 }
  ];

  const executeQuery = async () => {
    setLoading(true);
    setTimeout(() => {
      const mockResults = [
        { id: 1, state: 'Maharashtra', population: 112374333, employment_rate: 45.2 },
        { id: 2, state: 'Uttar Pradesh', population: 199812341, employment_rate: 42.8 },
        { id: 3, state: 'Bihar', population: 104099452, employment_rate: 38.5 },
        { id: 4, state: 'West Bengal', population: 91276115, employment_rate: 41.2 },
        { id: 5, state: 'Madhya Pradesh', population: 72626809, employment_rate: 39.7 }
      ];
      setQueryResults(mockResults);
      setLoading(false);
    }, 2000);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard dashboardStats={dashboardStats} apiUsageData={apiUsageData} queries={queries} />;
      case 'query':
        return (
          <QueryInterface
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
        return <Users />;
      case 'settings':
        return <SettingsComponent />;
      default:
        return <Dashboard dashboardStats={dashboardStats} apiUsageData={apiUsageData} queries={queries} />;
    }
  };

  return (
    <div className="app">
      <Header />
      <div className="app-body">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="main-content">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;