import { PayloadAction, createSlice, SliceCaseReducers } from "@reduxjs/toolkit"
import { IToDo, IToDos } from "../types/states"
import { nanoid } from "nanoid"

const initialState: IToDos = {
  todos: localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos") as string)
    : {
      Pomodoro: [
        {
          id: nanoid(),
          active: false,
          checked: false,
          pinned: false,
          session: 2,
          remaining: 2,
          todo: "Create a category"
        },
        {
          id: nanoid(),
          active: false,
          checked: false,
          pinned: false,
          session: 2,
          remaining: 2,
          todo: "Complete a task"
        },
      ]
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
    renameCategory: (state: IToDos, action: PayloadAction<[string, string]>) => {
      const [oldKey, newKey] = action.payload
      let updatedJson = {}
      Object.keys(state.todos).forEach((key) => {
        const updatedKey = key === oldKey ? newKey : key
        updatedJson = { ...updatedJson, [updatedKey]: state.todos[key] }
      })

      state.todos = updatedJson;
    },
    addTodo: (state: IToDos, action: PayloadAction<[string, IToDo]>) => {
      const [category, todo] = action.payload
      state.todos = {
        ...state.todos,
        [category]: [...(state.todos[category] || []), todo],
      }
    },
    removeTodo: (state: IToDos, action: PayloadAction<[string, string]>) => {
      const [category, id] = action.payload
      if (state.todos[category]) {
        if (state.todos[category].find(todo => todo.id === id)) {
          state.todos[category].splice(
            (state.todos[category].findIndex(todo => todo.id === id)),
            1
          )
        }
      }
    },
    setTodoChecked: (state: IToDos, action: PayloadAction<[string, string, boolean]>) => {
      const [category, id, checked] = action.payload
      if (state.todos[category])
        if (state.todos[category].find(todo => todo.id === id)) {
          (state.todos[category].find(todo => todo.id === id) as IToDo).checked = checked
        }
    },
    setTodoActive: (state: IToDos, action: PayloadAction<[string, string, boolean]>) => {
      const [category, id, active] = action.payload
      if (state.todos[category])
        if (state.todos[category].find(todo => todo.id === id)) {
          (state.todos[category].find(todo => todo.id === id) as IToDo).active = active
        }
    },
    setTodoPinned: (state: IToDos, action: PayloadAction<[string, string, boolean]>) => {
      const [category, id, pinned] = action.payload
      if (state.todos[category])
        if (state.todos[category].find(todo => todo.id === id)) {
          (state.todos[category].find(todo => todo.id === id) as IToDo).pinned = pinned
        }
    },
    setTodo: (state: IToDos, action: PayloadAction<[string, string, string]>) => {
      const [category, id, todo] = action.payload
      if (state.todos[category])
        if (state.todos[category].find(todo => todo.id === id)) {
          (state.todos[category].find(todo => todo.id === id) as IToDo).todo = todo
        }
    },
    setTodoSessions: (state: IToDos, action: PayloadAction<[string, string, number]>) => {
      const [category, id, session] = action.payload
      if (state.todos[category])
        if (state.todos[category].find(todo => todo.id === id)) {
          (state.todos[category].find(todo => todo.id === id) as IToDo).session = session
        }
    },
    decreaseSessions: (state: IToDos, action: PayloadAction<string>) => {
      state.todos[action.payload].forEach(item => {
        if (item.active && item.session > 0)
          item.session--
      })
    },
    clearCheckedTodos: (state: IToDos, action: PayloadAction<string>) => {
      state.todos[action.payload] = state.todos[action.payload]
        .filter(item => !item.checked)
    }
  }
})

export const {
  addCategory, removeCategory, renameCategory,
  addTodo, removeTodo, setTodo,
  setTodoChecked, setTodoActive, setTodoPinned,
  setTodoSessions, decreaseSessions, clearCheckedTodos
} = Todos.actions
export default Todos.reducer
