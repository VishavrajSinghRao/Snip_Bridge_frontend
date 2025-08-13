import React from 'react';
import Header from '../components/Header.jsx';
import Sidebar from '../components/Sidebar.jsx';
import Dashboard from '../components/Dashboard/Dashboard';
import DatasetExplorer from '../components/Query/DatasetExplorer';
import Datasets from '../components/Datasets';
import Settings from '../components/Settings';
import Users from '../components/Users';
import Manual from '../components/Manual';



const MainApp = ({ role, activeTab, setActiveTab, showAnimation, dashboardStats, apiUsageData, queries, currentQuery, setCurrentQuery, selectedDataset, setSelectedDataset, datasets, loading, executeQuery, queryResults }) => {
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard dashboardStats={dashboardStats} apiUsageData={role === 'admin' ? apiUsageData : null} queries={queries} />;
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
        return <Settings />;
      case 'Manual':
        return <Manual />;
      default:
        return <Dashboard dashboardStats={dashboardStats} apiUsageData={apiUsageData} queries={queries} />;
    }
  };

  return (
    <div className="app" style={{ opacity: showAnimation ? 0 : 1, transition: 'opacity 0.5s ease-in-out', pointerEvents: showAnimation ? 'none' : 'all' }}>
      <Header />
      <div className="app-body">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} role={role} />
        <main className="main-content">{renderContent()}</main>
      </div>
    </div>
  );
};

export default MainApp;
