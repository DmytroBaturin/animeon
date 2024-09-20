/**
 * Generated by orval v7.1.1 🍺
 * Do not edit manually.
 * Anime ON API
 * OpenAPI spec version: ##VERSION## DEV.
 */
import type { ResponseAnimeListType } from './responseAnimeListType'

export interface ResponseAnimeList {
  /** @nullable */
  readonly card_image?: string | null
  readonly count_episodes?: string
  readonly id?: number
  /**
   * @maxLength 255
   * @pattern ^[-a-zA-Z0-9_]+$
   */
  slug?: string
  /**
   * @minLength 1
   * @maxLength 255
   */
  title?: string
  type: ResponseAnimeListType
  /**
   * @minimum -32768
   * @maximum 32767
   */
  year: number
}
