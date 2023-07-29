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
      "transition-colors bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 flex items-center border-2 border-neutral-900 dark:border-neutral-100 rounded-lg cursor-pointer my-1": true,
      "!border-blue-500": item.todo !== "" && item.session === 0 && !item.checked,
      "!border-red-500": item.todo === "",
      "!bg-lime-200 dark:!bg-lime-700 dark:text-neutral-100": item.active,
      "!bg-neutral-400 dark:!bg-neutral-700 !bg-opacity-80 dark:text-neutral-100": item.checked
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
    <div className="flex text-neutral-900 dark:text-neutral-100">
      <input
        value={item.session}
        onChange={(event) =>
          SetTodoSessions([categoryName, item.id, parseInt(event.currentTarget.value)])
        }
        type="number"
        min="0"
        className="h-14 w-10 text-center bg-sky-100 dark:bg-sky-700"
      />
      <div className="flex flex-col">
        <button
          className="h-7 bg-sky-200 dark:bg-sky-800"
          onClick={() => SetTodoSessions([
            categoryName,
            item.id,
            item.session + 1
          ])}
        >
          <ChevronUp />
        </button>
        <button
          className="h-7 bg-sky-300 dark:bg-sky-900"
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
          className="z-0 w-14 h-14 grid place-items-center bg-yellow-200 hover:bg-yellow-300 dark:bg-orange-500 dark:hover:bg-orange-600 text-yellow-600 hover:text-yellow-800 dark:text-orange-100 dark:hover:text-orange-200 transition-colors"
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
        "z-10 w-14 h-14 grid place-items-center text-red-600 hover:text-red-800 dark:text-red-100 dark:hover:text-red-200 transition-colors rounded-r": true,
        "bg-red-100 hover:bg-red-200 dark:bg-red-700 dark:hover:bg-red-800": !deletion,
        "bg-red-200 hover:bg-red-300 dark:bg-red-800 dark:hover:bg-red-900": deletion,
      })}
    >
      <X />
    </button>

  </label>
}

export default TodoItem