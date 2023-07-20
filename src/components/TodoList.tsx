import { FC } from "react"
import { IToDo } from "../types/states"

interface TodoListProps {
  category: [string, IToDo[]]
}

const TodoList: FC<TodoListProps> = ({ category }) => {

  console.log(category)
  return <div>
    <div key={category[0]}>
      <h1 className="text-2xl">{category[0]}</h1>
      <ol>
        {category[1].map((item) => (
          <li key={item.todo}>{item.todo}</li>
        ))}
      </ol>
    </div>
  </div>
}

export default TodoList
