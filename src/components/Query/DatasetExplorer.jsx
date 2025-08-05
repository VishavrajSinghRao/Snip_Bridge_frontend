
import React, { useState, useEffect } from 'react';
import { Database, Search, Play, AlertCircle, CheckCircle, Filter, Download, BarChart3, Table, Columns, Eye } from 'lucide-react';
import './DatasetExplorer.css';

const backendUrl = 'http://localhost:5000';

const DatasetExplorer = () => {
  const [datasets, setDatasets] = useState([]);
  const [tables, setTables] = useState([]);
  const [columns, setColumns] = useState([]);
  const [dataset, setDataset] = useState('');
  const [table, setTable] = useState('');
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [filter, setFilter] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [queryHistory, setQueryHistory] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch(`${backendUrl}/datasets`)
      .then(res => res.json())
      .then(data => {
        setDatasets(data);
        if (data.length > 0) {
          setDataset(data[0]);
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load datasets');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (dataset) {
      setLoading(true);
      fetch(`${backendUrl}/tables/${dataset}`)
        .then(res => res.json())
        .then(data => {
          setTables(data);
          if (data.length > 0) {
            setTable(data[0]);
          }
          setLoading(false);
        })
        .catch(() => {
          setError('Failed to load tables');
          setLoading(false);
        });
    }
  }, [dataset]);

  useEffect(() => {
    if (dataset && table) {
      setLoading(true);
      fetch(`${backendUrl}/columns/${dataset}/${table}`)
        .then(res => res.json())
        .then(data => {
          setColumns(data);
          setSelectedColumns([]); 
          setLoading(false);
        })
        .catch(() => {
          setError('Failed to load columns');
          setLoading(false);
        });
    }
  }, [table, dataset]);

  const handleRunQuery = async () => {
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch(`${backendUrl}/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dataset, table, columns: selectedColumns, filter }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong.');
        setResult(null);
        setLoading(false);
        return;
      }

      setResult(data);
      setError('');
      
      // Add to query history
      const newQuery = {
        id: Date.now(),
        dataset,
        table,
        columns: selectedColumns,
        filter,
        timestamp: new Date().toLocaleString(),
        resultCount: data.length
      };
      setQueryHistory(prev => [newQuery, ...prev.slice(0, 4)]);
      
    } catch (err) {
      setError('Error connecting to backend');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleColumnToggle = (column) => {
    setSelectedColumns(prev => 
      prev.includes(column) 
        ? prev.filter(c => c !== column)
        : [...prev, column]
    );
  };

  const selectAllColumns = () => {
    setSelectedColumns(columns);
  };

  const clearAllColumns = () => {
    setSelectedColumns([]);
  };

  const exportResults = () => {
    if (!result || result.length === 0) return;
    
    const csv = [
      Object.keys(result[0]).join(','),
      ...result.map(row => Object.values(row).join(','))
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${dataset}_${table}_results.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="dataset-explorer">
      <div className="container">
        {/* Header */}
        <div className="header">
          <div className="header-content">
            <div className="header-icon">
              <Database className="main-icon" />
            </div>
            <div className="header-text">
              <h1 className="main-title">Dataset Query Tool</h1>
              <p className="main-subtitle">Explore and analyze your data with powerful queries</p>
            </div>
          </div>
        </div>

        {/* Query Builder Card */}
        <div className="query-builder-card">
          <div className="card-header">
            <h2 className="card-title">Query Builder</h2>
            <div className="status-indicator">
              {loading ? (
                <div className="loading-indicator">
                  <div className="spinner"></div>
                  <span>Loading...</span>
                </div>
              ) : (
                <div className="ready-indicator">
                  <CheckCircle className="status-icon" />
                  <span>Ready</span>
                </div>
              )}
            </div>
          </div>

          <div className="query-form">
            {/* Dataset Selection */}
            <div className="form-group">
              <label className="form-label">
                <Database className="label-icon" />
                Dataset
              </label>
              <div className="select-wrapper">
                <select 
                  value={dataset} 
                  onChange={(e) => setDataset(e.target.value)}
                  className="form-select"
                  disabled={loading}
                >
                  {datasets.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Table Selection */}
            <div className="form-group">
              <label className="form-label">
                <Table className="label-icon" />
                Table
              </label>
              <div className="select-wrapper">
                <select 
                  value={table} 
                  onChange={(e) => setTable(e.target.value)}
                  className="form-select"
                  disabled={loading}
                >
                  {tables.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Column Selection */}
            <div className="form-group">
              <div className="columns-header">
                <label className="form-label">
                  <Columns className="label-icon" />
                  Columns ({selectedColumns.length} selected)
                </label>
                <div className="column-actions">
                  <button 
                    type="button" 
                    onClick={selectAllColumns}
                    className="action-btn select-all"
                    disabled={loading}
                  >
                    Select All
                  </button>
                  <button 
                    type="button" 
                    onClick={clearAllColumns}
                    className="action-btn clear-all"
                    disabled={loading}
                  >
                    Clear
                  </button>
                </div>
              </div>
              
              <div className="columns-grid">
                {columns.map(column => (
                  <div key={column} className="column-item">
                    <label className="column-checkbox">
                      <input
                        type="checkbox"
                        checked={selectedColumns.includes(column)}
                        onChange={() => handleColumnToggle(column)}
                        disabled={loading}
                      />
                      <span className="checkbox-custom"></span>
                      <span className="column-name">{column}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Filter Input */}
            <div className="form-group">
              <label className="form-label">
                <Filter className="label-icon" />
                Filter Condition
              </label>
              <div className="input-wrapper">
                <input
                  type="text"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  placeholder="e.g., age > 60 AND state = 'Punjab'"
                  className="form-input"
                  disabled={loading}
                />
                <Search className="input-icon" />
              </div>
            </div>

            {/* Execute Button */}
            <div className="form-actions">
              <button 
                onClick={handleRunQuery}
                disabled={loading || !dataset || !table || selectedColumns.length === 0}
                className="execute-button"
              >
                {loading ? (
                  <div className="spinner small"></div>
                ) : (
                  <Play className="button-icon" />
                )}
                <span>{loading ? 'Executing...' : 'Run Query'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="error-card">
            <AlertCircle className="error-icon" />
            <div className="error-content">
              <h3 className="error-title">Query Error</h3>
              <p className="error-message">{error}</p>
            </div>
          </div>
        )}

        {/* Results Card */}
        {result && (
          <div className="results-card">
            <div className="results-header">
              <div className="results-info">
                <h3 className="results-title">Query Results</h3>
                <span className="results-count">
                  {result.length === 0 ? 'No results found' : `${result.length} rows returned`}
                </span>
              </div>
              
              {result.length > 0 && (
                <div className="results-actions">
                  <button onClick={exportResults} className="action-button export-btn">
                    <Download className="action-icon" />
                    <span>Export CSV</span>
                  </button>
                  <button className="action-button visualize-btn">
                    <BarChart3 className="action-icon" />
                    <span>Visualize</span>
                  </button>
                </div>
              )}
            </div>

            {result.length > 0 && (
              <div className="table-container">
                <table className="results-table">
                  <thead>
                    <tr>
                      {Object.keys(result[0]).map(key => (
                        <th key={key} className="table-header">
                          {key.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {result.map((row, idx) => (
                      <tr key={idx} className="table-row">
                        {Object.values(row).map((val, i) => (
                          <td key={i} className="table-cell">
                            {typeof val === 'number' ? val.toLocaleString() : String(val)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Query History */}
        {queryHistory.length > 0 && (
          <div className="history-card">
            <h3 className="history-title">Recent Queries</h3>
            <div className="history-list">
              {queryHistory.map((query) => (
                <div key={query.id} className="history-item">
                  <div className="history-content">
                    <div className="history-details">
                      <p className="history-query">
                        <strong>{query.dataset}</strong> → {query.table}
                      </p>
                      <div className="history-meta">
                        <span className="meta-badge">
                          {query.columns.length} columns
                        </span>
                        <span className="meta-badge">
                          {query.resultCount} results
                        </span>
                        <span className="meta-badge time-badge">
                          {query.timestamp}
                        </span>
                      </div>
                      {query.filter && (
                        <p className="history-filter">Filter: {query.filter}</p>
                      )}
                    </div>
                    <button className="history-view-btn">
                      <Eye className="view-icon" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DatasetExplorer;