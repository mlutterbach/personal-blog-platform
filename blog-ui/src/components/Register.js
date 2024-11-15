import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Auth.css';

const apiUrl = process.env.REACT_APP_API_URL || 'https://personal-blog-platform.onrender.com';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/signup`, {
        user: { email, password, password_confirmation: passwordConfirmation }
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.message.data.error || 'Sign up Failed');
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Register</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <div>
          <label>Email:</label>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input type="password" placeholder="Confirm Password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} required />
        </div>
        <button type="submit" className="auth-button">Sign Up</button>
      </form>
      {message && <p className="auth-message">{message}</p>}
    </div>
  );
};

export default Register;
