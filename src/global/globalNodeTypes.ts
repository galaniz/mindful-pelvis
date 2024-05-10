/**
 * Global - Node Types
 */

/* Imports */

import type { InternalLink, Taxonomy } from '@alanizcreative/static-site-formation/iop/global/globalTypes'
import type { RenderFile, RenderItem } from '@alanizcreative/static-site-formation/iop/render/renderTypes'
import type { ImageMinimalData } from '../objects/Image/ImageNodeTypes'

/**
 * @typedef Item
 * @type {ItemBase}
 * @prop {boolean} [showHeader]
 * @prop {boolean} [showFooter]
 * @prop {boolean} [showHero]
 * @prop {string} [blobs]
 * @prop {string} [heroTitle]
 * @prop {string} [heroText]
 * @prop {import('@alanizcreative/static-site-formation/iop/render/renderTypes').RenderFile} [heroImage]
 * @prop {import('../objects/Image/ImageNodeTypes').ImageMinimalData} [heroImageMinimal]
 * @prop {InternalLink} [heroCallToAction]
 * @prop {string} [heroType]
 * @prop {import('@alanizcreative/static-site-formation/iop/global/globalTypes').InternalLink[]} [post]
 * @prop {import('@alanizcreative/static-site-formation/iop/global/globalTypes').InternalLink[]} [service]
 * @prop {import('@alanizcreative/static-site-formation/iop/global/globalTypes').InternalLink[]} [event]
 * @prop {import('@alanizcreative/static-site-formation/iop/global/globalTypes').InternalLink[]} [term]
 * @prop {import('@alanizcreative/static-site-formation/iop/global/globalTypes').Taxonomy} [taxonomy]
 * @prop {string} [excerpt]
 * @prop {string} [archive]
 * @prop {string} [theme]
 * @prop {Item[]} [similar]
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
  taxonomy?: Taxonomy
  excerpt?: string
  archive?: string
  theme?: string
  similar?: Item[]
}
