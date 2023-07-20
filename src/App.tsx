import Clock from "./components/Clock"
import TodoList from "./components/TodoList"

function App() {

  return <>
    <Clock duration={25 * 60} isPlaying />
    <TodoList />
  </>
}

export default App