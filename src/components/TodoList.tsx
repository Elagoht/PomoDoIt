import { FC } from "react"
import { IToDo } from "../types/states"
import { SetTodoChecked, SetTodoSessions } from "../utils/states"
import classNames from "classnames"

interface TodoListProps {
  category: [string, IToDo[]]
}

const TodoList: FC<TodoListProps> = ({ category }) => {


  return <div>
    <div key={category[0]}>
      <h1 className="text-2xl">{category[0]}</h1>
      <ol>
        {category[1].map((item, index) => (
          <li key={item.todo} className="flex gap-2 p-4 border rounded">
            <input
              type="checkbox"
              id={`todo-${index}`}
              onChange={(event) => {
                SetTodoChecked([category[0], index, event.currentTarget.checked])
              }}
            />

            <label
              htmlFor={`todo-${index}`}
              className={classNames({ "line-through": item.checked })}
            > {item.todo}</label>

            <input
              value={item.session}
              onChange={(event) => SetTodoSessions([category[0], index, parseInt(event.currentTarget.value)])}
              type="number"
              min={1}
              className="w-16" />
          </li>
        ))}
      </ol>
    </div>
    <pre>
      {JSON.stringify(category[1], null, 2)}
    </pre>
  </div>
}

export default TodoList
