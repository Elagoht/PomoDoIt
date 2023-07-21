import CategoryCard from "./components/CategoryCard"
import Clock from "./components/Clock"
import { FC } from "react"
import StateSelector from "./components/StateSelector"

const App: FC = () => {
  return <>
    <Clock />
    <StateSelector />
    <div
      id="todo-container"
      className="bg-red-500 m-4 p-4 text-neutral-200 rounded-t-3xl"
    >
      <CategoryCard />
    </div>
  </>
}

export default App