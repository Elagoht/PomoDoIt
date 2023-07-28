import classNames from "classnames"
import { FC } from "react"
import { PomodoroState } from "../utils/enums"
import { useSelector } from "react-redux"
import { RootState } from "../contexts"

const StateSelector: FC = () => {

  const pomodoro = useSelector((state: RootState) => state.Pomodoro)

  return <div className="flex items-center justify-center w-full">
    <button
      className={classNames({
        "p-2 flex-1 whitespace-nowrap dark:text-red-100": true,
        "bg-neutral-900 bg-opacity-20 rounded-lg text-neutral-100": pomodoro.state === PomodoroState.work
      })}
    >
      work!
    </button>
    <button
      className={classNames({
        "p-2 flex-1 whitespace-nowrap dark:text-red-100": true,
        "bg-neutral-900 bg-opacity-20 rounded-lg text-neutral-100": pomodoro.state === PomodoroState["short break"]
      })}
    >
      short break
    </button>
    <button
      className={classNames({
        "p-2 flex-1 whitespace-nowrap dark:text-red-100": true,
        "bg-neutral-900 bg-opacity-20 rounded-lg text-neutral-100": pomodoro.state === PomodoroState["long break"]
      })}
    >
      long break
    </button>
  </div>
}

export default StateSelector