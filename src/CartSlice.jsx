import { createSlice } from '@reduxjs/toolkit';


export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
    total_quantity: 0,
    addedToCart: {}, // Initialize addedToCart as an empty object
  },
  reducers: {
addItem: (state, action) => {
  const { name, image, cost } = action.payload;
  const existingItem = state.items.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    state.items.push({ name, image, cost, quantity: 1 });
    // Update addedToCart state
    state.addedToCart[name] = true;
  }
},
    removeItem: (state, action) => {
        state.items = state.items.filter(item => item.name !== action.payload);
        // Update addedToCart state
        delete state.addedToCart[action.payload];
    },
    updateQuantity: (state, action) => {
        const { name, quantity } = action.payload;
        const itemToUpdate = state.items.find(item => item.name === name);
        if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
        
        }
    
    },
    calculate_total_no_items(state,action){
    let total = 0;
    const cart = state.items;
    cart.forEach(plant => {
        total += plant.quantity;
    });
    state.total_quantity = total;
  }
},
});

export const { addItem, removeItem, updateQuantity , calculate_total_no_items } = CartSlice.actions;

export default CartSlice.reducer;
