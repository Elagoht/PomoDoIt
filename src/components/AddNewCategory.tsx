import { FC } from 'react'
import { AddCategory, SetCategory } from '../utils/states'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { RootState } from '../contexts'
import { Plus } from 'lucide-react'

interface AddNewCategoryProps {
  setRename: (value: React.SetStateAction<boolean>) => void
  setAddCategory: (value: React.SetStateAction<boolean>) => void
}

const AddNewCategory: FC<AddNewCategoryProps> = ({ setRename, setAddCategory }) => {

  const categoryCount = Object.keys(
    useSelector((state: RootState) => state.Todos.todos)
  ).length

  return <motion.div
    initial={{ height: 0, marginTop: 0, marginBottom: 0, opacity: 0 }}
    animate={{ height: "unset", marginTop: "0.5rem", marginBottom: "0.5rem", opacity: 1 }}
    exit={{ height: 0, marginTop: 0, marginBottom: 0, opacity: 0 }}
    className="flex gap-2">
    <input
      id="category-adder"
      placeholder="Add a category for your todos!"
      className="p-2 rounded-lg flex-1 text-neutral-800"
      onKeyDown={(event) => {
        if (event.key !== "Enter") return
        if (event.currentTarget.value !== "") {
          AddCategory(event.currentTarget.value)
          setRename(false)
          setAddCategory(false)
          SetCategory(categoryCount)
        }
      }}
    />
    <button
      type="submit"
      className="bg-blue-500 px-8 rounded-lg"
      onClick={() => {
        const text = (document.querySelector("#category-adder") as HTMLInputElement).value
        if (text !== "") {
          AddCategory(text)
          setRename(false)
          setAddCategory(false)
          SetCategory(categoryCount)
        }
      }}
    >
      <Plus />
    </button>
  </motion.div >
}

export default AddNewCategory