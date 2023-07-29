import { FC } from 'react'
import { AddCategory, SetCategory } from '../utils/states'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { RootState } from '../contexts'
import { Check, X } from 'lucide-react'

interface AddNewCategoryProps {
  setRename: (value: React.SetStateAction<boolean>) => void
  setAddCategory: (value: React.SetStateAction<boolean>) => void
}

const AddNewCategory: FC<AddNewCategoryProps> = ({ setRename, setAddCategory }) => {

  const categoryCount = Object.keys(
    useSelector((state: RootState) => state.Todos.todos)
  ).length

  return <motion.div
    className="flex gap-2 rounded-lg"
    initial={{ height: 0, marginTop: 0, marginBottom: 0, opacity: 0 }}
    animate={{ height: "2.5rem", marginTop: "0.5rem", marginBottom: "0.5rem", opacity: 1 }}
    exit={{ height: 0, marginTop: 0, marginBottom: 0, opacity: 0 }}
  >
    <input
      id="category-adder"
      placeholder="Add a category for your todos!"
      className="flex-1 px-2 rounded-lg bg-stone-900 text-stone-100 min-w-0"
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
      className="w-10 grid place-items-center overflow-hidden bg-stone-600 hover:bg-stone-700 transition-colors rounded-lg"
      onClick={() => {
        setRename(false)
        setAddCategory(false)
      }}
    >
      <X />
    </button>
    <button
      type="submit"
      className="w-10 grid place-items-center overflow-hidden bg-green-600 hover:bg-green-700 rounded-lg"
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
      <Check />
    </button>
  </motion.div >
}

export default AddNewCategory