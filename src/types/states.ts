export interface IToDo {
  checked: boolean
  todo: string
  session: number
}

export interface IToDos {
  todos: {
    [key: string]: IToDo[]
  }
}
