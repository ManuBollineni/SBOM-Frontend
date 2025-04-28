import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';  // ✅ For redirect
import { showSuccessToast, showErrorToast } from "../../utils/Toast/Toast";
import api from '../../utils/api';                // ✅ Assuming you have api.js like for signup

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validate = () => {
    const errors = {};

    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Invalid email format';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await api.post('/login', {
          email,
          password
        });

        showSuccessToast('Login Successful');
        console.log('Login Successful', response.data);
        // Redirect to home/dashboard after login success
        navigate('/Home');

      } catch (error) {
        showErrorToast("Error occured during login");
        //alert(error.response?.data?.message || 'Login Failed');
      }
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-container">
        <h2>Login</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="error-text">{errors.email}</p>}

          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="error-text">{errors.password}</p>}

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
