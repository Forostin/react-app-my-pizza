import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
import PizzaBlock from '../../components/pizzaBlock/PizzaBlock';

export type SearchPizzasParams = {
  order: string,
  search: string,
  sortType: any,
  categoryId: number,
}
export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzaStatus',
  async (params : SearchPizzasParams) => {
    const {order, search, sortType, categoryId } = params;
    const {data} = await axios.get<Pizza[]>(
      `https://6398a9ebfe03352a94da4657.mockapi.io/api/v1/items?${
                categoryId>0 ? `category=${categoryId}`:''
                }&sortBy=${sortType.sortProperty.replace('-','')}&order=${order}${search}`
              )
       return data as Pizza[]
  }
) 

type Pizza = {
  types: any;
  id: number,
  title: string,
  price: number,
  imageUrl: string,
  size : number[],
  type : number[],
  count: number
}

interface PizzaSliseState{
  items: Pizza[];
  loading : 'loading' | 'success' | 'error';
}

const initialState : PizzaSliseState = {
  items: [],
  loading : 'loading' //  'success' | 'error'
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
          state.loading = 'loading'
          state.items = []
       })
       .addCase(fetchPizzas.fulfilled, (state, action) => {
          state.items = action.payload
          state.loading = 'success'
       })
       .addCase(fetchPizzas.rejected, (state) => {
          state.loading = 'error'
          state.items = []
       })
 }
})  

export const { setItems } = pizzasSlice.actions
export default pizzasSlice.reducer