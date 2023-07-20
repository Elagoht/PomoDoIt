import { configureStore } from "@reduxjs/toolkit"
import Todos from "./todos"
import Pomodoro from "./pomodoro"

const store = configureStore({
  reducer: {
    Pomodoro,
    Todos
  }
})

export type RootState = ReturnType<typeof store.getState>;
export default store