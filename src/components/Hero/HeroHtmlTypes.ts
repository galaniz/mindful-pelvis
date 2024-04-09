/**
 * Components - Hero Html Types
 */

/* Imports */

import type { InternalLink, Item } from '../../global/globalHtmlTypes'
import type { PropFile } from '@alanizcreative/static-site-formation/iop/utils/getProp/getPropTypes'
import type { ImageMinimalData } from '../../objects/Image/ImageHtmlTypes'

/**
 * @typedef {object} HeroArgs
 * @prop {string} contentType
 * @prop {string} [archive]
 * @prop {string} [type]
 * @prop {string} title
 * @prop {string} [text]
 * @prop {import('@alanizcreative/static-site-formation/iop/utils/getProp/getPropTypes').PropFile} [image]
 * @prop {import(''../../objects/Image/ImageHtmlTypes'').ImageMinimalData} [imageMinimal]
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
  imageMinimal?: ImageMinimalData
  callToAction?: InternalLink
  pageData: Item
}
