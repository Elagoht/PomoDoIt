import { FC, useState } from "react"
import TodoList from "./TodoList"
import { RootState } from "../contexts"
import { useSelector } from "react-redux"
import { Check, MoreVertical, PenLine, Plus, Trash2, X } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { ClearCheckedTodos, RemoveCategory, RenameCategory, SetCategory } from "../utils/states"
import AddNewCategory from "./AddNewCategory"
import classNames from "classnames"

const CategoryCard: FC = () => {

  const category = useSelector((state: RootState) => state.Category.name)
  const [renaming, setRenaming] = useState<boolean>(false)
  const [deleting, setDeleting] = useState<boolean>(false)
  const [addCategory, setAddCategory] = useState<boolean>(false)
  const [optionsMenu, setOptionsMenu] = useState<boolean>(false)

  const todosState = useSelector((state: RootState) => state.Todos.todos)
  const todos = Object.entries(todosState)
  const categories = Object.keys(todosState)

  const handleRenameWithTick = (): void => {
    const text = (document.querySelector("#rename-input") as HTMLInputElement).value.trim()
    if (text === "") {
      console.warn("Category name cannot be leave blank")
    } else if (categories.includes(text)) {
      console.warn("This category is already exists")
    } else {
      RenameCategory([todos[category][0], text])
      setRenaming(false)
    }
  }

  const handleRenameWithEnter = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Escape") setRenaming(false)
    if (event.key !== "Enter") return

    const text = event.currentTarget.value.trim()
    if (text === "") {
      console.warn("Category name cannot be leave blank")
    } else if (categories.includes(text)) {
      console.warn("This category is already exists")
    } else {
      RenameCategory([todos[category][0], text])
      setRenaming(false)
    }
  }

  return categories.length === 0
    ? <AddNewCategory setRename={setRenaming} setAddCategory={setAddCategory} />
    : <div className="flex flex-col">
      <div className="flex gap-2 justify-center items-center">
        <select
          className="h-10 px-2 bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 border-2 border-neutral-900 dark:border-neutral-100 rounded-lg flex-1"
          value={category}
          onChange={(event) => {
            SetCategory(parseInt(event.currentTarget.value))
            setRenaming(false)
            setDeleting(false)
            setAddCategory(false)
            setOptionsMenu(false)
          }}
          name="category" id="category"
        >
          {categories.map((category, index) => (
            <option value={index} key={index}>{category}</option>
          ))}
        </select>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setRenaming(prev => !prev)
              setAddCategory(false)
              setDeleting(false)
              setOptionsMenu(false)
            }}
            className={classNames({
              "flex w-10 h-10 border-2 items-center justify-center rounded-lg transition-colors": true,
              "bg-blue-400 border-blue-500": renaming,
              "border-neutral-50": !renaming
            })}
          >
            <PenLine />
          </button>
          <button
            onClick={() => {
              setAddCategory(prev => !prev)
              setRenaming(false)
              setDeleting(false)
              setOptionsMenu(false)
            }}
            className={classNames({
              "flex w-10 h-10 border-2 items-center justify-center rounded-lg transition-colors": true,
              "bg-emerald-400 border-emerald-500": addCategory,
              "border-neutral-50": !addCategory
            })}
          >
            <Plus />
          </button>
          <button
            className={classNames({
              "flex w-10 h-10 border-2 items-center justify-center rounded-lg transition-colors": true,
              "bg-neutral-400 border-neutral-500": optionsMenu,
              "border-neutral-100": !optionsMenu
            })}
            onClick={() => {
              setOptionsMenu(prev => !prev)
              setAddCategory(false)
              setRenaming(false)
              setDeleting(false)
            }}
          >
            <MoreVertical />
          </button>
        </div>
      </div>
      <AnimatePresence mode="sync">
        {renaming &&
          <motion.div
            className="flex gap-2"
            initial={{ height: 0, marginTop: 0, marginBottom: 0, opacity: 0 }}
            animate={{ height: "2.5rem", marginTop: "0.5rem", marginBottom: "0.5rem", opacity: 1 }}
            exit={{ height: 0, marginTop: 0, marginBottom: 0, opacity: 0 }}
          >
            <AnimatePresence mode="wait">
              {!deleting
                ? <motion.button
                  initial={{ width: "5.5rem" }}
                  animate={{ width: "2.5rem" }}
                  exit={{ width: "5.5rem" }}
                  className="w-10 shrink-0 grid place-items-center overflow-hidden bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 transition-colors rounded-lg"
                  onClick={() => setDeleting(true)}
                >
                  <Trash2 />
                </motion.button>
                : <motion.div
                  className="flex gap-2"
                  initial={{ width: "2.5rem" }}
                  animate={{ width: "5.5rem" }}
                  exit={{ width: "2.5rem" }}
                >
                  <button
                    className="w-10 shrink-0 grid place-items-center overflow-hidden bg-gray-500 hover:bg-gray-600 transition-colors rounded-lg"
                    onClick={() => setDeleting(false)}
                  >
                    <X />
                  </button>
                  <button
                    className="w-10 shrink-0 grid place-items-center overflow-hidden bg-green-500 hover:bg-green-600 transition-colors rounded-lg"
                    onClick={() => {
                      RemoveCategory(categories[category])
                      SetCategory(category > 0 ? category - 1 : 0)
                      setDeleting(false)
                    }}
                  >
                    <Check />
                  </button>
                </motion.div>
              }
            </AnimatePresence>
            <input
              id="rename-input"
              placeholder="Rename your category"
              defaultValue={categories[category]}
              className="flex-1 px-2 rounded-lg bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 min-w-0"
              onFocus={() => setDeleting(false)}
              onKeyDown={(event) => handleRenameWithEnter(event)}
            >
            </input>
            <button
              className="w-10 shrink-0 grid place-items-center overflow-hidden bg-gray-500 hover:bg-gray-600 transition-colors rounded-lg"
              onClick={() => setRenaming(false)}
            >
              <X />
            </button>
            <button
              className="w-10 shrink-0 grid place-items-center overflow-hidden bg-green-500 hover:bg-green-600 transition-colors rounded-lg"
              onClick={handleRenameWithTick}
            >
              <Check />
            </button>
          </motion.div>
        }
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {
          addCategory &&
          <AddNewCategory setRename={setRenaming} setAddCategory={setAddCategory} />
        }
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {optionsMenu &&
          <motion.div
            className="flex gap-2 rounded-lg justify-end"
            initial={{ height: 0, marginTop: 0, marginBottom: 0, opacity: 0 }}
            animate={{ height: "2.5rem", marginTop: "0.5rem", marginBottom: "0.5rem", opacity: 1 }}
            exit={{ height: 0, marginTop: 0, marginBottom: 0, opacity: 0 }}
          >
            <div className="text-neutral-100 h-full p-2 ">Clear Checked Todos</div>
            <button
              className="w-10 shrink-0 grid place-items-center bg-neutral-500 hover:bg-neutral-600 transition-colors rounded-lg overflow-hidden"
              onClick={() => {
                setOptionsMenu(false)
              }}
            >
              <X />
            </button>
            <button
              className="w-10 shrink-0 grid place-items-center bg-green-500 hover:bg-green-600 transition-colors rounded-lg overflow-hidden"
              onClick={() => {
                ClearCheckedTodos(categories[category])
                setOptionsMenu(false)
              }}
            >
              <Check />
            </button>
          </motion.div>
        }
      </AnimatePresence>

      <hr className="border-red-400 dark:border-red-700 border m-4" />

      <TodoList category={todos[category]} />

    </div >
}

export default CategoryCard