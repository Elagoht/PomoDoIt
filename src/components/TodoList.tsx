import { FC, useState } from "react"
import { IToDo } from "../types/states"
import { AddTodo } from "../utils/states"
import { ChevronDown, ChevronUp, Plus } from "lucide-react"
import { nanoid } from "nanoid"
import TodoItem from "./TodoItem"
import { useAutoAnimate } from "@formkit/auto-animate/react"

interface TodoListProps {
  category: [string, IToDo[]]
}

const TodoList: FC<TodoListProps> = ({ category }) => {

  const [categoryName, todos] = category
  const [newSessionCount, setNewSessionCount] = useState<number>(1)
  const [animationParent] = useAutoAnimate<Element>()

  const handleNewToDo = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    const newToDoSessions: HTMLInputElement = event.currentTarget.previousSibling as HTMLInputElement
    const newToDo: HTMLInputElement = newToDoSessions.previousSibling as HTMLInputElement

    if (newToDo.value === "") return

    AddTodo([category[0], {
      id: nanoid(),
      active: false,
      checked: false,
      pinned: false,
      session: parseInt(newToDoSessions.value),
      remaining: parseInt(newToDoSessions.value),
      todo: newToDo.value
    }])

    newToDo.value = ""
    newToDoSessions.value = "1"
  }

  const handleNewToDoWithEnter = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    console.log(event.key)
    if (event.key !== "Enter") return

    const newToDo: HTMLInputElement = event.currentTarget

    if (newToDo.value === "") return

    AddTodo([category[0], {
      id: nanoid(),
      active: false,
      checked: false,
      pinned: false,
      session: newSessionCount,
      remaining: newSessionCount,
      todo: newToDo.value
    }])

    newToDo.value = ""
    setNewSessionCount(1)
  }

  return <div>
    <div className="text-xl">Add a new task</div>
    <label className="bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 flex items-center border border-neutral-900 dark:border-neutral-100 rounded-lg cursor-pointer my-1">

      <input
        placeholder="A new responsibility"
        className="flex-1 line-clamp-1 text-ellipsis bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 h-14 outline-none rounded-l-lg px-4"
        onKeyDown={(event) => handleNewToDoWithEnter(event)}
      />
      {/* Session */}
      <div className="flex text-neutral-900 dark:text-neutral-100">
        <input
          value={newSessionCount}
          onChange={(event) => setNewSessionCount(parseInt(event.currentTarget.value))}
          type="number"
          min="1"
          className="w-10 h-14 text-center bg-sky-100 dark:bg-sky-700"
        />
        <div className="flex flex-col">
          <button
            className="h-7 bg-sky-200 dark:bg-sky-800"
            onClick={() => setNewSessionCount(prev => prev + 1)}
          >
            <ChevronUp />
          </button>
          <button
            className="h-7 bg-sky-300 dark:bg-sky-900 "
            onClick={() => setNewSessionCount(prev =>
              prev > 1
                ? prev - 1
                : 1
            )}
          >
            <ChevronDown />
          </button>
        </div>
      </div>

      {/* Add button */}
      <button
        className="grid place-items-center w-14 h-14 bg-green-100 hover:bg-green-200 text-green-600 hover:text-green-800 dark:bg-green-700 dark:hover:bg-green-800 dark:text-green-100 dark:hover:text-green-200 transition-colors rounded-r-md"
        onClick={(event) => handleNewToDo(event)}
      >
        <Plus />
      </button>
    </label>

    {/* Todos */}
    <div
      ref={animationParent}
      className="mt-4"
    >
      <div className="text-xl">Tasks</div>

      {structuredClone(todos)
        .sort((a, b) =>
          a.active !== b.active
            ? a.active
              ? -1
              : 1
            : a.pinned !== b.pinned
              ? (a.pinned ? -1 : 1)
              : a.checked !== b.checked
                ? a.checked
                  ? 1
                  : -1
                : a.session - b.session)
        .map((item, index) => (
          <TodoItem
            categoryName={categoryName}
            index={index} key={item.id}
            item={item}
          />
        ))
      }

    </div>
  </div >
}

export default TodoList
