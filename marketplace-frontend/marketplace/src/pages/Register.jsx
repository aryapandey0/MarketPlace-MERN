import React, { useState } from 'react';
import {
  Box, TextField, Button, Typography, Paper, MenuItem, CircularProgress
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/authSlice';

const Register = () => {
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'CUSTOMER'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };

  return (
    <Paper elevation={3} sx={{ maxWidth: 450, mx: 'auto', mt: 10, p: 4 }}>
      <Typography variant="h5" gutterBottom fontWeight={600}>
        Create a New Account
      </Typography>
      <Box component="form" onSubmit={handleRegister} mt={2}>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          select
          label="Role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          margin="normal"
        >
          <MenuItem value="CUSTOMER">Customer</MenuItem>
          <MenuItem value="SELLER">Seller</MenuItem>
        </TextField>
        <Button
          fullWidth
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
        </Button>

        {error && <Typography color="error" mt={2}>❌ {error}</Typography>}
        {user && <Typography color="success.main" mt={2}>✅ Welcome {user.name}</Typography>}
      </Box>
    </Paper>
  );
};

export default Register;
