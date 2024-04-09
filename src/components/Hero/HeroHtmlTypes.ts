/**
 * Components - Hero Html Types
 */

/* Imports */

import type { Item } from '../../global/globalHtmlTypes'
import type { ImageMinimalData } from '../../objects/Image/ImageHtmlTypes'
import type { RenderFile } from '@alanizcreative/static-site-formation/iop/render/renderTypes'
import type { InternalLink } from '@alanizcreative/static-site-formation/iop/global/globalTypes'

/**
 * @typedef {object} HeroArgs
 * @prop {string} contentType
 * @prop {string} [archive]
 * @prop {string} [type]
 * @prop {string} title
 * @prop {string} [text]
 * @prop {import('@alanizcreative/static-site-formation/iop/render/renderTypes').RenderFile} [image]
 * @prop {import(''../../objects/Image/ImageHtmlTypes'').ImageMinimalData} [imageMinimal]
 * @prop {import('@alanizcreative/static-site-formation/iop/global/globalTypes').InternalLink} [callToAction]
 * @prop {import('../../global/globalHtmlTypes').Item} [pageData]
 */
export interface HeroArgs {
  contentType: string
  archive?: string
  type?: string
  title: string
  text?: string
  image?: RenderFile
  imageMinimal?: ImageMinimalData
  callToAction?: InternalLink
  pageData: Item
}
