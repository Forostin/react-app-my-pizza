import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categoryId: 0,
  sort: {
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
      }, 
      setSort: (state, action) => {
         state.sort = action.payload
      },
      setFilters: (state, action) => {
         state.sortProperty = action.payload.sort;
         state.categoryId = Number(action.payload.categoryId)
      }
  }
})

export const { setCategoryId, setSort, setFilters} = filterSlice.actions
export default filterSlice.reducer