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
      className="bg-red-500 border-2 border-red-800 my-4 p-4 pt-8 -mt-6 text-white rounded-3xl mx-auto max-w-2xl"
    >
      <CategoryCard />
    </div>
  </>
}

export default App