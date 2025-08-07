import React from 'react';
import './StatsCard.css';

const StatsCard = ({ title, value, icon: Icon, color }) => {
  return (
    <div className={`stats-card stats-card-${color}`}>
      <div className="stats-card-content">
        <div className="stats-card-header">
          <h3 className="stats-card-title">{title}</h3>
          <Icon className="stats-card-icon" />
        </div>
        <div className="stats-card-value">{value}</div>
      </div>
    </div>
  );
};

export default StatsCard;