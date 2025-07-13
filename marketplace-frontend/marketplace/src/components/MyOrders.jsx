import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  Divider
} from '@mui/material';
import { useSelector } from 'react-redux';
import { getMyOrders } from '../services/orderService';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getMyOrders(token);
        setOrders(res);
      } catch (err) {
        console.error('Error fetching orders');
      }
    };

    fetchOrders();
  }, [token]);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom fontWeight={600}>
        My Orders
      </Typography>
      {orders.length === 0 ? (
        <Typography>No orders placed yet.</Typography>
      ) : (
        orders.map((order) => (
          <Paper key={order._id} sx={{ p: 2, mb: 2 }}>
            <Typography fontWeight={500}>
              Order ID: {order._id}
            </Typography>
            <Typography color="text.secondary">
              Status: {order.status}
            </Typography>
            <Typography color="text.secondary">
              Placed on: {new Date(order.createdAt).toLocaleString()}
            </Typography>
            <List dense>
              {order.items.map((item, i) => (
                <ListItem key={i}>
                  {item.name} — ₹{item.price} × {item.qty}
                </ListItem>
              ))}
            </List>
            <Divider sx={{ my: 1 }} />
            <Typography fontWeight={600}>Total: ₹{order.total}</Typography>
          </Paper>
        ))
      )}
    </Box>
  );
};

export default MyOrders;
