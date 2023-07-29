import { FC } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../contexts"
import { ChevronRightCircle, PauseCircle, PlayCircle } from "lucide-react"
import { DecreaseSessions, SetPlaying, SetState, SetToLong } from "../utils/states"
import Clock from "./Clock"
import { PomodoroState } from "../utils/enums"
import State from "./State"

const ClockSection: FC = () => {

  const pomodoro = useSelector((state: RootState) => state.Pomodoro)
  const categories = Object.keys(useSelector((state: RootState) => state.Todos.todos))
  const category = useSelector((state: RootState) => state.Category.name)
  const currentCategoryName = categories[category]

  return <div
    className="rounded-3xl max-w-2xl mt-8 mx-auto flex flex-col items-center justify-center gap-16"
  >
    <div className="flex gap-1 max-sm:scale-75">
      {/* Clocks */}
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
        <button
          onClick={() => {
            SetPlaying(!pomodoro.playing)
          }}
          aria-label="Play/pause button"
          title="Play/pause button"
        >
          {pomodoro.playing
            ? <PauseCircle strokeWidth={1} size={96} className="text-stone-100 hover:text-stone-300 active:text-stone-400 transition-colors" />
            : <PlayCircle strokeWidth={1} size={96} className="text-stone-100 hover:text-stone-300 active:text-stone-400 transition-colors" />
          }
        </button>
        <button
          onClick={() => SetState(
            pomodoro.state === PomodoroState["work"]
              ? PomodoroState["short break"]
              : PomodoroState["work"]
          )}
          aria-label="Next state"
          title="Next state"
        >
          <ChevronRightCircle strokeWidth={1.5} size={64} className="text-stone-100 hover:text-stone-300 active:text-stone-400 transition-colors" />
        </button>
      </div>
    </div>

    {/* State */}
    <State />
  </div>
}

export default ClockSection