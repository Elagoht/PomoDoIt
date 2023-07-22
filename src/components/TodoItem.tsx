import { FC } from "react"
import { RemoveTodo, SetTodo, SetTodoChecked, SetTodoSessions } from "../utils/states"
import classNames from "classnames"
import { IToDo } from "../types/states"
import { X } from "lucide-react"

interface TodoItemProps {
  categoryName: string
  index: number,
  item: IToDo
}

const TodoItem: FC<TodoItemProps> = ({ categoryName, index, item }) => {
  return <label
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
        SetTodoChecked([categoryName, item.id, event.currentTarget.checked])
      }}
    />

    <input
      className={classNames({
        "flex-1 line-clamp-1 h-12 ml-2 outline-none bg-white": true,
        "line-through": item.checked
      })}
      defaultValue={item.todo}
      placeholder="Don't leave todos empty"
      onBlur={(event) => SetTodo([categoryName, item.id, event.currentTarget.value])}
    />

    <input
      value={item.session}
      onChange={(event) =>
        SetTodoSessions([categoryName, item.id, parseInt(event.currentTarget.value)])
      }
      type="number"
      min="0"
      className="w-20 text-center bg-neutral-100 p-4"
    />

    <button
      onClick={() => RemoveTodo([categoryName, item.id])}
      className=" bg-red-100 hover:bg-red-200 -mx-2 -mr-4 p-4 text-red-600 hover:text-red-800 transition-colors"
    >
      <X />
    </button>

  </label>
}

export default TodoItem