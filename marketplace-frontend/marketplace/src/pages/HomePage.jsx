import React from 'react';
import { Grid, Typography, Container } from '@mui/material';
import ProductCard from '../components/ProductCard';

const products = [
  {
    _id: "1",
    name: "iPhone 14 Pro",
    description: "Apple's latest flagship phone.",
    price: 129999,
    image: "/elegant-smartphone-composition.jpg"
  },
,
  {
    _id: "3",
    name: "AirPods Pro",
    description: "Wireless earbuds with noise cancellation.",
    price: 19999,
    image: "/modern-wireless-earphones-with-case-simple-concrete-background.jpg"
  },
  {
    _id: "4",
    name: "Apple Watch",
    description: "Smartwatch to track your fitness.",
    price: 34999,
    image: "/smartwatch.jpg"
  },
  {
    _id: "5",
    name: "Canon DSLR",
    description: "High-quality DSLR camera.",
    price: 74999,
    image: "/dslr.jpg"
  },
  {
    _id: "6",
    name: "Sony Headphones",
    description: "Over-ear noise-cancelling headphones.",
    price: 14999,
    image: "/headphones-audio-listen.jpg"
  },
  ,
  {
    _id: "8",
    name: "iPad Air",
    description: "Sleek tablet with powerful performance.",
    price: 59999,
    image: "/digital-tablet-screen-smart-tech.jpg"
  },
  {
    _id: "9",
    name: "SAMSUNG TV",
    description: "Amazing visual experience.",
    price: 89999,
    image: "/smart-tv-screen-with-copy-space-wooden-table.jpg"
  },
  {
    _id: "10",
    name: "Mechanical Keyboard",
    description: "RGB backlit gaming keyboard.",
    price: 4999,
    image: "/wireless-mouse-keyboard.jpg"
  }
];

const HomePage = () => {
  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" align="center" gutterBottom fontWeight={600}>
        🛍️ Featured Products
      </Typography>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;
