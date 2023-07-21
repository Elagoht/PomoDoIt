import classNames from "classnames"
import { FC } from "react"
import { PomodoroState } from "../utils/enums"
import { useSelector } from "react-redux"
import { RootState } from "../contexts"
import { SetState } from "../utils/states"
const StateSelector: FC = () => {

  const pomodoro = useSelector((state: RootState) => state.Pomodoro)

  return <div className="flex items-center justify-center">
    <button
      onClick={() => SetState(PomodoroState.work)}
      className={classNames({
        "px-4 py-2 rounded-l-lg border-2 border-red-800 w-32": true,
        "bg-red-500 text-neutral-200": pomodoro.state === PomodoroState.work
      })}
    >
      work!
    </button>
    <button
      onClick={() => SetState(PomodoroState["short break"])}
      className={classNames({
        "px-4 py-2 border-y-2 border-red-800 w-32": true,
        "bg-red-500 text-neutral-200": pomodoro.state === PomodoroState["short break"]
      })}
    >
      short break
    </button>
    <button
      onClick={() => SetState(PomodoroState["long break"])}
      className={classNames({
        "px-4 py-2 rounded-r-lg border-2 border-red-800 w-32": true,
        "bg-red-500 text-neutral-200": pomodoro.state === PomodoroState["long break"]
      })}
    >
      long break
    </button>
  </div>
}

export default StateSelector