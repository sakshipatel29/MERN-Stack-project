import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//import { AppContext } from './App';
import { AppContext } from './AppContext';

const Login = () => {
  const { setEmail } = useContext(AppContext);
  const [email, setEmailLocal] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/Login', { email, password })
      .then(result => {
        if (result.data === 'Success') {
          setEmail(email); // Set email in context
          navigate('/home');
        }
      })
      .catch(err => console.log(err));
  };

  const togglePasswordVisibility = () => {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.querySelector('.toggle-password');

    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      toggleIcon.textContent = '👁️';
    } else {
      passwordInput.type = 'password';
      toggleIcon.textContent = '◡';
    }
  };

  return (
    <div className="container">
      <h1 className="Loginheader1">Hello !!</h1>
      <h2 className="Loginheader2">Sign in to your account</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label className="label">
            <span className="icon">📧</span>Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmailLocal(e.target.value)}
            className="input"
            required
          />
        </div>
        <div className="form-group">
          <label className="label">
            <span className="icon">🔒</span>Password</label>

          <div className="password-input">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              required
            />
            <span className="toggle-password" onClick={togglePasswordVisibility}>
              ◡
            </span>
          </div>

        </div>
        <button type="submit" className="button">Login</button>
        <p className="accountexist">Don't have an account?</p>
        <Link to="/Register" className="button">Create Account</Link>
      </form>
    </div>
  );
};

export default Login;
