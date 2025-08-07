import React from 'react';
import { BarChart3, Search, Database, Users, Settings, HelpCircle } from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ activeTab, setActiveTab, role }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'query', label: 'Dataset Explorer', icon: Search },
    { id: 'datasets', label: 'Datasets', icon: Database },
    // Only include "Users" if admin
    ...(role === 'admin' ? [{ id: 'users', label: 'Users', icon: Users }] : []),
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'Manual', label: 'Manual', icon: HelpCircle }
  ];

  return (
    <div className="sidebar">
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`sidebar-item ${activeTab === item.id ? 'sidebar-item-active' : ''}`}
          >
            <item.icon className="sidebar-icon" />
            <span className="sidebar-label">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;