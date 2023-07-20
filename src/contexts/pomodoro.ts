import { PayloadAction, createSlice, SliceCaseReducers } from "@reduxjs/toolkit"
import { IPomodoro } from "../types/states"
import { PomodoroState } from "../utils/enums"

const initialState: IPomodoro = {
  state: PomodoroState.work,
  duration: 25 * 60,
  remaining: 25 * 60,
  playing: false
}

const Pomodoro = createSlice<IPomodoro, SliceCaseReducers<IPomodoro>>({
  name: "pomodoro",
  initialState,
  reducers: {
    togglePlaying: (state: IPomodoro) => {
      state.playing = !state.playing
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
      state.playing = false
    }
  }
})

export const { togglePlaying } = Pomodoro.actions
export default Pomodoro.reducer
