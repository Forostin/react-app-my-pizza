import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categoryId: 0,
  stor: {
          name:'популярности', 
          sortProperty: 'rating'
  }
}

export const filterSlice = createSlice({
  name: 'filters',
  initialState : initialState,
  reducers: {
      setCategoryId: (state, action) => {
         state.categoryId = action.payload  
      }
   
  },
})

export const { setCategoryId } = filterSlice.actions
export default filterSlice.reducer