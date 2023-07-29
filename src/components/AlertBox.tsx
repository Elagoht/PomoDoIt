import { FC, useRef } from "react"
import Alert from "./Alert"
import { useSelector } from "react-redux"
import { RootState } from "../contexts"
import { useAutoAnimate } from "@formkit/auto-animate/react"

const AlertBox: FC = () => {

  const alerts = useSelector((state: RootState) => state.Alert.alerts)
  const [animationParent] = useAutoAnimate()

  return <div
    className="fixed top-0 left-0 w-full p-4 gap-2 flex flex-col z-50"
    ref={animationParent}
  >
    {alerts.map((item, index) => (
      <Alert
        key={index}
        message={item.message}
        type={item.type}
      />
    ))}
  </div>
}

export default AlertBox