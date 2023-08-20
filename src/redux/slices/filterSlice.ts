import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  searchValue: '',
  categoryId: 0,
  sort: {
          nameSort:'популярности', 
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
         state.categoryId = Number(action.payload)
         state.sort = action.payload
      },
      setSearchValue: (state, action) => {
         state.searchValue = action.payload
      }
  }
})

export const { setCategoryId, setSort, setFilters, setSearchValue } = filterSlice.actions
export default filterSlice.reducer