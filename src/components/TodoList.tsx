import { FC } from "react"
import { IToDo } from "../types/states"
import { SetTodoChecked } from "../utils/states"

interface TodoListProps {
  category: [string, IToDo[]]
}

const TodoList: FC<TodoListProps> = ({ category }) => {


  return <div>
    <div key={category[0]}>
      <h1 className="text-2xl">{category[0]}</h1>
      <ol>
        {category[1].map((item, index) => (
          <li key={item.todo}>
            <input
              type="checkbox"
              id={`todo-${index}`}
              onChange={
                (event) => {
                  SetTodoChecked([category[0], index, event.currentTarget.checked])
                }
              }
            />
            <label htmlFor={`todo-${index}`}> {item.todo}</label>
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
