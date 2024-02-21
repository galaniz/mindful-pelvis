/**
 * Components - Hero Html Types
 */

/* Imports */

import type { InternalLink, Item } from '../../global/globalHtmlTypes'
import type { PropFile } from '@alanizcreative/static-site-formation/lib/utils/getProp/getPropTypes'

/**
 * @typedef {object} HeroArgs
 * @prop {string} contentType
 * @prop {string} [archive]
 * @prop {string} [type]
 * @prop {string} title
 * @prop {string} [text]
 * @prop {import('@alanizcreative/static-site-formation/lib/utils/getProp/getPropTypes').PropFile} [image]
 * @prop {import('../../global/globalHtmlTypes').InternalLink} [callToAction]
 * @prop {import('../../global/globalHtmlTypes').Item} [pageData]
 */
export interface HeroArgs {
  contentType: string
  archive?: string
  type?: string
  title: string
  text?: string
  image?: PropFile
  callToAction?: InternalLink
  pageData: Item
}
