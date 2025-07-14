import axios from 'axios';

const API_BASE = "https://marketplace-mern-me3i.onrender.com/api";

// 🔐 Login
const login = async (userData) => {
  const res = await axios.post(`${API_BASE}/auth/login`, userData);
  return res.data; // { token, user }
};

// 📝 Register
const register = async (userData) => {
  const res = await axios.post(`${API_BASE}/auth/register`, userData);
  return res.data; // { message }
};

// 👥 Get All Users (protected route)
const getAllUsers = async (token) => {
  const res = await axios.get(`${API_BASE}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data; // array of users
};

// 📦 Export all
const authService = { login, register, getAllUsers };
export default authService;
