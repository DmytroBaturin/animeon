import { create } from 'zustand'
import type { ResponseCommentAnime } from '@/shared/api/model'

interface CommentsState {
  comments: ResponseCommentAnime[]
  api: {}
}

export const useCommentsModel = create<CommentsState>(() => ({
  comments: [],
  api: {},
}))
