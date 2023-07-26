import { PayloadAction, createSlice, SliceCaseReducers } from "@reduxjs/toolkit"
import { ICategory } from "../types/states"

const initialState: ICategory = localStorage.getItem("category")
  ? JSON.parse(localStorage.getItem("category") as string)
  : { name: 0 }

const Category = createSlice<ICategory, SliceCaseReducers<ICategory>>({
  name: "category",
  initialState,
  reducers: {
    setCategory: (state: ICategory, action: PayloadAction<number>) => {
      state.name = action.payload
    }
  }
})

export const { setCategory } = Category.actions
export default Category.reducer
