/**
 * Components - Similar Node Types
 */

/* Imports */

import type { Item } from '../../global/globalNodeTypes'

/**
 * @typedef {object} SimilarArgs
 * @prop {import('../../global/globalNodeTypes').Item} pageData
 * @prop {string} contentType
 * @prop {string} [titleAdjective]
 * @prop {number} [display]
 */
export interface SimilarArgs {
  pageData: Item
  contentType: string
  titleAdjective?: string
  display?: 3
  fallback?: string
}
