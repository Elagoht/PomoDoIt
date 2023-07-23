import { FC, useState } from "react"
import { RemoveTodo, SetTodo, SetTodoActive, SetTodoChecked, SetTodoPinned, SetTodoSessions } from "../utils/states"
import classNames from "classnames"
import { IToDo } from "../types/states"
import { X, Pin, PinOff, Check, Locate, LocateFixed } from "lucide-react"
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
    {
      !item.checked && <>
        <label
          className="cursor-pointer bg-neutral-50 hover:bg-neutral-200 transition-colors h-14 w-10 -mr-2 flex justify-center items-center"
          title={item.pinned ? "Pin" : "Unpin"}
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
              : <PinOff className="text-neutral-400" />
          }
        </label>
        <label
          className="cursor-pointer -mr-2 bg-neutral-50 hover:bg-neutral-200 transition-colors h-14 w-10 flex justify-center items-center"
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
              : <Locate className="text-neutral-400" />
          }
        </label>
      </>
    }
    <input
      value={item.session}
      onChange={(event) =>
        SetTodoSessions([categoryName, item.id, parseInt(event.currentTarget.value)])
      }
      type="number"
      min="0"
      className="w-20 text-center bg-neutral-100 p-4"
    />
    <AnimatePresence mode="wait">
      {
        deletion &&
        <motion.button
          initial={{ marginRight: "-3.5rem", opacity: 0 }}
          animate={{ marginRight: 0, opacity: 1 }}
          exit={{ marginRight: "-3.5rem", opacity: 0 }}
          className="bg-yellow-200 hover:bg-yellow-300 -ml-2 p-4 text-yellow-600 hover:text-yellow-800 transition-colors rounded-sm"
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
        "-mx-2 -mr-4 p-4 text-red-600 hover:text-red-800 transition-colors rounded-sm": true,
        "bg-red-100 hover:bg-red-200": !deletion,
        "bg-red-200 hover:bg-red-300": deletion,
      })}
    >
      <X />
    </button>

  </label>
}

export default TodoItem