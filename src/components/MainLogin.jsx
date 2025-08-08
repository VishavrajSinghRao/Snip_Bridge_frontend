import React, { useState } from 'react';
import axios from 'axios';

function MainLogin() {
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupMessage, setSignupMessage] = useState('');

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  const signup = async () => {
    try {
      const res = await axios.post('http://localhost:5000/signup', {
        email: signupEmail,
        password: signupPassword
      });
      setSignupMessage(res.data.message , 'Check your email to confirm account');
    } catch (err) {
      setSignupMessage(err.response?.data?.error,  'Signup failed');
    }
  };

  const login = async () => {
    try {
      const res = await axios.post('http://localhost:5000/login', {
        email: loginEmail,
        password: loginPassword
      });
      setLoginMessage(res.data.token ? 'Login successful!' : res.data.error);
    } catch (err) {
      setLoginMessage(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Signup</h2>
      <input
        placeholder="Email"
        value={signupEmail}
        onChange={(e) => setSignupEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={signupPassword}
        onChange={(e) => setSignupPassword(e.target.value)}
      />
      <button onClick={signup}>Sign Up</button>
      <p>{signupMessage}</p>

      <h2>Login</h2>
      <input
        placeholder="Email"
        value={loginEmail}
        onChange={(e) => setLoginEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={loginPassword}
        onChange={(e) => setLoginPassword(e.target.value)}
      />
      <button onClick={login}>Log In</button>
      <p>{loginMessage}</p>
    </div>
  );
}

export default MainLogin;