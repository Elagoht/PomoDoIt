import classNames from "classnames"
import { FC } from "react"
import { CountdownCircleTimer } from "react-countdown-circle-timer"

interface ClockProps {
  duration: number,
  isPlaying: boolean
}

const Clock: FC<ClockProps> = ({ duration, isPlaying }) => {

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

  return <div className="p-4">
    <CountdownCircleTimer
      isPlaying={isPlaying}
      size={200}
      duration={duration}
      colors={["#52cc63", "#c5ff02", "#ffff09", "#ffd902", "#ff1600"]}
      colorsTime={[
        duration,
        duration / 4 * 3,
        duration / 2,
        duration / 4,
        0,
      ]}
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
  </div>
}

export default Clock