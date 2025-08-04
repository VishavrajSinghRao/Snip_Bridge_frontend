import React from 'react';
import { CheckCircle } from 'lucide-react';
import './RecentActivity.css';

const RecentActivity = ({ queries }) => {
  return (
    <div className="activity-container">
      <h3 className="activity-title">Recent Query Activity</h3>
      <div className="activity-list">
        {queries.slice(-5).map((query) => (
          <div key={query.id} className="activity-item">
            <div className="activity-content">
              <CheckCircle className="activity-icon" />
              <div className="activity-details">
                <p className="activity-dataset">{query.dataset}</p>
                <p className="activity-timestamp">{query.timestamp}</p>
              </div>
            </div>
            <span className="activity-count">{query.resultCount} records</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;