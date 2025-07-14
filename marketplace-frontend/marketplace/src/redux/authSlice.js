import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../services/authService';


const userFromStorage = localStorage.getItem("user");
const tokenFromStorage = localStorage.getItem("token");

const initialState = {
  user: userFromStorage ? JSON.parse(userFromStorage) : null,
  token: tokenFromStorage || null,
  allUsers: [], 
  loading: false,
  error: null,
};


export const loginUser = createAsyncThunk("auth/loginUser", async (userData, thunkAPI) => {
  try {
    return await authService.login(userData); // returns { user, token }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Login failed");
  }
});


export const registerUser = createAsyncThunk("auth/registerUser", async (userData, thunkAPI) => {
  try {
    return await authService.register(userData); // returns only { message }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Register failed");
  }
});


export const getAllUsers = createAsyncThunk("auth/getAllUsers", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token; // 🔐 get token from state
    return await authService.getAllUsers(token);  // returns [user1, user2, ...]
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Fetching users failed");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.allUsers = [];
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
       
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

    
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.allUsers = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
