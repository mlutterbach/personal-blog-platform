import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Auth.css';

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001';
console.log('Login website:', process.env.REACT_APP_API_URL);

const Login = () => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [showRegisterButton, setShowRegisterButton] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkUsersExistence = async () => {
      try {
        const response = await axios.get(`${apiUrl}/users`);
        if (response.data.length === 0) {
          setShowRegisterButton(true);
        }
      } catch (error) {
        console.log('Error checking users:', error);
      }
    };
    checkUsersExistence();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/login`, {
        email, password,
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.user_id);
      const redirectTo = location.state?.from || '/articles';
      navigate(redirectTo);
    } catch (error) {
      console.log('Login failed:', error);
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Login</h2>
      <form onSubmit={handleLogin} className="auth-form">
        <div>
          <label>Email:</label>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setemail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="auth-button">Login</button>
      </form>
      {showRegisterButton && (
        <button className="auth-button register-button" onClick={() => navigate('/register')}>Create an Account</button>
      )}
    </div>
  );
};

export default Login;
