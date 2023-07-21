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
    setState: (state: IPomodoro, action: PayloadAction<PomodoroState>) => {
      state.state = action.payload
    },
    setDuration: (state: IPomodoro, action: PayloadAction<number>) => {
      state.duration = action.payload
    },
    setRemaining: (state: IPomodoro, action: PayloadAction<number>) => {
      state.remaining = action.payload
    },
    resetTimer: (state: IPomodoro) => {
      state.state = PomodoroState.work
      state.duration = 25 * 60
      state.remaining = 25 * 60
    }
  }
})

export const { setPlaying, setState, setDuration, setRemaining, resetTimer } = Pomodoro.actions
export default Pomodoro.reducer
