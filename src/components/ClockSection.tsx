import { FC } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../contexts"
import { ArrowRightCircle, PauseCircle, PlayCircle } from "lucide-react"
import { DecreaseSessions, SetPlaying, SetToLong } from "../utils/states"
import Clock from "./Clock"
import { PomodoroState } from "../utils/enums"

const ClockSection: FC = () => {

  const pomodoro = useSelector((state: RootState) => state.Pomodoro)
  const categories = Object.keys(useSelector((state: RootState) => state.Todos.todos))
  const category = useSelector((state: RootState) => state.Category.name)
  const currentCategoryName = categories[category]

  return <div
    className="flex items-center justify-center h-96 flex-col gap-8"
  >
    {
      pomodoro.state === PomodoroState["work"] &&
      <Clock currentState={PomodoroState["work"]}
        callback={() => {
          DecreaseSessions(currentCategoryName)
          SetToLong(pomodoro.toLong === 0
            ? 3
            : pomodoro.toLong - 1
          )
        }}
        nextState={
          pomodoro.toLong > 0
            ? PomodoroState["short break"]
            : PomodoroState["long break"]
        }
      />
    }{
      pomodoro.state === PomodoroState["short break"] &&
      <Clock currentState={PomodoroState["short break"]}
        nextState={PomodoroState["work"]}
      />
    }{
      pomodoro.state === PomodoroState["long break"] &&
      <Clock
        currentState={PomodoroState["long break"]}
        nextState={PomodoroState["work"]}
      />
    }
    <div className="flex items-center justify-center gap-4">
      <div className="w-12"></div>
      <button
        onClick={() => {
          SetPlaying(!pomodoro.playing)
        }}
      >
        {pomodoro.playing
          ? <PauseCircle strokeWidth={1.5} size={96} className="hover:text-neutral-600 active:text-neutral-400 transition-colors" />
          : <PlayCircle strokeWidth={1.5} size={96} className="hover:text-neutral-600 active:text-neutral-400 transition-colors" />
        }
      </button>
      <button
        onClick={() => DecreaseSessions(currentCategoryName)}
      >
        <ArrowRightCircle strokeWidth={2} size={48} className="hover:text-neutral-600 active:text-neutral-400 transition-colors" />
      </button>
    </div>
  </div >
}

export default ClockSection