import classNames from "classnames"
import { FC } from "react"
import { CountdownCircleTimer } from "react-countdown-circle-timer"
import { useSelector } from "react-redux"
import { RootState } from "../contexts"
import { ArrowRightCircle, Clock1, Clock2, PauseCircle, PlayCircle, TimerReset } from "lucide-react"
import { ResetTimer, SetPlaying, SetRemaining } from "../utils/states"
import bell from "../assets/sounds/bell.ogg"

const Clock: FC = () => {

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


  return <div
    className="flex items-center justify-center h-96 flex-col gap-8"
  >
    <CountdownCircleTimer
      isPlaying={pomodoro.playing}
      size={200}
      duration={pomodoro.duration}
      initialRemainingTime={pomodoro.remaining}
      colors={["#52cc63", "#c5ff02", "#ffff09", "#ffd902", "#ff1600"]}
      colorsTime={[
        pomodoro.duration,
        pomodoro.duration / 4 * 3,
        pomodoro.duration / 2,
        pomodoro.duration / 4,
        0,
      ]}
      onUpdate={(remainingTime) => SetRemaining(remainingTime)}
      onComplete={() => {
        ResetTimer()
        new Audio(bell).play()
        return {
          delay: 10,
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
    {/* Controls */}
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
      <button>
        <ArrowRightCircle strokeWidth={2} size={48} className="hover:text-neutral-600 active:text-neutral-400 transition-colors" />
      </button>
    </div>
  </div >
}

export default Clock