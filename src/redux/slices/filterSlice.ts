import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type Sort = {
   name: string,
   // sortProperty:'rating' | 'title' | 'price'| '-rating' | '-title' | '-price'
   sortProperty: string
}

export interface FilterSliceState{
  searchValue : string,
  categoryId: number,
  sort: Sort
}

const initialState : FilterSliceState = {
  searchValue : '',
  categoryId: 0,
  sort: {
          name:'популярности', 
          sortProperty: 'rating'
  }
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState : initialState,
  reducers: {
      setSearchValue: (state, action: PayloadAction<string>) => {
         state.searchValue = action.payload;
      }, 
      setCategoryId: (state, action: PayloadAction<number>) => {
         state.categoryId = action.payload  
      }, 
      setSort: (state, action: PayloadAction<Sort>) => {
         state.sort = action.payload
      },
      setFilters: (state: any, action : PayloadAction<FilterSliceState> ) => {
         state.sortProperty = action.payload.sort;
         state.categoryId = Number(action.payload.categoryId)
         // if(Object.keys(action.payload).length){
         //    state.sortProperty = action.payload.sort;
         //    state.categoryId = Number(action.payload.categoryId);
         // } else {
         //    state.categoryId = 0;
         //    state.sort = {
         //       name:'популярности', 
         //       sortProperty: 'rating'
         //    }
         // }
      }
  }
})

export const { setCategoryId, setSort, setFilters, setSearchValue} = filterSlice.actions
export default filterSlice.reducer