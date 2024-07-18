import React, { useState } from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { createContext } from 'react';

export const AppContext = createContext();

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/Login', {email, password})
    .then(result => {
        console.log(result)
        if(result.data === "Success") {
            navigate('/home')
        }
    })
    .catch(err => console.log(err))
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
    <AppContext.Provider value={{email, setEmail}}>
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
            onChange={(e) => setEmail(e.target.value)}
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
              <p className="accountexist">Dont have an account?</p>
              <Link to="/Register" className="button">Create Account</Link>
      </form>
    </div>          
    </AppContext.Provider>
  );
};

export default Login;
