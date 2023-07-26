import { configureStore } from "@reduxjs/toolkit"
import Todos from "./todos"
import Pomodoro from "./pomodoro"
import Category from "./category"

const store = configureStore({
  reducer: {
    Pomodoro,
    Todos,
    Category
  }
})

export type RootState = ReturnType<typeof store.getState>;
export default store