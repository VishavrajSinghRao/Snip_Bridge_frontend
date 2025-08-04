import React from 'react';
import './StatsCard.css';

const StatsCard = ({ title, value, icon: Icon, color }) => {
  return (
    <div className={`stats-card stats-card-${color}`}>
      <div className="stats-card-content">
        <div className="stats-card-text">
          <p className="stats-card-title">{title}</p>
          <p className="stats-card-value">{value}</p>
        </div>
        <Icon className="stats-card-icon" />
      </div>
    </div>
  );
};

export default StatsCard;