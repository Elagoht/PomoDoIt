import { configureStore } from "@reduxjs/toolkit"
import Todos from "./todos"
import Pomodoro from "./pomodoro"
import Category from "./category"
import Alert from "./alert"

const store = configureStore({
  reducer: {
    Pomodoro,
    Todos,
    Category,
    Alert
  }
})

export type RootState = ReturnType<typeof store.getState>;
export default store