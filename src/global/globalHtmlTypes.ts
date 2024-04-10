/**
 * Global - Html Types
 */

/* Imports */

import type { InternalLink } from '@alanizcreative/static-site-formation/iop/global/globalTypes'
import type { RenderFile, RenderItem } from '@alanizcreative/static-site-formation/iop/render/renderTypes'
import type { ImageMinimalData } from '../objects/Image/ImageHtmlTypes'

/**
 * @typedef Item
 * @type {import('@alanizcreative/static-site-formation/iop/render/renderTypes').RenderItem}
 * @prop {boolean} [showHeader]
 * @prop {boolean} [showFooter]
 * @prop {boolean} [showHero]
 * @prop {string} [blobs]
 * @prop {string} [heroTitle]
 * @prop {string} [heroText]
 * @prop {import('@alanizcreative/static-site-formation/iop/render/renderTypes').RenderFile} [heroImage]
 * @prop {import('../objects/Image/ImageHtmlTypes').ImageMinimalData} [heroImageMinimal]
 * @prop {InternalLink} [heroCallToAction]
 * @prop {string} [heroType]
 * @prop {import('@alanizcreative/static-site-formation/iop/global/globalTypes').InternalLink[]} [post]
 * @prop {import('@alanizcreative/static-site-formation/iop/global/globalTypes').InternalLink[]} [service]
 * @prop {import('@alanizcreative/static-site-formation/iop/global/globalTypes').InternalLink[]} [event]
 * @prop {import('@alanizcreative/static-site-formation/iop/global/globalTypes').InternalLink[]} [term]
 * @prop {string} [excerpt]
 * @prop {string} [archive]
 */
export interface Item extends RenderItem {
  showHeader?: boolean
  showFooter?: boolean
  showHero?: boolean
  blobs?: string
  heroTitle?: string
  heroText?: string
  heroImage?: RenderFile
  heroImageMinimal?: ImageMinimalData
  heroCallToAction?: InternalLink
  heroType?: string
  post?: InternalLink[]
  service?: InternalLink[]
  event?: InternalLink[]
  term?: InternalLink[]
  excerpt?: string
}
