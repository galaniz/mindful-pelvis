/**
 * Components - Article Node Types
 */

/* Imports */

import type { RichTextHeading } from '@alanizcreative/static-site-formation/iop/text/RichText/RichTextTypes'
import type { Item } from '../../global/globalNodeTypes'

/**
 * @typedef {object} ArticleArgs
 * @prop {string} content
 * @prop {import('../../global/globalNodeTypes').Item} pageData
 * @prop {string} [shareLink]
 * @prop {string} [shareTitle]
 * @prop {import('@alanizcreative/static-site-formation/iop/text/RichText/RichTextTypes').RichTextHeading[]} [navItems]
 * @prop {boolean} [showSocial]
 * @prop {boolean} [showNav]
 */
export interface ArticleArgs {
  content: string
  pageData: Item
  shareLink?: string
  shareTitle?: string
  navItems?: RichTextHeading[]
  showSocial?: boolean
  showNav?: boolean
}
