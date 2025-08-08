import React from 'react';
import { Database, CheckCircle } from 'lucide-react';
import './Header.css';

const Header = ({ isAdmin, onLoginClick }) => {
  return (

   
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          <div className="header-left">
            
            <div className="header-logo">
              <Database className="header-logo-icon" />
              <h1 className="header-title">Survey API Gateway</h1>
            </div>
            <div className="header-subtitle">
              Ministry of Statistics and Programme Implementation
            </div>
          </div>

          <div className="header-right">
            <div className="header-status">
              <CheckCircle className="header-status-icon" />
              <span>System Operational</span>
            </div>

            {isAdmin ? (
              <div className="header-avatar">
                <span>A</span>
              </div> 
            ) : (
              <button >
               
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;