import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/authSlice';
import { Link } from "react-router-dom";
import axios from 'axios';
import './styles/styleone.css'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      const { token, user } = response.data;
      dispatch(setUser({ token, user }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div class="log-form">
  <h2>Login to your account</h2>
  <form>
    <input type="text" title="username" placeholder="username"  value={username} onChange={(e) => setUsername(e.target.value)} />
    <input type="password" title="username" placeholder="password"  value={password} onChange={(e) => setPassword(e.target.value)} />
    <button type="submit" class="btn"  onClick={handleLogin}>Login</button>
    <a class="forgot" href="#">No account? Sign up here</a>
  </form>
</div>
  );
};

export default Login;
