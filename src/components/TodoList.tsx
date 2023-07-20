import { useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../contexts"
import { AddCategory, AddTodo } from "../utils/states"

const TodoList = () => {
  const [newCategory, setNewCategory] = useState<string>("")
  const [newTodo, setNewTodo] = useState<string>("")
  const todos = Object.entries(
    useSelector((store: RootState) => store.Todos).todos
  )

  const handleAddCategory = () => {
    if (newCategory.trim() !== "") {
      AddCategory(newCategory)
      setNewCategory("")
    }
  }

  const handleAddTodo = () => {
    if (newCategory.trim() !== "") {
      AddTodo([newCategory, {
        checked: false,
        todo: newTodo,
        session: 1
      }])
      setNewTodo("")
    }
  }

  return <div>
    <div className="grid grid-cols-2 gap-2 w-96">
      <input
        type="text"
        value={newCategory}
        onChange={(event) => setNewCategory(event.currentTarget.value)}
        placeholder="Enter category name"
        className="border rounded p-2"
      />
      <button
        onClick={handleAddCategory}
        className="border rounded py-2 px-4 border-blue-500 hover:bg-blue-600 transition-colors"
      >
        Add Category
      </button>
      <input
        type="text"
        value={newTodo}
        onChange={(event) => setNewTodo(event.currentTarget.value)}
        placeholder="Enter category name"
        className="border rounded p-2"
      />
      <button
        onClick={handleAddTodo}
        className="border rounded py-2 px-4 border-blue-500 hover:bg-blue-600 transition-colors"
      >
        Add Todo
      </button>
    </div>
    {todos.map((category) => (
      <div key={category[0]}>
        <h1 className="text-2xl">{category[0]}</h1>
        <ol>
          {category[1].map((item) => (
            <li key={item.todo}>{item.todo}</li>
          ))}
        </ol>
      </div>
    ))}
  </div>
}

export default TodoList
