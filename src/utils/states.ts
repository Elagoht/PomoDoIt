import store from "../contexts"
import { setCategory } from "../contexts/category"
import { setDuration, setPlaying, setRemaining, setState, setToLong } from "../contexts/pomodoro"
import { addCategory, addTodo, clearCheckedTodos, decreaseSessions, removeCategory, removeTodo, renameCategory, setTodo, setTodoActive, setTodoChecked, setTodoPinned, setTodoSessions } from "../contexts/todos"
import { IToDo } from "../types/states"

// Save to Local Storage
const saveTodos = () => {
  localStorage.setItem("todos",
    JSON.stringify(store.getState().Todos.todos)
  )
}
const savePomodoro = () => {
  localStorage.setItem("pomodoro",
    JSON.stringify(store.getState().Pomodoro)
  )
}
const saveCategory = () => {
  localStorage.setItem("category",
    JSON.stringify(store.getState().Category)
  )
}

// Todo hooks
export const AddCategory = (payload: string): void => {
  store.dispatch(addCategory(payload))
  saveTodos()
}
export const RemoveCategory = (payload: string): void => {
  store.dispatch(removeCategory(payload))
  saveTodos()
}
export const RenameCategory = (payload: [string, string]): void => {
  store.dispatch(renameCategory(payload))
  saveTodos()
}
export const AddTodo = (payload: [string, IToDo]): void => {
  store.dispatch(addTodo(payload))
  saveTodos()
}
export const RemoveTodo = (payload: [string, string]): void => {
  store.dispatch(removeTodo(payload))
  saveTodos()
}
export const SetTodo = (payload: [string, string, string]): void => {
  store.dispatch(setTodo(payload))
  saveTodos()
}
export const SetTodoChecked = (payload: [string, string, boolean]): void => {
  store.dispatch(setTodoPinned([payload[0], payload[1], false]))
  store.dispatch(setTodoActive([payload[0], payload[1], false]))
  store.dispatch(setTodoChecked(payload))
  saveTodos()
}
export const SetTodoPinned = (payload: [string, string, boolean]): void => {
  store.dispatch(setTodoPinned(payload))
  saveTodos()
}
export const SetTodoActive = (payload: [string, string, boolean]): void => {
  store.dispatch(setTodoActive(payload))
  saveTodos()
}
export const SetTodoSessions = (payload: [string, string, number]): void => {
  store.dispatch(setTodoSessions(payload))
  saveTodos()
}
export const DecreaseSessions = (payload: string): void => {
  store.dispatch(decreaseSessions(payload))
  saveTodos()
}
export const ClearCheckedTodos = (payload: string): void => {
  store.dispatch(clearCheckedTodos(payload))
  saveTodos()
}

// Pomodoro hooks
export const SetPlaying = (payload: boolean): void => {
  store.dispatch(setPlaying(payload))
}
export const SetState = (payload: number): void => {
  store.dispatch(setState(payload))
  savePomodoro()
}
export const SetDuration = (payload: number): void => {
  store.dispatch(setDuration(payload))
  store.dispatch(setRemaining(payload))
  savePomodoro()
}
export const SetRemaining = (payload: number): void => {
  store.dispatch(setRemaining(payload))
  savePomodoro()
}
export const SetToLong = (payload: number): void => {
  store.dispatch(setToLong(payload))
  savePomodoro()
}

// Category hooks
export const SetCategory = (payload: number): void => {
  store.dispatch(setCategory(payload))
  saveCategory()
}