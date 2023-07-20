import { configureStore } from "@reduxjs/toolkit"
import Todos from "./todos"

const store = configureStore({
  reducer: {
    Todos
  }
})

export type RootState = ReturnType<typeof store.getState>;
export default store