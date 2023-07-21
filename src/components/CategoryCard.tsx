import { FC, useState } from "react"
import TodoList from "./TodoList"
import { RootState } from "../contexts"
import { useSelector } from "react-redux"

const CategoryCard: FC = () => {

  const [currentCategory, setCurrentCategory] = useState<number>(0)

  const todosState = useSelector((state: RootState) => state.Todos.todos)
  const todos = Object.entries(todosState)
  const categories = Object.keys(todosState)

  return <div className="flex flex-col">
    <div className="flex gap-2 justify-center items-center">
      <label htmlFor="category">Current Category</label>
      <select
        className="p-2 text-neutral-800"
        onChange={(event) => setCurrentCategory(parseInt(event.currentTarget.value))}
        name="category" id="category"
      >
        {categories.map((category, index) => (
          <option value={index} key={index}>{category}</option>
        ))}
      </select>
    </div>

    <TodoList category={todos[currentCategory]} />
  </div >
}

export default CategoryCard