import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Stack
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>

        {/* LEFT SIDE */}
        <Box>
          <Typography
            component={Link}
            to={user ? "/home" : "/"}
            variant="h6"
            sx={{
              textDecoration: 'none',
              color: 'primary.main',
              fontWeight: 'bold',
              mr: 2
            }}
          >
            🛒 MarketPlace
          </Typography>

         

          {user?.role === "SELLER" && (
            <Button component={Link} to="/add-product" color="primary">
              Add Product
            </Button>
          )}
        </Box>

        
        <Stack direction="row" spacing={2} alignItems="center">
          {!user ? (
            <>
              <Button component={Link} to="/login" variant="outlined" color="primary">
                Login
              </Button>
              <Button component={Link} to="/register" variant="contained" color="primary">
                Register
              </Button>
            </>
          ) : (
            <>
              <Button onClick={handleLogout} variant="outlined" color="error">
                Logout
              </Button>
            </>
          )}
           {user?.role === "CUSTOMER" && (
            <div>
            <Button component={Link} to="/cart" color="primary">
              
              Cart
            </Button>
             <Link to="/my-orders" style={{ marginLeft: 10, textDecoration:"none"}}>My Orders</Link>
             </div>
          )}

          {user?.role === "ADMIN" && (
            <div>
            <Button component={Link} to="/users" color="primary">
              
              ALL-Users
            </Button>
     
             </div>
          )}

        </Stack>

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
