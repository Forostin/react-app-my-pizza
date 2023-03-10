import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  items: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState : initialState,
  reducers: {
    //  addItem: (state, action) => {
    //      state.items.push(action.payload);
    //      state.totalPrice = state.items.reduce((sum, obj)=>{
    //          return obj.price + sum
    //        }, 0 )  
    //  }, 
     addItem: (state, action) => {
        const findItem = state.items.find((obj) => obj.id === action.payload.id);
              if(findItem){
                findItem.count++;
              } else {
                state.items.push({
                  ...action.payload,
                  count : 1
                });
              }

        state.totalPrice = state.items.reduce((sum, obj)=>{
              return obj.price * obj.count + sum
        }, 0 )  
     }, 
     minusItem:(state, action)=>{
      const findItem = state.items.find((obj) => obj.id === action.payload);
         if(findItem && findItem.count > 0){
             findItem.count--;
             state.totalPrice = state.items.reduce((sum, obj)=>{
              return obj.price * obj.count + sum
        }, 0 )  
         }
         else{
          if(window.confirm("Are you sure you wont to remove this pizza?")){
          state.items = state.items.filter(obj => obj.id !== action.payload)}
         }
     },
     removeItem: (state, action)=>{
         state.items = state.items.filter(obj => obj.id !== action.payload)
     },
     clearItems: (state)=>{
        state.items = [];
        state.totalPrice = 0;
     }
      
  }
})

export const { addItem, minusItem, removeItem, clearItems} = cartSlice.actions
export default cartSlice.reducer