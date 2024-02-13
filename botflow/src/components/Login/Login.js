import React, { useState } from 'react';
import { Button, TextField, Typography, Container } from '@mui/material';
import '../index.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('Login clicked');
    // Implement login logic here
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    console.log('Signup clicked');
    // Implement signup logic here
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className="paper">
        <Typography component="h1" variant="h5">
          {isLogin ? 'Login' : 'Sign Up'}
        </Typography>
        <form className="form" onSubmit={isLogin ? handleLoginSubmit : handleSignupSubmit}>
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
            style={{ borderColor: 'black' }}
            InputProps={{ style: { color: 'black' } }}
            InputLabelProps={{ style: { color: 'black' } }}
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
            style={{ borderColor: 'black' }}
            InputProps={{ style: { color: 'black' } }}
            InputLabelProps={{ style: { color: 'black' } }}
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
        <Typography component="p">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <Button onClick={() => setIsLogin(!isLogin)} color="primary">
            {isLogin ? 'Sign Up' : 'Login'}
          </Button>
        </Typography>
      </div>
    </Container>
  );
}

export default Login;
