import { create } from 'zustand'
import { Options } from 'plyr'

interface PlayerState {
  quality: number
  setQuality: (quality: number) => void
  isPlaying: boolean
  setIsPlaying: (isPlaying: boolean) => void
  plyrOptions: Options | null
  setPlyrOptions: (options: Options) => void
}

export const usePlayerStore = create<PlayerState>((set) => ({
  quality: 720,
  setQuality: (quality) => set({ quality }),
  isPlaying: false,
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  plyrOptions: null, // Початкові опції плеєра
  setPlyrOptions: (options) => set({ plyrOptions: options }),
}))
