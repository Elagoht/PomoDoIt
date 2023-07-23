import { FC } from 'react'
import { AddCategory } from '../utils/states'
import { motion } from 'framer-motion'

interface AddNewCategoryProps {
  setRename: (value: React.SetStateAction<boolean>) => void
  setAddCategory: (value: React.SetStateAction<boolean>) => void
}

const AddNewCategory: FC<AddNewCategoryProps> = ({ setRename, setAddCategory }) => {

  return <motion.div
    initial={{ height: 0, marginTop: 0, marginBottom: 0, opacity: 0 }}
    animate={{ height: "unset", marginTop: "0.25rem", marginBottom: "0.25rem", opacity: 1 }}
    exit={{ height: 0, marginTop: 0, marginBottom: 0, opacity: 0 }}
    className="flex gap-2">
    <input
      id="category-adder"
      placeholder="Add a category for your todos!"
      className="p-2 rounded-sm flex-1 text-neutral-800"
      onKeyDown={(event) => {
        if (event.key !== "Enter") return
        AddCategory(event.currentTarget.value)
        setRename(false)
        setAddCategory(false)
      }}
    />
    <button
      type="submit"
      className="bg-blue-500 py-2 px-4 rounded-sm"
      onClick={() => {
        AddCategory((document.querySelector("#category-adder") as HTMLInputElement).value)
        setRename(false)
        setAddCategory(false)
      }}
    >
      Add
    </button>
  </motion.div>
}

export default AddNewCategory