import React from 'react';
import { Database, CheckCircle } from 'lucide-react';
import './Header.css';

const Header = ({ isAdmin, onLoginClick }) => {
  return (
    <header className="header">
      <div className="header-container">
        <div 
          className="header-content" 
          style={{ justifyContent: 'center', position: 'relative' }}
        >
          {/* Left side: Logo + Title */}
          <div className="header-left" style={{ paddingRight: '250px' }}>
            <div className="header-logo">
              <Database className="header-logo-icon" />
              <h1 className="header-title">Survey API Gateway</h1>
            </div>
            <div className="header-subtitle">
              Ministry of Statistics and Programme Implementation
            </div>
          </div>

          {/* Right corner image */}
          <div 
            className="header-right" 
            style={{ 
              position: 'absolute', 
              right: '10px', 
              top: '50%', 
              transform: 'translateY(-50%)', 
              height: '80%' 
            }}
          >
            <img 
              src="/WhatsApp Image 2025-08-12 at 20.01.44_37546c84.jpg" 
              alt="Right Corner" 
              style={{ 
                height: '100%', 
                width: 'auto', 
                objectFit: 'contain', 
                display: 'block' 
              }} 
            />
          </div>

          {/* Status + Admin/User Avatar */}
          <div className="header-status" style={{ display: 'none' }}>
            <CheckCircle className="header-status-icon" />
            <span>System Operational</span>
          </div>

          {isAdmin ? (
            <div className="header-avatar" style={{ display: 'none' }}>
              <span>A</span>
            </div> 
          ) : (
            <button style={{ display: 'none' }}></button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;