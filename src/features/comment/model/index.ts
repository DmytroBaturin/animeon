import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import type { CreateComment, ResponseCommentAnime } from '@/shared/api/model'
import {
  getAnimeComments,
  getAnimeCommentsResponse,
} from '@/shared/api/anime/anime'
import {
  createAnimeComment,
  getReplyComments,
  getReplyCommentsResponse,
} from '@/shared/api/comment/comment'

interface CommentsState {
  comments: ResponseCommentAnime[]
  replyComments: { [key: number]: ResponseCommentAnime[] }
  replyPage: { [key: number]: number }
  replyNext: { [key: number]: boolean }
  totalPages: number | null
  currentPage: number
  activeMoreReplies: { [key: number]: boolean } // Додаємо стан для відстеження активності "показати більше" для кожного коментаря
  replyTo: { commentId: number; username: string } | null
  replyContent: string
  errors: string | null
  isOpenReplies: { [key: number]: boolean } // Додаємо стан для відкриття/закриття відповідей
  activeReplyForm: number | null // Додаємо стан для активної форми відповіді
  api: {
    toggleReplyForm: (commentId: number) => void
    toggleMoreReplies: (commentId: number) => void
    loadMoreReplies: (commentId: number) => Promise<void>
    toggleReplyMessages: (commentId: number) => void
    fetchComments: (
      id: string,
      slug: string,
      page: number,
    ) => Promise<void | getAnimeCommentsResponse>
    fetchReplyComments: (
      commentId: number,
      page?: number,
    ) => Promise<void | getReplyCommentsResponse>
    createComment: (comment: CreateComment, token: string) => Promise<unknown>
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
          return Promise.reject(error)
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
          return response // Повертаємо успішну відповідь
        } catch (error) {
          return Promise.reject(error) // Повертаємо помилку, якщо запит невдалий
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
          return response // Повертаємо успішну відповідь
        } catch (error) {
          return error
          return Promise.reject(error)
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
            !state.activeMoreReplies[commentId] // Перемикаємо стан "показати більше"
        })
      },

      toggleReplyMessages: (commentId: number) => {
        set((state) => {
          state.isOpenReplies[commentId] = !state.isOpenReplies[commentId] // Перемикаємо стан "відкрити відповіді"
        })

        if (get().isOpenReplies[commentId]) {
          return get().api.fetchReplyComments(commentId) // Якщо відповіді відкриваються, завантажуємо відповіді
        }
        // Якщо відповіді закриваються, очищаємо список відповідей
        set((state) => {
          state.replyComments[commentId] = []
        })
      },

      loadMoreReplies: async (commentId: number) => {
        const { replyPage } = get()
        const nextPage = (replyPage[commentId] || 1) + 1
        try {
          return await get().api.fetchReplyComments(commentId, nextPage) // Повертаємо результат
        } catch (error) {
          return Promise.reject(error) // Повертаємо помилку, якщо не вдалося завантажити відповіді
        }
      },
    },
  })),
)
