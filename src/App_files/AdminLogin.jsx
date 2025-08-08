import React, { useState } from 'react';
// import OpeningAnimationScene from './OpeningAnimationScene';

const AdminLogin = ({ onAdminLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    if (email === 'admin@gmail.com' && password === '1234') {
      onAdminLogin();
    } else {
      setError('Invalid admin credentials. Please check your email and password.');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin(e);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>Admin Login</h2>
        <p className="login-subtitle">Ministry of Statistics and Programme Implementation</p>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Admin email address" value={email} onChange={(e) => setEmail(e.target.value)} onKeyPress={handleKeyPress} className="login-input" required autoComplete="email" />
          <input type="password" placeholder="Admin password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyPress={handleKeyPress} className="login-input" required autoComplete="current-password" />
          {error && <p className="login-error" style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{error}</p>}
          <button type="submit" className="login-button">Login as Admin</button>
        </form>
        <div style={{ marginTop: '15px', fontSize: '12px', color: '#666', textAlign: 'center' }}>
          <p><strong>Admin Test Credentials:</strong></p>
          <p>Email: admin@gmail.com</p>
          <p>Password: 1234</p>
        </div>
        <div style={{ marginTop: '10px', textAlign: 'center' }}>
          <a href="/" style={{ color: '#007bff', textDecoration: 'none', fontSize: '14px' }}>← Back to Main Website</a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;