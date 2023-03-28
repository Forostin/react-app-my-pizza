import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzaStatus',
  async (params) => {
    const {order, search, sortType, categoryId } = params;
    const res = await axios.get(
      `https://6398a9ebfe03352a94da4657.mockapi.io/api/v1/items?${
                categoryId>0 ? `category=${categoryId}`:''
                }&sortBy=${sortType.sortProperty.replace('-','')}&order=${order}${search}`
              )
    return res.data
  }
)

const initialState = {
  items: [],
  status : 'loading'
}

export const pizzasSlice = createSlice({
  name: 'pizza',
  initialState : initialState,
  reducers: {
      setItems: (state, action) => {
         state.items = action.payload  
      }
  },

  extraReducers: (builder) => {
    builder
       .addCase(fetchPizzas.pending, (state) => {
          state.status = 'loading'
          state.items = []
       })
       .addCase(fetchPizzas.fulfilled, (state, action) => {
          state.items = action.payload
          state.status = 'success'
       })
       .addCase(fetchPizzas.rejected, (state) => {
          state.status = 'error'
          state.items = []
       })
 }
})  

export const { setItems } = pizzasSlice.actions
export default pizzasSlice.reducer