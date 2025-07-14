import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    total: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.cartItems.find(i => i._id === item._id);
      if (existing) {
        existing.qty += 1;
        alert("item added to cart")
      } else {
        state.cartItems.push({ ...item, qty: 1 });
          alert("item added to cart")
      }
      state.total += item.price;
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      const item = state.cartItems.find(i => i._id === id);
      if (item) {
        state.total -= item.price * item.qty;
        state.cartItems = state.cartItems.filter(i => i._id !== id);
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.total = 0;
    },
    increaseQty: (state, action) => {
  const item = state.cartItems.find(i => i._id === action.payload);
  if (item) {
    item.qty += 1;
    state.total += item.price;
  }
},
decreaseQty: (state, action) => {
  const item = state.cartItems.find(i => i._id === action.payload);
  if (item && item.qty > 1) {
    item.qty -= 1;
    state.total -= item.price;
  }
}

  }
});

export const { addToCart, removeFromCart, clearCart ,increaseQty,decreaseQty} = cartSlice.actions;
export default cartSlice.reducer;
