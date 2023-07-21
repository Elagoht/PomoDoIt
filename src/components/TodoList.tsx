import { FC } from "react"
import { IToDo } from "../types/states"
import { RemoveTodo, SetTodo, SetTodoChecked, SetTodoSessions } from "../utils/states"
import classNames from "classnames"
import { X } from "lucide-react"

interface TodoListProps {
  category: [string, IToDo[]]
}

const TodoList: FC<TodoListProps> = ({ category }) => {


  return <div>
    <div key={category[0]}>
      <h1 className="text-2xl">{category[0]}</h1>
      <div>
        {category[1].map((item, index) => (
          <label
            key={index}
            htmlFor={`todo-${index}`}
            className={classNames({
              "bg-white text-neutral-800 flex items-center gap-2 px-4 border rounded cursor-pointer m-1": true,
              "border-red-500": item.todo === "",
              "line-through": item.checked
            })}
          >
            <input
              type="checkbox"
              id={`todo-${index}`}
              checked={item.checked}
              className="w-6 h-6"
              onChange={(event) => {
                SetTodoChecked([category[0], index, event.currentTarget.checked])
              }}
            />

            <input
              className="flex-1 line-clamp-1 h-12 ml-2 outline-none bg-white"
              defaultValue={item.todo}
              placeholder="Don't leave todos empty"
              onBlur={(event) => SetTodo([category[0], index, event.currentTarget.value])}
            />

            <input
              value={item.session}
              onChange={(event) =>
                SetTodoSessions([category[0], index, parseInt(event.currentTarget.value)])
              }
              type="number"
              min={1}
              className="w-20 text-center bg-neutral-100 p-3 mr-2"
            />

            <button
              onClick={() => RemoveTodo([category[0], index])}
            >
              <X className="text-red-600 hover:text-red-800" />
            </button>

          </label>
        ))}
      </div>
    </div>

  </div>
}

export default TodoList
