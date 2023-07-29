import { FC } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../contexts"
import { ChevronRightCircle, PauseCircle, PlayCircle } from "lucide-react"
import { DecreaseSessions, SetPlaying, SetState, SetToLong } from "../utils/states"
import Clock from "./Clock"
import { PomodoroState } from "../utils/enums"
import StateSelector from "./StateSelector"

const ClockSection: FC = () => {

  const pomodoro = useSelector((state: RootState) => state.Pomodoro)
  const categories = Object.keys(useSelector((state: RootState) => state.Todos.todos))
  const category = useSelector((state: RootState) => state.Category.name)
  const currentCategoryName = categories[category]

  return <div
    className="rounded-3xl max-w-2xl p-2 mx-auto flex items-center flex-col justify-center gap-4"
  >
    {
      pomodoro.state === PomodoroState["work"] &&
      <Clock
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
      <Clock
        nextState={PomodoroState["work"]}
      />
    }{
      pomodoro.state === PomodoroState["long break"] &&
      <Clock
        nextState={PomodoroState["work"]}
      />
    }

    {/* Controlls */}

    <div className="flex items-center">
      <div className="w-[64px]"></div>
      <button
        onClick={() => {
          SetPlaying(!pomodoro.playing)
        }}
      >
        {pomodoro.playing
          ? <PauseCircle strokeWidth={1.5} size={96} className="text-neutral-100 hover:text-neutral-300 active:text-neutral-400 transition-colors" />
          : <PlayCircle strokeWidth={1.5} size={96} className="text-neutral-100 hover:text-neutral-300 active:text-neutral-400 transition-colors" />
        }
      </button>
      <button
        onClick={() => SetState(
          pomodoro.state === PomodoroState["work"]
            ? PomodoroState["short break"]
            : PomodoroState["work"]
        )}
      >
        <ChevronRightCircle strokeWidth={2} size={64} className="text-neutral-100 hover:text-neutral-300 active:text-neutral-400 transition-colors" />
      </button>
    </div>
    <StateSelector />
  </div>
}

export default ClockSection