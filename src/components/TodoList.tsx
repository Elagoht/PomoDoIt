import { FC } from "react"
import { IToDo } from "../types/states"
import { AddTodo, RemoveTodo, SetTodo, SetTodoChecked, SetTodoSessions } from "../utils/states"
import classNames from "classnames"
import { Plus, X } from "lucide-react"
import { nanoid } from "nanoid"

interface TodoListProps {
  category: [string, IToDo[]]
}

const TodoList: FC<TodoListProps> = ({ category }) => {

  const handleNewToDo = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    const newToDoSessions: HTMLInputElement = event.currentTarget.previousSibling as HTMLInputElement
    const newToDo: HTMLInputElement = newToDoSessions.previousSibling as HTMLInputElement

    AddTodo([category[0], {
      id: nanoid(),
      checked: false,
      session: parseInt(newToDoSessions.value),
      remaining: parseInt(newToDoSessions.value),
      todo: newToDo.value
    }])

    newToDo.value = ""
    newToDoSessions.value = "1"
  }

  return <div>

    <div key={category[0]}>
      <h1 className="text-2xl">{category[0]}</h1>

      <label className="bg-white text-neutral-800 flex items-center gap-2 px-4 border rounded cursor-pointer m-1">
        <input
          className="flex-1 line-clamp-1 h-12 ml-2 outline-none bg-white"
          placeholder="A new responsibility"
        />

        <input
          type="number"
          min="0"
          defaultValue="1"
          className="w-20 text-center bg-neutral-100 p-4"
        />

        <button
          className="flex gap-2 bg-green-100 hover:bg-green-200 -mx-2 -mr-4 p-4 text-green-600 hover:text-green-800 transition-colors"
          onClick={(event) => handleNewToDo(event)}
        >
          <Plus strokeWidth={4} />
        </button>

      </label>

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
              SetTodoChecked([category[0], item.id, event.currentTarget.checked])
            }}
          />
          {item.id}
          <input
            className={classNames({
              "flex-1 line-clamp-1 h-12 ml-2 outline-none bg-white": true,
              "line-through": item.checked
            })}
            defaultValue={item.todo}
            placeholder="Don't leave todos empty"
            onBlur={(event) => SetTodo([category[0], item.id, event.currentTarget.value])}
          />

          <input
            value={item.session}
            onChange={(event) =>
              SetTodoSessions([category[0], item.id, parseInt(event.currentTarget.value)])
            }
            type="number"
            min="0"
            className="w-20 text-center bg-neutral-100 p-4"
          />

          <button
            onClick={() => RemoveTodo([category[0], item.id])}
            className=" bg-red-100 hover:bg-red-200 -mx-2 -mr-4 p-4 text-red-600 hover:text-red-800 transition-colors"
          >
            <X />
          </button>

        </label>
      ))}
    </div>
  </div >
}

export default TodoList
