import axios from 'axios';

const API_URL = "http://localhost:5000/api/auth";

const login = async (userData) => {
  const res = await axios.post(`${API_URL}/login`, userData);
  return res.data; // { token, user }
};

const register = async (userData) => {
  const res = await axios.post(`${API_URL}/register`, userData);
  return res.data;
};
const authService = { login ,register};
export default authService;
