import classNames from "classnames"
import { FC } from "react"
import { PomodoroState } from "../utils/enums"
import { useSelector } from "react-redux"
import { RootState } from "../contexts"

const State: FC = () => {

  const pomodoro = useSelector((state: RootState) => state.Pomodoro)

  return <div className="flex items-center justify-center w-full">
    <div
      className={classNames({
        "text-center p-2 flex-1 whitespace-nowrap text-stone-100": true,
        "bg-stone-900 rounded-lg": pomodoro.state === PomodoroState.work
      })}
    >
      work!
    </div>
    <div
      className={classNames({
        "text-center p-2 flex-1 whitespace-nowrap text-stone-100": true,
        "bg-stone-900 rounded-lg": pomodoro.state === PomodoroState["short break"]
      })}
    >
      short break
    </div>
    <div
      className={classNames({
        "text-center p-2 flex-1 whitespace-nowrap text-stone-100": true,
        "bg-stone-900 rounded-lg": pomodoro.state === PomodoroState["long break"]
      })}
    >
      long break
    </div>
  </div>
}

export default State