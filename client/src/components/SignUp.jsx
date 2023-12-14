// src/components/SignUp.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setUser } from '../redux/authSlice';
import './styles/styleone.css'

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSignUp = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        password,
      });
      const { token, user } = response.data;
      dispatch(setUser({ token, user }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div  class="log-form">
      <h2>Sign Up</h2>
      <form>
      <input type="text"  placeholder="username"  value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password"  placeholder="password"  value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button  class="btn" onClick={handleSignUp}>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
