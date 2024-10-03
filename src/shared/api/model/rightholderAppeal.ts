/**
 * Generated by orval v7.1.1 🍺
 * Do not edit manually.
 * Anime ON API
 * OpenAPI spec version: ##VERSION## DEV
 */

export interface RightholderAppeal {
  /**
   * @minLength 1
   * @maxLength 255
   */
  contact_person: string;
  /** @minLength 1 */
  document_url: string;
  /**
   * @minLength 1
   * @maxLength 254
   */
  email: string;
  /** @minLength 1 */
  explanation: string;
  /** @minLength 1 */
  message: string;
  /**
   * @minLength 1
   * @maxLength 255
   */
  organization: string;
  /** @minLength 1 */
  release_url: string;
}
