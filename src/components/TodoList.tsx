import { FC } from "react"
import { IToDo } from "../types/states"
import { AddTodo } from "../utils/states"
import { Plus } from "lucide-react"
import { nanoid } from "nanoid"
import TodoItem from "./TodoItem"
import { useAutoAnimate } from "@formkit/auto-animate/react"

interface TodoListProps {
  category: [string, IToDo[]]
}

const TodoList: FC<TodoListProps> = ({ category }) => {

  const [categoryName, todos] = category
  const [animationParent] = useAutoAnimate()

  const handleNewToDo = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    const newToDoSessions: HTMLInputElement = event.currentTarget.previousSibling as HTMLInputElement
    const newToDo: HTMLInputElement = newToDoSessions.previousSibling as HTMLInputElement

    if (newToDo.value === "") return

    AddTodo([category[0], {
      id: nanoid(),
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

    const newToDoSessions: HTMLInputElement = event.currentTarget.nextSibling as HTMLInputElement
    const newToDo: HTMLInputElement = event.currentTarget

    if (newToDo.value === "") return

    AddTodo([category[0], {
      id: nanoid(),
      checked: false,
      pinned: false,
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
          onKeyDown={(event) => handleNewToDoWithEnter(event)}
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
          <Plus />
        </button>

      </label>

      <div ref={animationParent}>

        {structuredClone(todos)
          .sort((a, b) =>
            a.pinned !== b.pinned
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
    </div>
  </div >
}

export default TodoList
