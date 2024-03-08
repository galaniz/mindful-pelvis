/**
 * Components - Article Html Types
 */

/* Imports */

import type { RichTextHeading } from '@alanizcreative/static-site-formation/iop/text/RichText/RichTextTypes'

/**
 * @typedef {object} ArticleArgs
 * @prop {string} content
 * @prop {string} [shareLink]
 * @prop {string} [shareTitle]
 * @prop {import('@alanizcreative/static-site-formation/iop/text/RichText/RichTextTypes').RichTextHeading[]} [navItems]
 * @prop {boolean} [showSocial]
 * @prop {boolean} [showNav]
 */
export interface ArticleArgs {
  content: string
  shareLink?: string
  shareTitle?: string
  navItems?: RichTextHeading[]
  showSocial?: boolean
  showNav?: boolean
}
