import { FC, useState } from "react"
import TodoList from "./TodoList"
import { RootState } from "../contexts"
import { useSelector } from "react-redux"
import { Check, PenLine, Plus, Trash2, X } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { RemoveCategory, RenameCategory, SetCategory } from "../utils/states"
import AddNewCategory from "./AddNewCategory"
import classNames from "classnames"

const CategoryCard: FC = () => {

  const category = useSelector((state: RootState) => state.Category.name)
  const [rename, setRename] = useState<boolean>(false)
  const [deleting, setDeleting] = useState<boolean>(false)
  const [addCategory, setAddCategory] = useState<boolean>(false)

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
      setRename(false)
    }
  }

  const handleRenameWithEnter = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Escape") setRename(false)
    if (event.key !== "Enter") return

    const text = event.currentTarget.value.trim()
    if (text === "") {
      console.warn("Category name cannot be leave blank")
    } else if (categories.includes(text)) {
      console.warn("This category is already exists")
    } else {
      RenameCategory([todos[category][0], text])
      setRename(false)
    }
  }

  return categories.length === 0
    ? <AddNewCategory setRename={setRename} setAddCategory={setAddCategory} />
    : <div className="flex flex-col">
      <div className="flex gap-2 justify-center items-center">
        <label htmlFor="category">Category</label>
        <select
          className="p-2 text-neutral-800 rounded-lg flex-1"
          value={category}
          onChange={(event) => {
            SetCategory(parseInt(event.currentTarget.value))
            setRename(false)
            setDeleting(false)
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
              setRename(prev => !prev)
              setAddCategory(false)
              setDeleting(false)
            }}
            className={classNames({
              "p-[calc(0.5rem_-_2px)] border-2 rounded-lg": true,
              "border-neutral-50 hover:border-neutral-200 ": !rename,
              "bg-blue-500 hover:bg-blue-600 border-blue-500 hover:border-blue-600": rename
            })}
          >
            <PenLine />
          </button>
          <button
            onClick={() => {
              setAddCategory(prev => !prev)
              setRename(false)
            }}
            className={classNames({
              "p-[calc(0.5rem_-_2px)] border-2 rounded-lg": true,
              "border-neutral-50 hover:border-neutral-200 ": !addCategory,
              "bg-green-500 hover:bg-green-600 border-green-500 hover:border-green-600": addCategory
            })}
          >
            <Plus />
          </button>
        </div>
      </div>
      <AnimatePresence mode="sync">
        {rename &&
          <motion.div
            className="flex gap-2 overflow-y-hidden"
            initial={{ height: 0, marginTop: 0, marginBottom: 0, opacity: 0 }}
            animate={{ height: "unset", marginTop: "0.5rem", marginBottom: "0.5rem", opacity: 1 }}
            exit={{ height: 0, marginTop: 0, marginBottom: 0, opacity: 0 }}
          >
            <AnimatePresence mode="wait">
              {!deleting
                ? <motion.button
                  initial={{ width: "5.5rem" }}
                  animate={{ width: "2.5rem" }}
                  exit={{ width: "5.5rem" }}
                  className="p-2 bg-red-700 hover:bg-red-800 transition-colors rounded-lg"
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
                    className="p-2 bg-gray-500 hover:bg-gray-600 transition-colors rounded-lg"
                    onClick={() => setDeleting(false)}
                  >
                    <X />
                  </button>
                  <button
                    className="p-2 bg-green-500 hover:bg-green-600 transition-colors rounded-lg"
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
              className="flex-1 p-2 rounded-lg text-neutral-800"
              onFocus={() => setDeleting(false)}
              onKeyDown={(event) => handleRenameWithEnter(event)}
            >
            </input>
            <button
              className="p-2 bg-gray-500 hover:bg-gray-600 transition-colors rounded-lg"
              onClick={() => setRename(false)}
            >
              <X />
            </button>
            <button
              className="p-2 bg-green-500 hover:bg-green-600 transition-colors rounded-lg"
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
          <AddNewCategory setRename={setRename} setAddCategory={setAddCategory} />
        }
      </AnimatePresence>
      <TodoList category={todos[category]} />
    </div >
}

export default CategoryCard