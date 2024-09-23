import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface PlayerModelState {
  voiceOver?: string
  setVoiceOver: (voiceOver: string) => void
}

export const usePlayerModel = create<PlayerModelState>()(
  immer((set) => ({
    voiceOver: undefined,
    setVoiceOver: (voiceOver: string) =>
      set((state) => {
        state.voiceOver = voiceOver
      }),
  })),
)
