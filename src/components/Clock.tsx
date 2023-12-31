import { FC } from "react"
import { CountdownCircleTimer } from "react-countdown-circle-timer"
import classNames from "classnames"
import bell from "../assets/sounds/bell.ogg"
import { PomodoroState } from "../utils/enums"
import { SetRemaining, SetState } from "../utils/states"
import { useSelector } from "react-redux"
import { RootState } from "../contexts"

interface ClockProps {
  nextState: PomodoroState
  callback?: CallableFunction
}

const Clock: FC<ClockProps> = ({ nextState, callback }) => {

  const pomodoro = useSelector((state: RootState) => state.Pomodoro)

  const convertTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60

    let timeString = ""
    if (hours > 0) timeString += hours.toString().padStart(2, "0") + ":"
    if (hours > 0 || minutes > 0) timeString += minutes.toString().padStart(2, "0") + ":"
    timeString += remainingSeconds.toString().padStart(2, "0")

    return timeString
  }

  return <figure
    aria-label="Countdown clock"
    title="Countdown clock"
  >
    <CountdownCircleTimer
      isPlaying={pomodoro.playing}
      size={200}
      trailStrokeWidth={5}
      strokeWidth={15}
      duration={pomodoro.duration}
      initialRemainingTime={pomodoro.remaining}
      colors={["#52cc63", "#c5ff02", "#ffff09", "#ffd902", "#ff1600"]}
      colorsTime={[
        pomodoro.duration,
        pomodoro.duration / 4 * 3,
        pomodoro.duration / 2,
        pomodoro.duration / 4,
        0
      ]}
      onUpdate={(remainingTime) => SetRemaining(remainingTime)}
      onComplete={() => {
        if (callback) callback()
        new Audio(bell).play()
        SetState(nextState)
        return {
          shouldRepeat: true,
          newInitialRemainingTime: pomodoro.duration
        }
      }}
    >
      {({ remainingTime, color }) => <div
        className={classNames({
          "clock-timer": true,
          "text-5xl": remainingTime < 3600 && remainingTime >= 60,
          "text-7xl": remainingTime < 60,
          "text-3xl": remainingTime >= 3600
        })
        }
        style={{ color: color }}>
        {convertTime(remainingTime)}
      </div>}
    </CountdownCircleTimer>
  </figure>
}

export default Clock