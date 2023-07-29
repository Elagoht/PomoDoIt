import store from "../contexts"
import { addAlert, shiftAlert } from "../contexts/alert"
import { IAlert } from "../types/states"

export const AddAlert = (payload: IAlert): void => {
  store.dispatch(addAlert(payload))
}
export const ShiftAlert = (): void => {
  store.dispatch(shiftAlert(null))
}