import { createSlice } from '@reduxjs/toolkit';

// Helper function to safely calculate totals
const calculateTotals = (items) => {
  return items.reduce(
    (acc, item) => {
      acc.totalQuantity += item.quantity || 0;
      acc.totalAmount += (item.price || 0) * (item.quantity || 0);
      return acc;
    },
    { totalQuantity: 0, totalAmount: 0 }
  );
};

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      if (!newItem?.id) return; // Validate required fields
      
      const existingItem = state.items.find(item => item.id === newItem.id);
      
      const quantityToAdd = Math.max(1, newItem.quantity || 1);
      const price = Number(newItem.price) || 0;
      
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          name: newItem.name || '',
          price: price,
          quantity: quantityToAdd,
          totalPrice: price * quantityToAdd,
          image: newItem.image || ''
        });
      } else {
        existingItem.quantity += quantityToAdd;
        existingItem.totalPrice += price * quantityToAdd;
      }
      
      // Recalculate totals to ensure consistency
      const { totalQuantity, totalAmount } = calculateTotals(state.items);
      state.totalQuantity = totalQuantity;
      state.totalAmount = totalAmount;
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (!existingItem) return;
      
      if (existingItem.quantity === 1) {
        state.items = state.items.filter(item => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }
      
      // Recalculate totals
      const { totalQuantity, totalAmount } = calculateTotals(state.items);
      state.totalQuantity = totalQuantity;
      state.totalAmount = totalAmount;
    },
    updateCartItemQuantity(state, action) {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (!existingItem) return;
      
      const newQuantity = Math.max(1, quantity); // Ensure quantity is at least 1
      const quantityDifference = newQuantity - existingItem.quantity;
      
      existingItem.quantity = newQuantity;
      existingItem.totalPrice = existingItem.price * newQuantity;
      
      state.totalQuantity += quantityDifference;
      state.totalAmount += existingItem.price * quantityDifference;
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    }
  }
});

export const { 
  addItemToCart, 
  removeItemFromCart, 
  updateCartItemQuantity,
  clearCart 
} = cartSlice.actions;

export default cartSlice.reducer;