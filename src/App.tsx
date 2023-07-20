import CategoryCard from "./components/CategoryCard"
import Clock from "./components/Clock"
function App() {

  return <>
    <Clock duration={25 * 60} isPlaying />
    <CategoryCard />
  </>
}

export default App