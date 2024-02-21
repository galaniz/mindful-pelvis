/**
 * Global - Html Types
 */

/* Imports */

import type { Generic, InternalLinkBase } from '@alanizcreative/static-site-formation/lib/global/globalTypes'
import type { PropFile } from '@alanizcreative/static-site-formation/lib/utils/getProp/getPropTypes'
import type { RenderItem } from '@alanizcreative/static-site-formation/lib/render/RenderTypes'

/**
 * @typedef Item
 * @type {import('@alanizcreative/static-site-formation/lib/render/RenderTypes').RenderItem}
 * @prop {boolean} [pagination]
 * @prop {string} [heroTitle]
 * @prop {string} [heroText]
 * @prop {import('@alanizcreative/static-site-formation/lib/utils/getProp/getPropTypes').PropFile} [heroImage]
 * @prop {import('@alanizcreative/static-site-formation/lib/global/globalTypes').Generic} [heroImageMinimal]
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
  heroImageMinimal?: Generic
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
 * import('@alanizcreative/static-site-formation/lib/global/globalTypes').InternalLinkBase|
 * import('@alanizcreative/static-site-formation/lib/global/globalTypes').Generic
 * }
 * @prop {Item} [fields]
 */
export interface InternalLink extends InternalLinkBase {
  fields?: Item
  [key: string]: unknown
}
