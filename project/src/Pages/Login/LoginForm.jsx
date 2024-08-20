import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import '../../App.css';
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [action, setAction] = useState('');
  const navigate = useNavigate();
  const [formdata, setFormdata] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({
      ...formdata,
      [name]: value
    });
  };

  const RegisterLink = () => {
    setAction(' active');
  };

  const LoginLink = () => {
    setTimeout(() => {
      setAction('');
    }, 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { firstName, lastName, email, password } = formdata;
      const response = await axios.post('http://localhost:8080/api/users/register/post', {
        firstName,
        lastName,
        email,
        password
      });
      const { accessToken, refreshToken } = response.data;
      // Store the tokens securely
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      console.log(response.data);
        alert('Registration successful');
        LoginLink();
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = formdata;
    try {
      const response = await axios.post('http://localhost:8080/api/users/login/post', {
        email,
        password
      });
      const { accessToken, refreshToken } = response.data;
      // Store the tokens securely
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      console.log(response.data);
      alert('Login successful');
      navigate("/home");
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className='logsign d-flex flex-column justify-content-center'>
      <div className={`wrapper${action}`}>
        <div className='form-box login'>
          <form onSubmit={handleLogin}>
            <h1>Login</h1>
            <div className="input-box">
              <input
                type="email"
                name="email"
                placeholder='Email'
                required
                value={formdata.email}
                onChange={handleChange}
              />
              <MdEmail className='icon' />
            </div>
            <div className="input-box">
              <input
                type="password"
                name="password"
                placeholder='Password'
                required
                value={formdata.password}
                onChange={handleChange}
              />
              <FaLock className='icon' />
            </div>

            <div className="remember-forget">
              <label><input type="checkbox" />Remember me</label>
              <a href="#">Forgot Password?</a>
            </div>

            <button type="submit">Login</button>
            <div className="register-link">
              <p>Don't have an account? <a href="#" onClick={RegisterLink}>Register</a></p>
            </div>
          </form>
        </div>

        <div className='form-box register'>
          <form onSubmit={handleSubmit}>
            <h1>Registration</h1>
            <div className="input-box">
              <input
                type="text"
                name="firstName"
                placeholder='FirstName'
                required
                value={formdata.firstName}
                onChange={handleChange}
              />
              <FaUser className='icon' />
            </div>
            <div className="input-box">
              <input
                type="text"
                name="lastName"
                placeholder='LastName'
                required
                value={formdata.lastName}
                onChange={handleChange}
              />
              <FaUser className='icon' />
            </div>
            <div className="input-box">
              <input
                type="email"
                name="email"
                placeholder='Email'
                required
                value={formdata.email}
                onChange={handleChange}
              />
              <MdEmail className='icon' />
            </div>
            <div className="input-box">
              <input
                type="password"
                name="password"
                placeholder='Password'
                required
                value={formdata.password}
                onChange={handleChange}
              />
              <FaLock className='icon' />
            </div>

            <div className="remember-forget">
              <label><input type="checkbox" />I agree to the terms & conditions</label>
            </div>

            <button type="submit" onClick={LoginLink}>Register</button>
            <div className="register-link">
              <p>Already have an account? <a href="#" onClick={LoginLink}>Login</a></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;