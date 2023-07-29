import { FC, useState } from "react"
import { IToDo } from "../types/states"
import { AddTodo } from "../utils/states"
import { ChevronDown, ChevronUp, Plus } from "lucide-react"
import { nanoid } from "nanoid"
import TodoItem from "./TodoItem"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { AddAlert } from "../utils/alert"
import { Alerts } from "../utils/enums"

interface TodoListProps {
  category: [string, IToDo[]]
}

const TodoList: FC<TodoListProps> = ({ category }) => {

  const [categoryName, todos] = category
  const [newSessionCount, setNewSessionCount] = useState<number>(1)
  const [animationParent] = useAutoAnimate<Element>()

  const handleNewTodo = (newToDo: HTMLInputElement): void => {
    if (newToDo.value === "") {
      AddAlert({
        type: Alerts.warning,
        message: "Cannot add empty tasks"
      })
      return
    }

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

  const handleNewToDoWithCheck = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    const newToDo: HTMLInputElement = (event.currentTarget.previousSibling as HTMLInputElement).previousSibling as HTMLInputElement
    handleNewTodo(newToDo)
  }

  const handleNewToDoWithEnter = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key !== "Enter") return
    const newToDo: HTMLInputElement = event.currentTarget
    handleNewTodo(newToDo)
  }

  return <div>
    <div className="text-xl">Add a new task</div>
    <label className="bg-stone-900 text-stone-100 flex items-center border border-stone-100 rounded-lg cursor-pointer my-1">

      <input
        placeholder="A new responsibility"
        className="flex-1 line-clamp-1 text-ellipsis bg-stone-900 text-stone-100 focus:brightness-95 h-14 outline-none rounded-l-lg px-4"
        onKeyDown={(event) => handleNewToDoWithEnter(event)}
      />
      {/* Session */}
      <div className="flex text-stone-100">
        <input
          value={newSessionCount}
          onChange={(event) => setNewSessionCount(+event.currentTarget.value)}
          type="number"
          title="Estimated required pomodoro sessions"
          name="sessions"
          min="1"
          className="w-10 h-14 text-center bg-cyan-700 rounded-none"
        />
        <div className="flex flex-col">
          <button
            className="h-7 bg-cyan-800"
            onClick={() => setNewSessionCount(prev => prev + 1)}
            title="Increase required sessions"
          >
            <ChevronUp />
          </button>
          <button
            className="h-7 bg-cyan-900 "
            onClick={() => setNewSessionCount(prev =>
              prev > 1
                ? prev - 1
                : 1
            )}
            title="Decrease required sessions"
          >
            <ChevronDown />
          </button>
        </div>
      </div>

      {/* Add button */}
      <button
        className="grid place-items-center w-14 h-14 bg-green-700 hover:bg-green-800 text-green-100 hover:text-green-200 transition-colors rounded-r-lg"
        onClick={(event) => handleNewToDoWithCheck(event)}
        title="Add task"
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

      {todos.length
        ? structuredClone(todos)
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
        : <div
          className="bg-yellow-800 text-stone-100 border border-yellow-700 rounded-lg cursor-pointer my-1 h-14 px-4 grid place-items-center text-center"
        >
          There is nothing to do!
        </div>
      }

    </div>
  </div >
}

export default TodoList
