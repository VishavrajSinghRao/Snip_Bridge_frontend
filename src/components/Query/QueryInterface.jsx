import React from 'react';
import { Shield, Clock, Play, Download, BarChart3, CheckCircle, Eye } from 'lucide-react';
import './QueryInterface.css';

const QueryInterface = ({ 
  currentQuery, 
  setCurrentQuery, 
  selectedDataset, 
  setSelectedDataset, 
  datasets, 
  loading, 
  executeQuery, 
  queryResults, 
  queries 
}) => {
  const queryTemplates = [
    'SELECT * FROM dataset LIMIT 10',
    'SELECT state, COUNT(*) FROM dataset GROUP BY state',
    'SELECT AVG(income) FROM dataset WHERE age > 25'
  ];

  return (
    <div className="query-interface">
      <div className="query-header">
        <h2 className="query-title">Query Interface</h2>
        <div className="query-security">
          <Shield className="query-security-icon" />
          <span>Secure SQL Environment</span>
        </div>
      </div>

      <div className="query-main">
        <div className="query-content">
          <div className="query-input-section">
            <label className="query-label">SQL Query</label>
            <textarea
              value={currentQuery}
              onChange={(e) => setCurrentQuery(e.target.value)}
              placeholder="SELECT * FROM dataset WHERE state = 'Maharashtra' LIMIT 100"
              className="query-textarea"
            />
            
            <div className="query-controls">
              <select
                value={selectedDataset}
                onChange={(e) => setSelectedDataset(e.target.value)}
                className="query-select"
              >
                <option value="">Select Dataset</option>
                {datasets.map((dataset) => (
                  <option key={dataset.id} value={dataset.name}>
                    {dataset.name} ({dataset.records.toLocaleString()} records)
                  </option>
                ))}
              </select>
              
              <button
                onClick={executeQuery}
                disabled={loading || !currentQuery.trim() || !selectedDataset}
                className="query-execute-btn"
              >
                {loading ? <Clock className="query-btn-icon spinning" /> : <Play className="query-btn-icon" />}
                <span>{loading ? 'Executing...' : 'Execute Query'}</span>
              </button>
            </div>
          </div>

          <div className="query-templates">
            <h4 className="templates-title">Quick Templates</h4>
            <div className="templates-list">
              {queryTemplates.map((template, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuery(template)}
                  className="template-btn"
                >
                  {template}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {queryResults && (
        <div className="query-results">
          <div className="results-header">
            <h3 className="results-title">Query Results</h3>
            <div className="results-actions">
              <button className="results-export-btn">
                <Download className="results-btn-icon" />
                <span>Export CSV</span>
              </button>
              <button className="results-visualize-btn">
                <BarChart3 className="results-btn-icon" />
                <span>Visualize</span>
              </button>
            </div>
          </div>
          
          <div className="results-table-container">
            <table className="results-table">
              <thead>
                <tr>
                  {Object.keys(queryResults[0] || {}).map((key) => (
                    <th key={key} className="results-th">
                      {key.replace('_', ' ')}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {queryResults.map((row, index) => (
                  <tr key={index} className="results-tr">
                    {Object.values(row).map((value, i) => (
                      <td key={i} className="results-td">
                        {typeof value === 'number' ? value.toLocaleString() : value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Query History */}
      <div className="query-history">
        <h3 className="history-title">Query History</h3>
        <div className="history-list">
          {queries.map((query) => (
            <div key={query.id} className="history-item">
              <div className="history-content">
                <p className="history-query">{query.query}</p>
                <div className="history-meta">
                  <span>Dataset: {query.dataset}</span>
                  <span>Executed: {query.timestamp}</span>
                  <span>Results: {query.resultCount} records</span>
                </div>
              </div>
              <div className="history-actions">
                <CheckCircle className="history-status-icon" />
                <button className="history-view-btn">
                  <Eye className="history-view-icon" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QueryInterface;
