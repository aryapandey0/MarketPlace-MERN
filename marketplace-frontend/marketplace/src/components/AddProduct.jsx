import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Snackbar,
  Alert
} from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: ''
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const { token } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/api/products/add',
        {
          ...formData,
          price: parseInt(formData.price)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setSuccess(true);
      setFormData({ name: '', description: '', price: '', image: '' });
    } catch (err) {
      setError(err?.response?.data?.error || 'Failed to add product');
    }
  };

  return (
    <Paper elevation={3} sx={{ maxWidth: 600, mx: 'auto', mt: 10, p: 4 }}>
      <Typography variant="h5" gutterBottom fontWeight={600}>
        Add New Product
      </Typography>
      <Box component="form" onSubmit={handleSubmit} mt={2}>
        <TextField
          fullWidth
          label="Product Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          margin="normal"
          multiline
          rows={3}
          required
        />
        <TextField
          fullWidth
          label="Price (₹)"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Image URL"
          name="image"
          value={formData.image}
          onChange={handleChange}
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Add Product
        </Button>

        {error && (
          <Typography color="error" mt={2}>
            ❌ {error}
          </Typography>
        )}
      </Box>

      {/* Snackbar for Success */}
      <Snackbar open={success} autoHideDuration={3000} onClose={() => setSuccess(false)}>
        <Alert severity="success" onClose={() => setSuccess(false)} sx={{ width: '100%' }}>
          Product added successfully!
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default AddProduct;
