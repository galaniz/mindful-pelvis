/**
 * Components - Article Browser Types
 */

/**
 * @typedef {object} ArticleHashArgs
 * @prop {Element|null} link
 * @prop {Element[]} item
 * @prop {number} offset
 */
export interface ArticleHashArgs {
  link: Element | null
  item: Element[]
  offset: number
}
