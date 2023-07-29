import classNames from "classnames"
import { FC, useEffect } from "react"
import { Alerts } from "../utils/enums"
import { AlertCircle, AlertTriangle } from "lucide-react"
import { IAlert } from "../types/states"
import { ShiftAlert } from "../utils/alert"

const Alert: FC<IAlert> = ({ type, message }) => {

  useEffect(() => {
    setTimeout(
      ShiftAlert,
      3000
    )
  }, [])

  return <div
    className={classNames({
      "rounded-lg text-sm text-neutral-100 w-80 max-w-full flex gap-2 p-2 items-center": true,
      "bg-yellow-600": type === Alerts.warning,
      "bg-sky-600": type === Alerts.inform
    })}
  >
    {type === Alerts.inform && <AlertCircle />}
    {type === Alerts.warning && <AlertTriangle />}
    {message}
  </div>
}

export default Alert