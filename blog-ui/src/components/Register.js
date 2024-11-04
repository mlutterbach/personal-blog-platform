import React, { useState } from 'react';
import axios from 'axios';

const apiUrl = process.env.RAILS_APP_WEBSITE_URL || 'http://localhost:3001';

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
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type='password' placeholder='Confirm Password' value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
        <button type='submit'>Sign Up</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
