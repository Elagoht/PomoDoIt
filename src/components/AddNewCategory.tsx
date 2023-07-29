import { FC } from 'react'
import { AddCategory, SetCategory } from '../utils/states'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { RootState } from '../contexts'
import { Check, X } from 'lucide-react'
import { AddAlert } from '../utils/alert'
import { Alerts } from '../utils/enums'

interface AddNewCategoryProps {
  setRename: (value: React.SetStateAction<boolean>) => void
  setDeleting: (value: React.SetStateAction<boolean>) => void
  setAddCategory: (value: React.SetStateAction<boolean>) => void
}

const AddNewCategory: FC<AddNewCategoryProps> = ({ setRename, setDeleting, setAddCategory }) => {

  const categories = Object.keys(
    useSelector((state: RootState) => state.Todos.todos)
  )

  const handleAddCategory = (text: string): void => {
    if (categories.includes(text)) AddAlert({
      type: Alerts.warning,
      message: "This category is already exists."
    })
    else if (text === "") AddAlert({
      type: Alerts.warning,
      message: "Category name cannot be empty."
    })
    else {
      AddCategory(text)
      setRename(false)
      setDeleting(false)
      setAddCategory(false)
      SetCategory(categories.length)
      AddAlert({
        type: Alerts.inform,
        message: `The category "${text}" is created successfully.`
      })
    }
  }

  return <motion.div
    className="flex gap-2 rounded-lg"
    initial={{ height: 0, marginTop: 0, marginBottom: 0, opacity: 0 }}
    animate={{ height: "2.5rem", marginTop: "0.5rem", marginBottom: "0.5rem", opacity: 1 }}
    exit={{ height: 0, marginTop: 0, marginBottom: 0, opacity: 0 }}
  >
    <input
      id="category-adder"
      placeholder="Add a category for your tasks!"
      className="flex-1 px-2 rounded-lg bg-stone-900 text-stone-100 min-w-0"
      onKeyDown={(event) => {
        if (event.key !== "Enter") return
        const text = event.currentTarget.value
        handleAddCategory(text)
      }}
    />
    {
      categories.length !== 0 &&
      <button
        className="w-10 grid place-items-center overflow-hidden bg-stone-600 hover:bg-stone-700 transition-colors rounded-lg"
        onClick={() => {
          setRename(false)
          setDeleting(false)
          setAddCategory(false)
        }}
      >
        <X />
      </button>
    }
    <button
      type="submit"
      className="w-10 grid place-items-center overflow-hidden bg-green-600 hover:bg-green-700 rounded-lg"
      onClick={() => {
        const text = (document.querySelector("#category-adder") as HTMLInputElement).value
        handleAddCategory(text)
      }}
    >
      <Check />
    </button>
  </motion.div >
}

export default AddNewCategory