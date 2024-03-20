/**
 * Global - Html Types
 */

/* Imports */

import type { InternalLinkBase } from '@alanizcreative/static-site-formation/iop/global/globalTypes'
import type { PropFile } from '@alanizcreative/static-site-formation/iop/utils/getProp/getPropTypes'
import type { RenderItem } from '@alanizcreative/static-site-formation/iop/render/renderTypes'
import type { ImageMinimalData } from '../objects/Image/ImageHtmlTypes'

/**
 * @typedef Item
 * @type {import('@alanizcreative/static-site-formation/iop/render/renderTypes').RenderItem}
 * @prop {boolean} [pagination]
 * @prop {string} [heroTitle]
 * @prop {string} [heroText]
 * @prop {import('@alanizcreative/static-site-formation/iop/utils/getProp/getPropTypes').PropFile} [heroImage]
 * @prop {import('../objects/Image/ImageHtmlTypes').ImageMinimalData} [heroImageMinimal]
 * @prop {InternalLink} [heroCallToAction]
 * @prop {string} [heroType]
 * @prop {InternalLink[]} [post]
 * @prop {InternalLink[]} [service]
 * @prop {InternalLink[]} [event]
 * @prop {InternalLink[]} [term]
 * @prop {string} [excerpt]
 * @prop {string} [archive]
 */
export interface Item extends RenderItem {
  heroTitle?: string
  heroText?: string
  heroImage?: PropFile
  heroImageMinimal?: ImageMinimalData
  heroCallToAction?: InternalLink
  heroType?: string
  post?: InternalLink[]
  service?: InternalLink[]
  event?: InternalLink[]
  term?: InternalLink[]
  excerpt?: string
  archive?: string
}

/**
 * @typedef InternalLink
 * @type {
 * import('@alanizcreative/static-site-formation/iop/global/globalTypes').InternalLinkBase|
 * import('@alanizcreative/static-site-formation/iop/global/globalTypes').Generic
 * }
 * @prop {Item} [fields]
 */
export interface InternalLink extends InternalLinkBase {
  fields?: Item
  [key: string]: unknown
}
