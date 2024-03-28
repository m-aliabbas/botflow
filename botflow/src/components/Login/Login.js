import React, { useState } from 'react';
import { Button, TextField, Typography, Container } from '@mui/material';
import axios from 'axios';
import '../index.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  
  const navigate = useNavigate(); // Call useNavigate hook here

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? 'token' : 'register';
    const url = `http://localhost:8000/${endpoint}`;
  
    try {
      const formData = new URLSearchParams();
      const data = isLogin ? formData : JSON.stringify({ username: email, password });
      const config = {
        headers: { 'Content-Type': isLogin ? 'application/x-www-form-urlencoded' : 'application/json' },
      };
  
      if (isLogin) {
        // Login logic remains the same
        formData.append('username', email);
        formData.append('password', password);
        formData.append('grant_type', 'password');
        
        const response = await axios.post(url, data, config);
        localStorage.setItem('token', response.data.access_token); // Adjust as per your API response
        localStorage.setItem('user_id', response.data.user_id);
        const userId = response.data.user_id; // Get user_id from response
  
        // Redirect to /botpanel with user_id as state
        navigate('/botpanel');
      } else {
        // If not logging in, assume signing up
        await axios.post(url, data, config);
        
        // After successful signup, instead of redirecting, change form to login mode
        setIsLogin(true); // Switch to login form
        alert('Signup successful, please login.');
      }
    } catch (error) {
      console.error(isLogin ? 'Login error' : 'Signup error', error);
      alert(isLogin ? 'Incorrect Username or Password!' : 'Username Already Exists!');
    }
  };
  
  
  return (
    <Container component="main" maxWidth="xs">
      <div className="paper">
        <Typography component="h1" variant="h5">
          {isLogin ? 'Login' : 'Sign Up'}
        </Typography>
        <form className="form" noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="submit"
            style={{ backgroundColor: 'black', color: 'white' }}
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </Button>
        </form>
        <Typography component="p" style={{ marginTop: '10px' }}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <Button onClick={() => setIsLogin(!isLogin)} color="primary">
            {isLogin ? 'Sign Up' : 'Login'}
          </Button>
        </Typography>
      </div>
    </Container>
  );
}

export default Login;
