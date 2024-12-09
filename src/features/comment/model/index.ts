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
  release: { id: number; slug: string }
  api: {
    initRelease: (id: number, slug: string) => void
    resetComments: () => void
    toggleReplyForm: (commentId: number) => void
    toggleMoreReplies: (commentId: number) => void
    loadMoreReplies: (commentId: number) => Promise<void>
    toggleReplyMessages: (commentId: number) => void
    fetchComments: (id: string, slug: string, page: number) => Promise<void>
    fetchReplyComments: (commentId: number, page?: number) => Promise<void>
    createComment: (
      comment: CreateComment,
      token: string,
    ) => Promise<{ success: boolean; error: any }>
  }
}

export const useCommentsModel = create<CommentsState>()(
  immer((set, get) => ({
    release: { id: 0, slug: '' },
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
      initRelease: (id, slug) => {
        set((state) => {
          state.release = { id, slug }
        })
      },
      fetchComments: async (id, slug, page = 1): Promise<void> => {
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

      fetchReplyComments: async (commentId, page = 1): Promise<void> => {
        try {
          const response = await getReplyComments(String(commentId), {
            page,
            page_size: 5,
          })

          set((state) => {
            const existingReplies = state.replyComments[commentId] || []

            const uniqueReplies = response.data.results.filter(
              (newReply) =>
                !existingReplies.some((reply) => reply.id === newReply.id),
            )

            state.replyComments[commentId] = [
              ...existingReplies,
              ...uniqueReplies,
            ]
            state.replyNext[commentId] = Boolean(response.data.next)
            state.replyPage[commentId] = page
          })
        } catch (error) {
          console.error('Failed to fetch reply comments:', error)
        }
      },
      createComment: async (
        comment: CreateComment,
        token: string,
      ): Promise<{ success: boolean; error: any }> => {
        try {
          const response = await createAnimeComment(comment, {
            headers: { Authorization: `Bearer ${token}` },
          })

          if (response.status !== 201) {
            return {
              success: false,
              error: response.data.errors || 'Щось пішло не так',
            }
          }
          await (
            comment.parent_id
              ? get()
                  .api.fetchReplyComments(comment.parent_id, 1)
                  .then(() => {
                    set((state) => {
                      const existingReplies =
                        state.replyComments[comment.parent_id] || []
                      const newReply = response.data

                      if (
                        !existingReplies.some(
                          (reply) => reply.id === newReply.id,
                        )
                      ) {
                        state.replyComments[comment.parent_id] = [
                          newReply,
                          ...existingReplies,
                        ]
                      }
                    })
                  })
              : get().api.fetchComments(
                  String(get().release.id),
                  get().release.slug,
                  1,
                )
          ).then(() => {
            if (comment.parent_id && !get().isOpenReplies[comment.parent_id]) {
              get().api.toggleReplyMessages(comment.parent_id)
              get().api.toggleMoreReplies(comment.parent_id)
            }
          })

          set((state) => {
            state.activeReplyForm = null
            state.replyTo = null
            state.replyContent = ''
          })

          return { success: true, error: null }
        } catch (error) {
          return { success: false, error: error || 'Щось пішло не так' }
        }
      },

      loadMoreReplies: async (commentId: number): Promise<void> => {
        const { replyPage } = get()
        const nextPage = (replyPage[commentId] || 1) + 1
        await get().api.fetchReplyComments(commentId, nextPage)
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
    },
  })),
)
