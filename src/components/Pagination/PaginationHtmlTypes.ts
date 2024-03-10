/**
 * Components - Pagination Html Types
 */

/* Imports */

import type { Item } from '../../global/globalHtmlTypes'

/**
 * @typedef {object} PaginationArgs
 * @prop {number} total
 * @prop {number} current
 * @prop {string} filters
 * @prop {import('../../global/globalHtmlTypes').Item} pageData
 */
export interface PaginationArgs {
  total: number
  current: number
  filters: string
  pageData: Item
}
