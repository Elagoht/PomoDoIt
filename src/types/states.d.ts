import { PomodoroState } from "../utils/enums"

export interface IToDo {
  checked: boolean
  todo: string
  session: number,
  remaining: number
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
}