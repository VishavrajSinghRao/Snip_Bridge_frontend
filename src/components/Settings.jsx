import React, { useState } from 'react';
import { 
  Shield, 
  Database, 
  Bell, 
  Users, 
  Key, 
  Server, 
  Clock, 
  AlertTriangle,
  Save,
  RefreshCw,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('security');
  const [showApiKey, setShowApiKey] = useState(false);
  const [settings, setSettings] = useState({
    // Security Settings
    twoFactorAuth: true,
    sessionTimeout: 30,
    maxLoginAttempts: 3,
    passwordComplexity: 'high',
    
    // API Settings
    rateLimitPerHour: 1000,
    apiVersion: 'v2',
    enableCaching: true,
    cacheTimeout: 300,
    
    // Database Settings
    connectionPool: 20,
    queryTimeout: 30,
    backupFrequency: 'daily',
    retentionPeriod: 90,
    
    // Notification Settings
    emailAlerts: true,
    smsAlerts: false,
    webhookUrl: '',
    alertThreshold: 95,
    
    // User Management
    defaultRole: 'viewer',
    selfRegistration: false,
    approvalRequired: true,
    maxUsers: 100
  });

  const handleSettingChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const [notifications, setNotifications] = useState([]);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const addNotification = (message, type = 'success') => {
    const id = Date.now();
    const notification = { id, message, type };
    setNotifications(prev => [...prev, notification]);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleSave = () => {
    // Simulate save operation
    console.log('Saving settings:', settings);
    addNotification('Settings saved successfully!', 'success');
  };

  const handleReset = () => {
    setShowResetConfirm(false);
    // Reset to default values
    setSettings({
      twoFactorAuth: true,
      sessionTimeout: 30,
      maxLoginAttempts: 3,
      passwordComplexity: 'high',
      rateLimitPerHour: 1000,
      apiVersion: 'v2',
      enableCaching: true,
      cacheTimeout: 300,
      connectionPool: 20,
      queryTimeout: 30,
      backupFrequency: 'daily',
      retentionPeriod: 90,
      emailAlerts: true,
      smsAlerts: false,
      webhookUrl: '',
      alertThreshold: 95,
      defaultRole: 'viewer',
      selfRegistration: false,
      approvalRequired: true,
      maxUsers: 100
    });
    addNotification('Settings reset to default values', 'info');
  };

  const tabs = [
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'api', label: 'API Configuration', icon: Server },
    { id: 'database', label: 'Database', icon: Database },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'users', label: 'User Management', icon: Users }
  ];

  const renderSecuritySettings = () => (
    <div className="settings-section">
      <h3 className="settings-section-title">
        <Shield className="w-5 h-5" />
        Security Configuration
      </h3>
      
      <div className="settings-grid">
        <div className="setting-item">
          <label className="setting-label">Two-Factor Authentication</label>
          <div className="setting-control">
            <input
              type="checkbox"
              checked={settings.twoFactorAuth}
              onChange={(e) => handleSettingChange('security', 'twoFactorAuth', e.target.checked)}
              className="setting-checkbox"
            />
            <span className="setting-description">Require 2FA for all admin users</span>
          </div>
        </div>

        <div className="setting-item">
          <label className="setting-label">Session Timeout (minutes)</label>
          <div className="setting-control">
            <select
              value={settings.sessionTimeout}
              onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
              className="setting-select"
            >
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={60}>1 hour</option>
              <option value={120}>2 hours</option>
            </select>
          </div>
        </div>

        <div className="setting-item">
          <label className="setting-label">Max Login Attempts</label>
          <div className="setting-control">
            <input
              type="number"
              min="1"
              max="10"
              value={settings.maxLoginAttempts}
              onChange={(e) => handleSettingChange('security', 'maxLoginAttempts', parseInt(e.target.value))}
              className="setting-input"
            />
          </div>
        </div>

        <div className="setting-item">
          <label className="setting-label">Password Complexity</label>
          <div className="setting-control">
            <select
              value={settings.passwordComplexity}
              onChange={(e) => handleSettingChange('security', 'passwordComplexity', e.target.value)}
              className="setting-select"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="extreme">Extreme</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderApiSettings = () => (
    <div className="settings-section">
      <h3 className="settings-section-title">
        <Server className="w-5 h-5" />
        API Configuration
      </h3>
      
      <div className="settings-grid">
        <div className="setting-item">
          <label className="setting-label">Rate Limit (requests/hour)</label>
          <div className="setting-control">
            <input
              type="number"
              min="100"
              max="10000"
              step="100"
              value={settings.rateLimitPerHour}
              onChange={(e) => handleSettingChange('api', 'rateLimitPerHour', parseInt(e.target.value))}
              className="setting-input"
            />
          </div>
        </div>

        <div className="setting-item">
          <label className="setting-label">API Version</label>
          <div className="setting-control">
            <select
              value={settings.apiVersion}
              onChange={(e) => handleSettingChange('api', 'apiVersion', e.target.value)}
              className="setting-select"
            >
              <option value="v1">Version 1.0</option>
              <option value="v2">Version 2.0</option>
              <option value="v3">Version 3.0 (Beta)</option>
            </select>
          </div>
        </div>

        <div className="setting-item">
          <label className="setting-label">Enable Caching</label>
          <div className="setting-control">
            <input
              type="checkbox"
              checked={settings.enableCaching}
              onChange={(e) => handleSettingChange('api', 'enableCaching', e.target.checked)}
              className="setting-checkbox"
            />
            <span className="setting-description">Cache API responses for better performance</span>
          </div>
        </div>

        <div className="setting-item">
          <label className="setting-label">Cache Timeout (seconds)</label>
          <div className="setting-control">
            <input
              type="number"
              min="60"
              max="3600"
              value={settings.cacheTimeout}
              onChange={(e) => handleSettingChange('api', 'cacheTimeout', parseInt(e.target.value))}
              className="setting-input"
              disabled={!settings.enableCaching}
            />
          </div>
        </div>

        <div className="setting-item full-width">
          <label className="setting-label">API Key</label>
          <div className="setting-control api-key-control">
            <div className="api-key-wrapper">
              <input
                type={showApiKey ? "text" : "password"}
                value="sk-1234567890abcdef1234567890abcdef"
                readOnly
                className="setting-input api-key-input"
              />
              <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="api-key-toggle"
              >
                {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <button className="btn-secondary btn-small">
              <RefreshCw className="w-4 h-4" />
              Regenerate
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDatabaseSettings = () => (
    <div className="settings-section">
      <h3 className="settings-section-title">
        <Database className="w-5 h-5" />
        Database Configuration
      </h3>
      
      <div className="settings-grid">
        <div className="setting-item">
          <label className="setting-label">Connection Pool Size</label>
          <div className="setting-control">
            <input
              type="number"
              min="5"
              max="100"
              value={settings.connectionPool}
              onChange={(e) => handleSettingChange('database', 'connectionPool', parseInt(e.target.value))}
              className="setting-input"
            />
          </div>
        </div>

        <div className="setting-item">
          <label className="setting-label">Query Timeout (seconds)</label>
          <div className="setting-control">
            <input
              type="number"
              min="10"
              max="300"
              value={settings.queryTimeout}
              onChange={(e) => handleSettingChange('database', 'queryTimeout', parseInt(e.target.value))}
              className="setting-input"
            />
          </div>
        </div>

        <div className="setting-item">
          <label className="setting-label">Backup Frequency</label>
          <div className="setting-control">
            <select
              value={settings.backupFrequency}
              onChange={(e) => handleSettingChange('database', 'backupFrequency', e.target.value)}
              className="setting-select"
            >
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        </div>

        <div className="setting-item">
          <label className="setting-label">Data Retention (days)</label>
          <div className="setting-control">
            <input
              type="number"
              min="30"
              max="3650"
              value={settings.retentionPeriod}
              onChange={(e) => handleSettingChange('database', 'retentionPeriod', parseInt(e.target.value))}
              className="setting-input"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="settings-section">
      <h3 className="settings-section-title">
        <Bell className="w-5 h-5" />
        Notification Settings
      </h3>
      
      <div className="settings-grid">
        <div className="setting-item">
          <label className="setting-label">Email Alerts</label>
          <div className="setting-control">
            <input
              type="checkbox"
              checked={settings.emailAlerts}
              onChange={(e) => handleSettingChange('notifications', 'emailAlerts', e.target.checked)}
              className="setting-checkbox"
            />
            <span className="setting-description">Send email notifications for system events</span>
          </div>
        </div>

        <div className="setting-item">
          <label className="setting-label">SMS Alerts</label>
          <div className="setting-control">
            <input
              type="checkbox"
              checked={settings.smsAlerts}
              onChange={(e) => handleSettingChange('notifications', 'smsAlerts', e.target.checked)}
              className="setting-checkbox"
            />
            <span className="setting-description">Send SMS for critical alerts</span>
          </div>
        </div>

        <div className="setting-item full-width">
          <label className="setting-label">Webhook URL</label>
          <div className="setting-control">
            <input
              type="url"
              value={settings.webhookUrl}
              onChange={(e) => handleSettingChange('notifications', 'webhookUrl', e.target.value)}
              placeholder="https://your-webhook-endpoint.com"
              className="setting-input"
            />
          </div>
        </div>

        <div className="setting-item">
          <label className="setting-label">Alert Threshold (%)</label>
          <div className="setting-control">
            <input
              type="number"
              min="50"
              max="100"
              value={settings.alertThreshold}
              onChange={(e) => handleSettingChange('notifications', 'alertThreshold', parseInt(e.target.value))}
              className="setting-input"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderUserManagement = () => (
    <div className="settings-section">
      <h3 className="settings-section-title">
        <Users className="w-5 h-5" />
        User Management
      </h3>
      
      <div className="settings-grid">
        <div className="setting-item">
          <label className="setting-label">Default Role</label>
          <div className="setting-control">
            <select
              value={settings.defaultRole}
              onChange={(e) => handleSettingChange('users', 'defaultRole', e.target.value)}
              className="setting-select"
            >
              <option value="viewer">Viewer</option>
              <option value="contributor">Contributor</option>
              <option value="moderator">Moderator</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>

        <div className="setting-item">
          <label className="setting-label">Self Registration</label>
          <div className="setting-control">
            <input
              type="checkbox"
              checked={settings.selfRegistration}
              onChange={(e) => handleSettingChange('users', 'selfRegistration', e.target.checked)}
              className="setting-checkbox"
            />
            <span className="setting-description">Allow users to register themselves</span>
          </div>
        </div>

        <div className="setting-item">
          <label className="setting-label">Approval Required</label>
          <div className="setting-control">
            <input
              type="checkbox"
              checked={settings.approvalRequired}
              onChange={(e) => handleSettingChange('users', 'approvalRequired', e.target.checked)}
              className="setting-checkbox"
            />
            <span className="setting-description">Require admin approval for new users</span>
          </div>
        </div>

        <div className="setting-item">
          <label className="setting-label">Maximum Users</label>
          <div className="setting-control">
            <input
              type="number"
              min="10"
              max="10000"
              value={settings.maxUsers}
              onChange={(e) => handleSettingChange('users', 'maxUsers', parseInt(e.target.value))}
              className="setting-input"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'security':
        return renderSecuritySettings();
      case 'api':
        return renderApiSettings();
      case 'database':
        return renderDatabaseSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'users':
        return renderUserManagement();
      default:
        return renderSecuritySettings();
    }
  };

  return (
    <div className="page-container">
      {/* Notification Container */}
      <div className="notification-container">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`notification notification-${notification.type}`}
          >
            <span>{notification.message}</span>
            <button
              onClick={() => removeNotification(notification.id)}
              className="notification-close"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirm Reset</h3>
            <p>Are you sure you want to reset all settings to default values? This action cannot be undone.</p>
            <div className="modal-actions">
              <button onClick={() => setShowResetConfirm(false)} className="btn-secondary">
                Cancel
              </button>
              <button onClick={handleReset} className="btn-danger">
                Reset Settings
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="page-header">
        <h2 className="page-title">Settings</h2>
        <div className="page-actions">
          <button 
            onClick={handleReset}
            className="btn-secondary"
          >
            <RefreshCw className="w-4 h-4" />
            Reset to Default
          </button>
          <button 
            onClick={handleSave}
            className="btn-primary"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>

      <div className="settings-container">
        {/* Sidebar */}
        <div className="settings-sidebar">
          <nav className="settings-nav">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`settings-nav-item ${activeTab === tab.id ? 'active' : ''}`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="settings-content">
          {renderTabContent()}
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        .page-container {
          padding: 1.5rem;
          background-color: #f9fafb;
          min-height: 100vh;
        }
        
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          background: white;
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        .page-title {
          font-size: 1.875rem;
          font-weight: 700;
          color: #111827;
          margin: 0;
          border-bottom: 3px solid #3b82f6;
          padding-bottom: 0.5rem;
        }
        
        .page-actions {
          display: flex;
          gap: 0.75rem;
        }
        
        .settings-container {
          display: flex;
          background: white;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }
        
        .settings-sidebar {
          width: 250px;
          background-color: #f8fafc;
          border-right: 1px solid #e5e7eb;
          padding: 1.5rem;
        }
        
        .settings-nav {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .settings-nav-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border: none;
          background: none;
          text-align: left;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
          color: #6b7280;
          font-size: 0.875rem;
          font-weight: 500;
        }
        
        .settings-nav-item:hover {
          background-color: #e5e7eb;
          color: #374151;
        }
        
        .settings-nav-item.active {
          background-color: #3b82f6;
          color: white;
        }
        
        .settings-content {
          flex: 1;
          padding: 2rem;
        }
        
        .settings-section {
          max-width: none;
        }
        
        .settings-section-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.25rem;
          font-weight: 600;
          color: #374151;
          margin-bottom: 1.5rem;
          padding-bottom: 0.75rem;
          border-bottom: 2px solid #e5e7eb;
        }
        
        .settings-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }
        
        .setting-item {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .setting-item.full-width {
          grid-column: 1 / -1;
        }
        
        .setting-label {
          font-weight: 500;
          color: #374151;
          font-size: 0.875rem;
        }
        
        .setting-control {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        
        .api-key-control {
          flex-direction: row;
          gap: 0.75rem;
          align-items: flex-start;
        }
        
        .api-key-wrapper {
          position: relative;
          flex: 1;
        }
        
        .api-key-input {
          padding-right: 2.5rem !important;
        }
        
        .api-key-toggle {
          position: absolute;
          right: 0.5rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #6b7280;
          cursor: pointer;
          padding: 0.25rem;
          border-radius: 0.25rem;
        }
        
        .api-key-toggle:hover {
          color: #374151;
          background-color: #f3f4f6;
        }
        
        .setting-input,
        .setting-select {
          padding: 0.5rem 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 0.375rem;
          font-size: 0.875rem;
          background-color: white;
          transition: border-color 0.2s;
        }
        
        .setting-input:focus,
        .setting-select:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        
        .setting-input:disabled {
          background-color: #f9fafb;
          color: #6b7280;
        }
        
        .setting-checkbox {
          width: 1rem;
          height: 1rem;
          accent-color: #3b82f6;
        }
        
        .setting-description {
          font-size: 0.75rem;
          color: #6b7280;
        }
        
        .btn-primary {
          background-color: #3b82f6;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: background-color 0.2s;
        }
        
        .btn-primary:hover {
          background-color: #2563eb;
        }
        
        .btn-secondary {
          background-color: white;
          color: #374151;
          border: 1px solid #d1d5db;
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.2s;
        }
        
        .btn-secondary:hover {
          background-color: #f9fafb;
          border-color: #9ca3af;
        }
        
        .btn-small {
          padding: 0.375rem 0.75rem;
          font-size: 0.75rem;
        }
        
        @media (max-width: 768px) {
          .settings-container {
            flex-direction: column;
          }
          
          .settings-sidebar {
            width: 100%;
          }
          
          .settings-nav {
            flex-direction: row;
            overflow-x: auto;
            gap: 0.25rem;
          }
          
          .settings-nav-item {
            white-space: nowrap;
            min-width: fit-content;
          }
          
          .page-header {
            flex-direction: column;
            gap: 1rem;
          }
        }

        /* Notification Styles */
        .notification-container {
          position: fixed;
          top: 1rem;
          right: 1rem;
          z-index: 1000;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          max-width: 400px;
        }

        .notification {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          animation: slideIn 0.3s ease-out;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .notification-success {
          background-color: #10b981;
          color: white;
        }

        .notification-info {
          background-color: #3b82f6;
          color: white;
        }

        .notification-warning {
          background-color: #f59e0b;
          color: white;
        }

        .notification-error {
          background-color: #ef4444;
          color: white;
        }

        .notification-close {
          background: none;
          border: none;
          color: inherit;
          cursor: pointer;
          font-size: 1.25rem;
          font-weight: bold;
          margin-left: 0.5rem;
          opacity: 0.7;
          transition: opacity 0.2s;
        }

        .notification-close:hover {
          opacity: 1;
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.2s ease-out;
        }

        .modal {
          background: white;
          border-radius: 0.5rem;
          padding: 1.5rem;
          max-width: 400px;
          width: 90%;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          animation: scaleIn 0.2s ease-out;
        }

        .modal h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #374151;
          margin-bottom: 0.5rem;
        }

        .modal p {
          color: #6b7280;
          margin-bottom: 1.5rem;
          line-height: 1.5;
        }

        .modal-actions {
          display: flex;
          gap: 0.75rem;
          justify-content: flex-end;
        }

        .btn-danger {
          background-color: #ef4444;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: background-color 0.2s;
        }

        .btn-danger:hover {
          background-color: #dc2626;
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Settings;




