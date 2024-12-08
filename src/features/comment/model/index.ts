import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import type { CreateComment, ResponseCommentAnime } from '@/shared/api/model'
import { getAnimeComments } from '@/shared/api/anime/anime'
import {
  createAnimeComment,
  getReplyComments,
} from '@/shared/api/comment/comment'

interface CommentsState {
  comments: ResponseCommentAnime[]
  replyComments: { [key: number]: ResponseCommentAnime[] }
  replyPage: { [key: number]: number }
  replyNext: { [key: number]: boolean }
  totalPages: number | null
  currentPage: number
  activeMoreReplies: { [key: number]: boolean }
  replyTo: { commentId: number; username: string } | null
  replyContent: string
  errors: string | null
  isOpenReplies: { [key: number]: boolean }
  activeReplyForm: number | null
  api: {
    resetComments: () => void
    toggleReplyForm: (commentId: number) => void
    toggleMoreReplies: (commentId: number) => void
    loadMoreReplies: (commentId: number) => void
    toggleReplyMessages: (commentId: number) => void
    fetchComments: (id: string, slug: string, page: number) => void
    fetchReplyComments: (commentId: number, page?: number) => void
    createComment: (comment: CreateComment, token: string) => void
  }
}

export const useCommentsModel = create<CommentsState>()(
  immer((set, get) => ({
    comments: [],
    replyComments: {},
    activeMoreReplies: {},
    replyPage: {},
    replyNext: {},
    isOpenReplies: {},
    totalPages: null,
    currentPage: 1,
    replyTo: null,
    replyContent: '',
    errors: null,
    activeReplyForm: null,

    api: {
      fetchComments: async (id, slug, page = 1) => {
        try {
          const response = await getAnimeComments(id, slug, { page })
          set((state) => {
            state.comments = response.data.results
            state.totalPages = response.data.num_pages
          })
        } catch (error) {
          console.error('Failed to fetch comments:', error)
        }
      },

      fetchReplyComments: async (commentId, page = 1) => {
        try {
          const response = await getReplyComments(String(commentId), {
            page,
            page_size: 5,
          })
          set((state) => {
            state.replyComments[commentId] = [
              ...(state.replyComments[commentId] || []),
              ...response.data.results,
            ]
            state.replyNext[commentId] = !!response.data.next
            state.replyPage[commentId] = page
          })
        } catch (error) {
          console.error('Failed to fetch reply comments:', error)
        }
      },

      createComment: async (comment, token) => {
        try {
          const response = await createAnimeComment(comment, {
            headers: { Authorization: `Bearer ${token}` },
          })

          if (response.status !== 201) {
            throw new Error('Failed to create comment')
          }

          set((state) => {
            if (comment.parent_id) {
              state.replyComments[comment.parent_id] = [
                response.data,
                ...(state.replyComments[comment.parent_id] || []),
              ]
            } else {
              state.comments.unshift(response.data)
            }
            state.activeReplyForm = null
            state.replyTo = null
            state.replyContent = ''
          })
        } catch (error) {
          console.error('Failed to create comment:', error)
        }
      },

      toggleReplyForm: (commentId: number) => {
        set((state) => {
          state.activeReplyForm =
            state.activeReplyForm === commentId ? null : commentId
        })
      },

      toggleMoreReplies: (commentId: number) => {
        set((state) => {
          state.activeMoreReplies[commentId] =
            !state.activeMoreReplies[commentId]
        })
      },

      toggleReplyMessages: (commentId: number) => {
        set((state) => {
          state.isOpenReplies[commentId] = !state.isOpenReplies[commentId]
        })

        if (get().isOpenReplies[commentId]) {
          get().api.fetchReplyComments(commentId)
        } else {
          set((state) => {
            state.replyComments[commentId] = []
          })
        }
      },

      resetComments: () => {
        set((state) => {
          state.comments = []
          state.replyComments = {}
          state.replyPage = {}
          state.replyNext = {}
          state.isOpenReplies = {}
          state.totalPages = null
          state.currentPage = 1
          state.replyTo = null
          state.replyContent = ''
          state.errors = null
          state.activeReplyForm = null
          state.activeMoreReplies = {}
        })
      },

      loadMoreReplies: async (commentId: number) => {
        const { replyPage } = get()
        const nextPage = (replyPage[commentId] || 1) + 1
        await get().api.fetchReplyComments(commentId, nextPage)
      },
    },
  })),
)
