import { PayloadAction, createSlice, SliceCaseReducers } from "@reduxjs/toolkit"
import { IPomodoro } from "../types/states"
import { PomodoroState } from "../utils/enums"

const initialState: IPomodoro = localStorage.getItem("pomodoro")
  ? {
    ...JSON.parse(localStorage.getItem("pomodoro") as string),
    playing: false
  }
  : {
    state: PomodoroState.work,
    duration: 25 * 60,
    remaining: 25 * 60,
    playing: false
  }

const Pomodoro = createSlice<IPomodoro, SliceCaseReducers<IPomodoro>>({
  name: "pomodoro",
  initialState,
  reducers: {
    setPlaying: (state: IPomodoro, action: PayloadAction<boolean>) => {
      state.playing = action.payload
    },
    setDuration: (state: IPomodoro, action: PayloadAction<number>) => {
      state.duration = action.payload
    },
    setRemaining: (state: IPomodoro, action: PayloadAction<number>) => {
      state.remaining = action.payload
    },
    setState: (state: IPomodoro, action: PayloadAction<PomodoroState>) => {
      switch (action.payload) {
        case PomodoroState["short break"]:
          state.duration = 5 * 60
          state.remaining = 5 * 60
          break
        case PomodoroState["long break"]:
          state.duration = 15 * 60
          state.remaining = 15 * 60
          break
        default:
          state.duration = 25 * 60
          state.remaining = 25 * 60
          break
      }
      state.state = action.payload
    }
  }
})

export const { setPlaying, setState, setDuration, setRemaining, resetTimer } = Pomodoro.actions
export default Pomodoro.reducer
