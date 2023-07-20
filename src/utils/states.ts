import store from "../contexts"
import { addCategory, addTodo, removeCategory, removeTodo, setTodoChecked, setTodoSessions } from "../contexts/todos"
import { IToDo } from "../types/states"

// Save to Local Storage

const saveTodos = () => {
  localStorage.setItem("todos",
    JSON.stringify(store.getState().Todos.todos)
  )
}

export const AddCategory = (payload: string): void => {
  store.dispatch(addCategory(payload))
  saveTodos()
}
export const RemoveCategory = (payload: string): void => {
  store.dispatch(removeCategory(payload))
  saveTodos()
}
export const AddTodo = (payload: [string, IToDo]): void => {
  store.dispatch(addTodo(payload))
  saveTodos()
}
export const RemoveTodo = (payload: [string, number]): void => {
  store.dispatch(removeTodo(payload))
  saveTodos()
}
export const SetTodoChecked = (payload: [string, number, boolean]): void => {
  store.dispatch(setTodoChecked(payload))
  saveTodos()
}
export const SetTodoSessions = (payload: [string, number, number]): void => {
  store.dispatch(setTodoSessions(payload))
  saveTodos()
}