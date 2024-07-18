import React, { useState } from 'react';
import './App.css'; // Ensure this is the correct path to your CSS file
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/Register', { name, email, password })
            .then(result => {
                console.log(result);
                navigate('/Login');
            })
            .catch(err => {
                console.log(err);
                setError('Registration failed. Please try again.');
            });
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
            <h2 className="createacc">Create Account</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label className="label">
                        <span className="icon">👤</span>
                          Full Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="input"
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="label">
                        <span className="icon">📧</span>
                          Email Address</label>
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
                        <span className="icon">🔒</span>
                          Password
                    </label>
                    <div className="password-input">
                        <input
                        type="password"
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
                <button type="submit" className="button">Register</button>
                <p className="accountexist">Already have an account?</p>
                <Link to="/Login" className="button">Login</Link>
            </form>
        </div>
    );
};

export default Signup;
