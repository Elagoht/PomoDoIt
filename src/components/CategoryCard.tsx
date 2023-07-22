import { FC, useRef, useState } from "react"
import TodoList from "./TodoList"
import { RootState } from "../contexts"
import { useSelector } from "react-redux"
import { Check, PenLine, X } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { RenameCategory } from "../utils/states"

const CategoryCard: FC = () => {

  const [currentCategory, setCurrentCategory] = useState<number>(0)
  const [rename, setRename] = useState<boolean>(false)

  const todosState = useSelector((state: RootState) => state.Todos.todos)
  const todos = Object.entries(todosState)
  const categories = Object.keys(todosState)
  const refSelect = useRef<HTMLSelectElement>(null)

  return <div className="flex flex-col">
    <div className="flex gap-2 justify-center items-center">
      <label htmlFor="category">Category</label>
      <select
        ref={refSelect}
        className="p-2 text-neutral-800 rounded-sm"
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
      <div className="flex items-center gap-2 flex-1">
        <AnimatePresence mode="sync">
          {!rename &&
            <motion.button
              initial={{ paddingLeft: 0, paddingRight: 0 }}
              animate={{ paddingLeft: "0.5rem", paddingRight: "0.5rem" }}
              exit={{ width: 0, paddingLeft: 0, paddingRight: 0 }}
              onClick={() => setRename(prev => !prev)}
              className="p-2 -m-1"
            >
              <PenLine />
            </motion.button>
          }
        </AnimatePresence>
        <AnimatePresence mode="sync">
          {rename && <>
            <motion.input
              defaultValue={(refSelect.current as HTMLSelectElement)
                .childNodes[(refSelect.current as HTMLSelectElement)
                  .selectedIndex].textContent as string}
              initial={{ width: 0, paddingLeft: 0, paddingRight: 0 }}
              animate={{ width: "100%", paddingLeft: "0.5rem", paddingRight: "0.5rem" }}
              exit={{ width: 0, paddingLeft: 0, paddingRight: 0 }}
              className="py-2 rounded-sm text-neutral-800"
            >
            </motion.input>
            <button
              onClick={() => setRename(false)}
            >
              <X />
            </button>
            <button
              onClick={(event) => {
                const text = ((event.currentTarget.previousSibling as HTMLButtonElement).previousSibling as HTMLInputElement).value.trim()
                if (text === "") {
                  console.warn("Category name cannot be leave blank")
                } else if (categories.includes(text)) {
                  console.warn("This category is already exists")
                } else {
                  RenameCategory([todos[currentCategory][0], text])
                  setRename(false)
                  console.log(refSelect.current)
                  if (refSelect.current) {
                    console.log(`${categories.length - 1}`)
                    refSelect.current.value = `${categories.length - 1}`
                  }
                }
              }}
            >
              <Check />
            </button>
          </>}
        </AnimatePresence>
      </div>
    </div>

    <TodoList category={todos[currentCategory]} />
  </div >
}

export default CategoryCard