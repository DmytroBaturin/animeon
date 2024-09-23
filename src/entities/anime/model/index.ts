import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import type { ResponseAnime } from '@/shared/api/model'

interface ReleaseState {
  release: ResponseAnime
  api: {
    setRelease: (release: ResponseAnime) => void
  }
}

export const useRelease = create<ReleaseState>()(
  immer((setState, getState) => ({
    release: {} as ResponseAnime,
    api: {
      setRelease: (release: ResponseAnime) => {
        setState((state) => {
          state.release = release
        })
      },
    },
  })),
)
