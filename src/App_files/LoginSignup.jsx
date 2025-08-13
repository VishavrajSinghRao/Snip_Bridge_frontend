import React, { useState } from 'react'; 
import { LogIn, UserPlus, UserCheck } from 'lucide-react';
import axios from 'axios';

const LoginSignup = ({ onLogin, onGuest, onSignupSuccess }) => {
  const [activeTab, setActiveTab] = useState('login');

  // Login states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  // Signup states
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupMessage, setSignupMessage] = useState('');

  const [loading, setLoading] = useState(false);

  // Handle login
  const handleLogin = async () => {
    setLoading(true);
    setLoginMessage('');
    try {
      const res = await axios.post('http://localhost:5000/login', {
        email: loginEmail,
        password: loginPassword
      });
      if (res.data.session?.access_token) {
        setLoginMessage('Login successful!');
        onLogin();
        navigate('/')
      } else {
        setLoginMessage(res.data.error || 'Login failed.');
      }
    } catch (err) {
      setLoginMessage(err.response?.data?.error || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  // Handle signup
  const handleSignup = async () => {
    setLoading(true);
    setSignupMessage('');
    try {
      const res = await axios.post('http://localhost:5000/signUp', {
        email: signupEmail,
        password: signupPassword
      });
      setSignupMessage(res.data.message || 'Check your email to confirm account.');
      onSignupSuccess();
    } catch (err) {
      setSignupMessage(err.response?.data?.error || 'Signup failed.');
    } finally {
      setLoading(false);
    }
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === 'login') {
      handleLogin();
    } else {
      handleSignup();
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        {/* Tabs */}
        <div className="tab-buttons">
          <button
            className={`tab-button ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            <LogIn size={18} className="inline-block mr-2" /> Login
          </button>
          <button
            className={`tab-button ${activeTab === 'signup' ? 'active' : ''}`}
            onClick={() => setActiveTab('signup')}
          >
            <UserPlus size={18} className="inline-block mr-2" /> Signup
          </button>
        </div>

        <h2 className="text-xl font-semibold mb-2">
          {activeTab === 'login' ? 'User Login' : 'User Signup'}
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {activeTab === 'login' ? (
            <>
              <input
                type="email"
                placeholder="Email address"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="login-input"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="login-input"
                required
              />
            </>
          ) : (
            <>
              <input
                type="email"
                placeholder="Email address"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                className="login-input"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                className="login-input"
                required
              />
            </>
          )}

          <button type="submit" className="login-button" disabled={loading}>
            {loading
              ? 'Processing...'
              : activeTab === 'login'
              ? 'Log In'
              : 'Sign Up'}
          </button>
        </form>

        {/* Messages */}
        {activeTab === 'login' && loginMessage && (
          <p
            className={`message ${
              loginMessage.includes('successful') ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {loginMessage}
          </p>
        )}
        {activeTab === 'signup' && signupMessage && (
          <p
            className={`message ${
              signupMessage.includes('Check your email') ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {signupMessage}
          </p>
        )}

        {/* Guest option */}
        <div className="divider-line">Or</div>
        <button onClick={onGuest} className="guest-button">
          <UserCheck size={18} className="inline-block mr-2" /> Continue as Guest
        </button>
      </div>
    </div>
  );
};

export default LoginSignup;
