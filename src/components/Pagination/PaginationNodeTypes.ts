/**
 * Components - Pagination Node Types
 */

/* Imports */

import type { Item } from '../../global/globalNodeTypes'

/**
 * @typedef {object} PaginationArgs
 * @prop {number} total
 * @prop {number} current
 * @prop {string} filters
 * @prop {import('../../global/globalNodeTypes').Item} pageData
 */
export interface PaginationArgs {
  total: number
  current: number
  filters: string
  pageData: Item
}
