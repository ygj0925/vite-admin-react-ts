import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type SupportedLanguage = 'zh-CN' | 'en-US'

export interface SettingsState {
  language: SupportedLanguage
}

const initialState: SettingsState = {
  language: 'zh-CN',
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<SupportedLanguage>) {
      state.language = action.payload
    },
  },
})

export const { setLanguage } = settingsSlice.actions
export default settingsSlice.reducer


