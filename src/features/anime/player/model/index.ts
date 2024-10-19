'use client'

import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { useRouter, useSearchParams } from 'next/navigation'

interface PlayerModelState {
  voiceOver?: string
  setVoiceOver: (voiceOver: string) => void
}

export const useReleaseModel = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleChangeOrder = (order: number) => {
    const params = new URLSearchParams(searchParams.toString())

    if (order) {
      params.set('order', String(order))
    } else {
      params.delete('order')
    }

    router.push(`?${params.toString()}`)
  }

  return { handleChangeOrder }
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
