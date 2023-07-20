import store from "../contexts"
import { addCategory, addTodo, removeCategory, removeTodo, setTodoChecked, setTodoPomodoro } from "../contexts/todos"
import { IToDo } from "../types/states"

export const AddCategory = (payload: string): void => {
  store.dispatch(addCategory(payload))
}
export const RemoveCategory = (payload: string): void => {
  store.dispatch(removeCategory(payload))
}
export const AddTodo = (payload: [string, IToDo]): void => {
  store.dispatch(addTodo(payload))
}
export const RemoveTodo = (payload: [string, number]): void => {
  store.dispatch(removeTodo(payload))
}
export const SetTodoChecked = (payload: [string, number, boolean]): void => {
  store.dispatch(setTodoChecked(payload))
}
export const SetTodoPomodoro = (payload: [string, number, number]): void => {
  store.dispatch(setTodoPomodoro(payload))
}