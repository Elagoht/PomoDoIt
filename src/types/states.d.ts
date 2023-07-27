import { PomodoroState } from "../utils/enums"

export interface IToDo {
  id: string
  active: boolean
  checked: boolean
  todo: string
  session: number
  remaining: number
  pinned: boolean
}

export interface IToDos {
  todos: {
    [key: string]: IToDo[]
  }
}

export interface IPomodoro {
  state: PomodoroState
  duration: number
  remaining: number
  playing: boolean
  toLong: number
}

export interface ICategory {
  name: number
}