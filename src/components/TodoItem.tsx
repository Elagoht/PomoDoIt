import { FC, useState } from "react"
import { RemoveTodo, SetTodo, SetTodoActive, SetTodoChecked, SetTodoPinned, SetTodoSessions } from "../utils/states"
import classNames from "classnames"
import { IToDo } from "../types/states"
import { X, Pin, PinOff, Check, LocateFixed, Locate, ChevronDown, ChevronUp } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { AddAlert } from "../utils/alert"
import { Alerts } from "../utils/enums"

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
      "transition-colors bg-stone-900 text-stone-100 flex items-center border border-stone-100 rounded-lg cursor-pointer my-1": true,
      "!border-blue-500": item.todo !== "" && item.session === 0 && !item.checked,
      "!border-red-500": item.todo === "",
      "!bg-green-700 ": item.active,
      "!bg-stone-700": item.checked
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
      placeholder="Don't leave tasks empty"
      title={item.todo}
      onBlur={(event) => {
        if (event.currentTarget.value === "") AddAlert({
          type: Alerts.warning,
          message: "Don't leave tasks empty."
        })
        SetTodo([categoryName, item.id, event.currentTarget.value])
      }}
    />

    {/* Pin and Active */}
    {
      !item.checked &&
      <>
        <label
          className="h-14 w-10 flex justify-center items-center hover:bg-stone-900 hover:bg-opacity-5 transition-colors"
          title={item.pinned ? "Unpin" : "Pin"}
        >
          <input
            type="checkbox"
            checked={item.checked ? false : item.pinned}
            disabled={item.checked}
            onChange={(event) => SetTodoPinned([categoryName, item.id, event.currentTarget.checked])}
            className="hidden"
          />
          {
            item.pinned
              ? <Pin />
              : <PinOff className="text-stone-400" />
          }
        </label>
        <label
          className="h-14 w-10 flex justify-center items-center hover:bg-stone-900 hover:bg-opacity-5 transition-colors"
          title={item.active ? "Set as inactive" : "Set as active"}
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
              : <Locate className="text-stone-400" />
          }
        </label>
      </>
    }
    {/* Sessions */}
    <div className="flex text-stone-100">
      <input
        value={item.session}
        onChange={(event) =>
          SetTodoSessions([categoryName, item.id, parseInt(event.currentTarget.value)])
        }
        type="number"
        min="0"
        title="Estimated required pomodoro sessions"
        className="h-14 w-10 text-center bg-cyan-700"
      />
      <div className="flex flex-col">
        <button
          className="h-7 bg-cyan-800"
          onClick={() => SetTodoSessions([
            categoryName,
            item.id,
            item.session + 1
          ])}
          title="Increase required sessions"
        >
          <ChevronUp />
        </button>
        <button
          className="h-7 bg-cyan-900"
          onClick={() => SetTodoSessions([
            categoryName,
            item.id,
            item.session > 0
              ? item.session - 1
              : 0
          ])}
          title="Decrease required sessions"
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
          className="z-0 w-14 h-14 grid place-items-center bg-orange-500 hover:bg-orange-600 text-orange-100 hover:text-orange-200 transition-colors"
          onClick={() => {
            RemoveTodo([categoryName, item.id]);
            (document.querySelector("#category") as HTMLSelectElement).value = "0"
          }}
          title="Confirm"
        >
          <Check />
        </motion.button>
      }
    </AnimatePresence>
    <button
      onClick={() => setDeletion(prev => !prev)}
      className={classNames({
        "z-10 w-14 h-14 grid place-items-center text-red-100 hover:text-red-200 transition-colors rounded-r-lg": true,
        "bg-red-700 hover:bg-red-800": !deletion,
        "bg-red-800 hover:bg-red-900": deletion,
      })}
      title={
        deletion
          ? "Cancel"
          : "Delete task"
      }
    >
      <X />
    </button>

  </label>
}

export default TodoItem