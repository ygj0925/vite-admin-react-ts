import { configureStore } from '@reduxjs/toolkit'
import settingsReducer from './slices/settingsSlice'
import type { SettingsState } from './slices/settingsSlice'

const PERSIST_KEY = 'app_state_v1'
type PersistedState = { settings: SettingsState }

function loadState(): PersistedState | undefined {
  try {
    const raw = localStorage.getItem(PERSIST_KEY)
    if (!raw) return undefined
    return JSON.parse(raw) as PersistedState
  } catch {
    return undefined
  }
}

function saveState(state: PersistedState) {
  try {
    localStorage.setItem(PERSIST_KEY, JSON.stringify(state))
  } catch {
    // ignore
  }
}

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
  },
  preloadedState: loadState(),
})

store.subscribe(() => {
  const state = store.getState() as PersistedState
  saveState({ settings: state.settings })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store