import CategoryCard from "./components/CategoryCard"
import ClockSection from "./components/ClockSection"
import { FC } from "react"

const App: FC = () => {
  return <>
    <ClockSection />
    <div
      id="todo-container"
      className="p-4 text-white rounded-3xl mx-auto max-w-2xl flex flex-col"
    >
      <CategoryCard />
    </div>
  </>
}

export default App