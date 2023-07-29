import { PayloadAction, createSlice, SliceCaseReducers } from "@reduxjs/toolkit"
import { IAlert, IAlerts } from "../types/states"

const initialState: IAlerts = {
  alerts: []
}

const Alert = createSlice<IAlerts, SliceCaseReducers<IAlerts>>({
  name: "alert",
  initialState,
  reducers: {
    addAlert: (state: IAlerts, action: PayloadAction<IAlert>) => {
      state.alerts.push(action.payload)
    },
    shiftAlert: (state: IAlerts) => {
      state.alerts.shift()
    }
  }
})

export const { addAlert, shiftAlert } = Alert.actions
export default Alert.reducer
