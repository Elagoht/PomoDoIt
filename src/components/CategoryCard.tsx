import { FC, useState } from "react"
import TodoList from "./TodoList"
import { RootState } from "../contexts"
import { useSelector } from "react-redux"
import { Check, PenLine, Plus, Trash2, X } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { RemoveCategory, RenameCategory } from "../utils/states"
import AddNewCategory from "./AddNewCategory"

const CategoryCard: FC = () => {

  const [currentCategory, setCurrentCategory] = useState<number>(0)
  const [rename, setRename] = useState<boolean>(false)
  const [addCategory, setAddCategory] = useState<boolean>(false)

  const todosState = useSelector((state: RootState) => state.Todos.todos)
  const todos = Object.entries(todosState)
  const categories = Object.keys(todosState)

  const handleRenameWithTick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const text = (((event.currentTarget.previousSibling as HTMLButtonElement).previousSibling as HTMLInputElement).previousSibling as HTMLInputElement).value.trim()
    if (text === "") {
      console.warn("Category name cannot be leave blank")
    } else if (categories.includes(text)) {
      console.warn("This category is already exists")
    } else {
      RenameCategory([todos[currentCategory][0], text])
      setRename(false)
    }
  }

  const handleRenameWithEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") setRename(false)
    if (event.key !== "Enter") return

    const text = event.currentTarget.value.trim()
    if (text === "") {
      console.warn("Category name cannot be leave blank")
    } else if (categories.includes(text)) {
      console.warn("This category is already exists")
    } else {
      RenameCategory([todos[currentCategory][0], text])
      setRename(false)
    }
  }

  return categories.length === 0
    ? <AddNewCategory setRename={setRename} setAddCategory={setAddCategory} setCurrentCategory={setCurrentCategory} />
    : <div className="flex flex-col">
      <div className="flex gap-2 justify-center items-center">
        <label htmlFor="category">Category</label>
        <select
          className="p-2 text-neutral-800 rounded-sm flex-1"
          value={currentCategory}
          onChange={(event) => {
            setCurrentCategory(parseInt(event.currentTarget.value))
            setRename(false)
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
            }}
            className="p-2 -m-1"
          >
            <PenLine />
          </button>
          <button
            onClick={() => {
              setAddCategory(prev => !prev)
              setRename(false)
            }}
            className="p-2 -m-1"
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
            animate={{ height: "unset", marginTop: "0.25rem", marginBottom: "0.25rem", opacity: 1 }}
            exit={{ height: 0, marginTop: 0, marginBottom: 0, opacity: 0 }}
          >
            <input
              className="flex-1 p-2 rounded-sm text-neutral-800"
              onKeyDown={(event) => handleRenameWithEnter(event)}
            >
            </input>
            <button
              className="p-2 bg-red-700 hover:bg-red-800 transition-colors rounded-sm"
              onClick={() => {
                RemoveCategory(categories[currentCategory])
                setCurrentCategory(prev => prev > 0 ? prev - 1 : 0)
              }}
            >
              <Trash2 />
            </button>
            <button
              className="p-2 bg-gray-500 hover:bg-gray-600 transition-colors rounded-sm"
              onClick={() => setRename(false)}
            >
              <X />
            </button>
            <button
              className="p-2 bg-green-500 hover:bg-green-600 transition-colors rounded-sm"
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
          <AddNewCategory setRename={setRename} setAddCategory={setAddCategory} setCurrentCategory={setCurrentCategory} />
        }
      </AnimatePresence>
      <TodoList category={todos[currentCategory]} />
    </div >
}

export default CategoryCard