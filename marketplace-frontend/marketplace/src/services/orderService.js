import axios from 'axios';

const API = 'http://localhost:5000/api/orders';

export const placeOrder = async (items, total, token) => {
  const res = await axios.post(`${API}/place`, { items, total }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
};

export const getMyOrders = async (token) => {
  const res = await axios.get(`${API}/my`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
};
