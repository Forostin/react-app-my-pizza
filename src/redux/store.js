import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './slices/filterSlice';
import cart from  './slices/cartSlice';
import pizzas from './slices/pizzasSlice';

export const store = configureStore({
  reducer: { 
      filter: filterSlice,
      cart : cart,
      pizzas: pizzas
  },
})

