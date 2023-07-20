import { PayloadAction, createSlice, SliceCaseReducers } from "@reduxjs/toolkit"
import { IToDo, IToDos } from "../types/states"

const initialState: IToDos = {
  todos: {
    Goals: [
      {
        checked: false,
        session: 2,
        todo: "Create a pomodoro"
      },
      {
        checked: false,
        session: 2,
        todo: "Complete a pomodoro"
      },
      {
        checked: false,
        session: 2,
        todo: "Check a todo as completed"
      }
    ],
  },
}

const Todos = createSlice<IToDos, SliceCaseReducers<IToDos>>({
  name: "todos",
  initialState,
  reducers: {
    addCategory: (state: IToDos, action: PayloadAction<string>) => {
      state.todos = { ...state.todos, [action.payload]: [] }
    },
    removeCategory: (state: IToDos, action: PayloadAction<string>) => {
      const newObject = { ...state.todos }
      delete newObject[action.payload]
      state.todos = newObject
    },
    addTodo: (state: IToDos, action: PayloadAction<[string, IToDo]>) => {
      const [category, todo] = action.payload
      state.todos = {
        ...state.todos,
        [category]: [...(state.todos[category] || []), todo],
      }
    },
    removeTodo: (state: IToDos, action: PayloadAction<[string, number]>) => {
      const [category, todoIndex] = action.payload
      if (state.todos[category]) {
        state.todos[category].splice(todoIndex, 1)
      }
    },
    setTodoChecked: (state: IToDos, action: PayloadAction<[string, number, boolean]>) => {
      const [category, todoIndex, checked] = action.payload
      if (state.todos[category] && state.todos[category][todoIndex]) {
        state.todos[category][todoIndex].checked = checked
      }
    },
    setTodoPomodoro: (state: IToDos, action: PayloadAction<[string, number, number]>) => {
      const [category, todoIndex, session] = action.payload
      if (state.todos[category] && state.todos[category][todoIndex]) {
        state.todos[category][todoIndex].session = session
      }
    },
  },
})

export const { addCategory, removeCategory, addTodo, removeTodo, setTodoChecked, setTodoPomodoro } = Todos.actions
export default Todos.reducer
