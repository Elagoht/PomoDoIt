import { FC, useState } from "react"
import { RemoveTodo, SetTodo, SetTodoActive, SetTodoChecked, SetTodoPinend, SetTodoSessions } from "../utils/states"
import classNames from "classnames"
import { IToDo } from "../types/states"
import { X, Pin, PinOff, Check, LocateFixed, Locate, ChevronDown, ChevronUp } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

interface TodoItemProps {
  categoryName: string
  index: number,
  item: IToDo
}

const TodoItem: FC<TodoItemProps> = ({ categoryName, index, item }) => {

  const [deletion, setDeletion] = useState<boolean>(false)

  return <label
    htmlFor={`todo-${index}`}
    className={classNames({
      "transition-colors bg-white text-neutral-800 flex items-center border-2 border-neutral-500 rounded-lg cursor-pointer my-1": true,
      "!border-red-500": item.todo === "",
      "!border-sky-500": item.session === 0 && !item.checked,
      "!bg-lime-200": item.active,
      "!bg-orange-200": item.checked
    })}
  >
    <input
      type="checkbox"
      id={`todo-${index}`}
      checked={item.checked}
      className="w-8 h-8 mx-3"
      onChange={(event) => {
        SetTodoChecked([categoryName, item.id, event.currentTarget.checked])
      }}
    />

    <input
      className={classNames({
        "flex-1 grow line-clamp-1 text-ellipsis h-14 outline-none bg-transparent": true,
        "line-through": item.checked
      })}
      defaultValue={item.todo}
      placeholder="Don't leave todos empty"
      onBlur={(event) => SetTodo([categoryName, item.id, event.currentTarget.value])}
    />

    {/* Pin and Active */}
    {
      !item.checked &&
      <>
        <label
          className="h-14 w-10 flex justify-center items-center hover:bg-neutral-900 hover:bg-opacity-5 transition-colors"
        >
          <input
            type="checkbox"
            checked={item.checked ? false : item.pinned}
            disabled={item.checked}
            onChange={(event) => SetTodoPinend([categoryName, item.id, event.currentTarget.checked])}
            className="hidden"
          />
          {
            item.pinned
              ? <Pin />
              : <PinOff className="text-neutral-400" />
          }
        </label>
        <label
          className="h-14 w-10 flex justify-center items-center hover:bg-neutral-900 hover:bg-opacity-5 transition-colors"
        >
          <input
            type="checkbox"
            checked={item.checked ? false : item.active}
            disabled={item.checked}
            onChange={(event) => SetTodoActive([categoryName, item.id, event.currentTarget.checked])}
            className="hidden"
          />
          {
            item.active
              ? <LocateFixed />
              : <Locate className="text-neutral-400" />
          }
        </label>
      </>
    }
    {/* Sessions */}
    <div className="flex">
      <input
        value={item.session}
        onChange={(event) =>
          SetTodoSessions([categoryName, item.id, parseInt(event.currentTarget.value)])
        }
        type="number"
        min="0"
        className="h-14 w-10 text-center bg-blue-100 text-neutral-900"
      />
      <div className="flex flex-col">
        <button
          className="h-7 bg-blue-200"
          onClick={() => SetTodoSessions([
            categoryName,
            item.id,
            item.session + 1
          ])}
        >
          <ChevronUp />
        </button>
        <button
          className="h-7 bg-blue-300"
          onClick={() => SetTodoSessions([
            categoryName,
            item.id,
            item.session > 0
              ? item.session - 1
              : 0
          ])}
        >
          <ChevronDown />
        </button>
      </div>
    </div>
    {/* Delete */}
    <AnimatePresence mode="wait">
      {
        deletion &&
        <motion.button
          initial={{ marginRight: "-3.5rem", opacity: 0 }}
          animate={{ marginRight: 0, opacity: 1 }}
          exit={{ marginRight: "-3.5rem", opacity: 0 }}
          className="z-0 w-14 h-14 grid place-items-center bg-yellow-200 hover:bg-yellow-300 text-yellow-600 hover:text-yellow-800 transition-colors"
          onClick={() => {
            RemoveTodo([categoryName, item.id]);
            (document.querySelector("#category") as HTMLSelectElement).value = "0"
          }}
        >
          <Check />
        </motion.button>
      }
    </AnimatePresence>
    <button
      onClick={() => setDeletion(prev => !prev)}
      className={classNames({
        "z-10 w-14 h-14 grid place-items-center text-red-600 hover:text-red-800 transition-colors rounded-r-lg": true,
        "bg-red-100 hover:bg-red-200": !deletion,
        "bg-red-200 hover:bg-red-300": deletion,
      })}
    >
      <X />
    </button>

  </label>
}

export default TodoItem