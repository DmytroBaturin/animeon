/**
 * Generated by orval v7.1.1 🍺
 * Do not edit manually.
 * Anime ON API
 * OpenAPI spec version: ##VERSION## DEV
 */
import type { UserAnimeListAction } from './userAnimeListAction';
import type { UserAnimeListType } from './userAnimeListType';

export type UserAnimeListParams = {
/**
 * action
 */
action?: UserAnimeListAction;
/**
 * genres
 */
genres?: string;
/**
 * type
 */
type?: UserAnimeListType;
/**
 * name
 */
name?: string;
/**
 * A page number within the paginated result set.
 */
page?: number;
/**
 * Number of results to return per page.
 */
page_size?: number;
};
