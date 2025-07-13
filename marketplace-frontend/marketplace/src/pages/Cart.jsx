import React from 'react';
import { placeOrder } from '../services/orderService';
import {
  Box,
  Typography,
  IconButton,
  Divider,
  Button,
  Paper,
  Grid
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import {
  increaseQty,
  decreaseQty,
  removeFromCart,
  clearCart
} from '../redux/cartSlice';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const navigate = useNavigate();
const { token } = useSelector((state) => state.auth);

const handlePlaceOrder = async () => {
  try {
    const items = cartItems.map(item => {
      const orderItem = {
        name: item.name,
        price: item.price,
        qty: item.qty
      };

      // ✅ Add this condition
      if (item._id?.length === 24) {
        orderItem.productId = item._id;
      }

      return orderItem;
    });

    await placeOrder(items, total, token);
    dispatch(clearCart());
    alert('Order placed successfully!');
    navigate('/my-orders');
  } catch (err) {
    alert('❌ Failed to place order');
    console.error(err);
  }
};
;


  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom fontWeight={600}>
        🛒 Your Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Typography>No items in cart</Typography>
      ) : (
        <>
          {cartItems.map((item) => (
            <Paper key={item._id} sx={{ mb: 2, p: 2 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={8}>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ₹{item.price} × {item.qty} = ₹{item.price * item.qty}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <IconButton
                    onClick={() => dispatch(decreaseQty(item._id))}
                    disabled={item.qty === 1}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography component="span" mx={1}>
                    {item.qty}
                  </Typography>
                  <IconButton onClick={() => dispatch(increaseQty(item._id))}>
                    <AddIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => dispatch(removeFromCart(item._id))}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Paper>
          ))}
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6">Total: ₹{total}</Typography>
          <Button variant="contained" color="error" sx={{ mt: 2 }} onClick={() => dispatch(clearCart())}>
            Clear Cart
          </Button>
<Button
  variant="contained"
  color="success"
  fullWidth
  sx={{ mt: 2 }}
  onClick={handlePlaceOrder}
>
  Place Order
</Button>

        </>
      )}
    </Box>
  );
};

export default Cart;
