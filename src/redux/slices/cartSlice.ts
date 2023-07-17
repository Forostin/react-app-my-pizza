import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type CartItem = {
  id: number,
  title: string,
  price: number,
  imageUrl: string,
  size : number,
  type : string,
  count: number
}

interface CartSliceState{
  totalPrice: number,
  items: CartItem[]
}
const initialState : CartSliceState = {
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
     addItem: (state, action: PayloadAction<CartItem>) => {
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
        if(findItem && findItem.count > 1){
             findItem.count--;
             state.totalPrice = state.items.reduce((sum, obj)=>{
              return obj.price * obj.count + sum
        }, 0 )  
         }else{
          if(window.confirm("Are you sure you want to remove this pizza?")){
          state.items = state.items.filter(obj => obj.id !== action.payload)
          state.totalPrice = state.items.reduce((sum, obj)=>{
            return obj.price * obj.count + sum
      }, 0 )  
             
        };
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