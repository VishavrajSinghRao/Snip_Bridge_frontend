import React, { useState } from 'react';
import { LogIn, UserPlus, UserCheck } from 'lucide-react';
import axios from 'axios';

const LoginSignup = ({ onLogin, onGuest, onSignupSuccess }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    const url = `http://localhost:5000/${activeTab}`;
    try {
      const res = await axios.post(url, { email, password });
      if (activeTab === 'login') {
        if (res.data.token) {
          setMessage('Login successful!');
          onLogin();
        } else {
          setMessage(res.data.error || 'Login failed.');
        }
      } else {
        setMessage(res.data.message || 'Signup successful! Please check your email to confirm your account.');
        onSignupSuccess();
      }
    } catch (err) {
      setMessage(err.response?.data?.error || `${activeTab === 'login' ? 'Login' : 'Signup'} failed.`);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="tab-buttons">
          <button className={`tab-button ${activeTab === 'login' ? 'active' : ''}`} onClick={() => setActiveTab('login')}>
            <LogIn size={18} className="inline-block mr-2" /> Login
          </button>
          <button className={`tab-button ${activeTab === 'signup' ? 'active' : ''}`} onClick={() => setActiveTab('signup')}>
            <UserPlus size={18} className="inline-block mr-2" /> Signup
          </button>
        </div>
        <h2 className="text-xl font-semibold mb-2">{activeTab === 'login' ? 'User Login' : 'User Signup'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} onKeyPress={handleKeyPress} className="login-input" required autoComplete="email" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyPress={handleKeyPress} className="login-input" required autoComplete="current-password" />
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Processing...' : (activeTab === 'login' ? 'Log In' : 'Sign Up')}
          </button>
        </form>
        {message && <p className={`message ${message.includes('successful') ? 'text-green-500' : 'text-red-500'}`}>{message}</p>}
        <div className="divider-line">Or</div>
        <button onClick={onGuest} className="guest-button">
          <UserCheck size={18} className="inline-block mr-2" /> Continue as Guest
        </button>
      </div>
    </div>
  );
};

export default LoginSignup;

