import CategoryCard from "./components/CategoryCard"
import ClockSection from "./components/ClockSection"
import { FC } from "react"
import StateSelector from "./components/StateSelector"

const App: FC = () => {
  return <>
    <ClockSection />
    <StateSelector />
    <div
      id="todo-container"
      className="bg-orange-500 border-2 border-orange-800 my-4 p-4 pt-8 -mt-6 text-white rounded-3xl mx-auto max-w-2xl"
    >
      <CategoryCard />
    </div>
  </>
}

export default App