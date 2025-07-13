import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  Chip
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.user?.role);

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 4,
        boxShadow: 5,
        backgroundColor: '#fefefe',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: 8,
          backgroundColor: '#f9f9f9'
        }
      }}
    >
      <CardMedia
        component="img"
        height="180"
        image={product.image}
        alt={product.name}
        sx={{ objectFit: 'cover', borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          fontWeight="bold"
          sx={{ color: 'primary.main' }}
        >
          {product.name}
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary', minHeight: '48px' }}>
          {product.description}
        </Typography>

        <Chip
          label={`₹${product.price}`}
          color="secondary"
          sx={{ mt: 1, fontWeight: 'bold' }}
        />
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2 }}>
        {role === "CUSTOMER" && (
          <Button
            variant="contained"
            fullWidth
            color="primary"
            onClick={() => dispatch(addToCart(product))}
            sx={{ fontWeight: 'bold', borderRadius: '8px' }}
          >
            🛒 Add to Cart
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default ProductCard;
