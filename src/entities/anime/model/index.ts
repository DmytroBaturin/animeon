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
  immer((setState) => ({
    release: {} as ResponseAnime,
    api: {
      setRelease: (release: ResponseAnime) => {
        setState((state) => {
          state.release = {
            ...release,
            genres: release.genres ? [...release.genres] : undefined, // Clone the array to make it mutable
            studio: release.studio ? [...release.studio] : undefined, // Clone the array to make it mutable
          }
        })
      },
    },
  })),
)
