import React, { useState } from 'react';
import {
  Box, TextField, Button, Typography, Paper, CircularProgress
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.auth);

  const handleLogin = async (e) => {
    e.preventDefault();
    await dispatch(loginUser({ email, password }));
    navigate('/home');
  };

  return (
    <Paper elevation={3} sx={{ maxWidth: 400, mx: 'auto', mt: 10, p: 4 }}>
      <Typography variant="h5" gutterBottom fontWeight={600}>
        Login to Your Account
      </Typography>
      <Box component="form" onSubmit={handleLogin} mt={2}>
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button
          fullWidth
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
        </Button>

        {error && <Typography color="error" mt={2}>❌ {error}</Typography>}
        {user && <Typography color="success.main" mt={2}>✅ Welcome {user.name}</Typography>}
      </Box>
    </Paper>
  );
};

export default Login;
