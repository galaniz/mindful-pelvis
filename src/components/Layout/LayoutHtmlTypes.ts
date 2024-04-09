/**
 * Components - Layout Html Types
 */

/* Imports */

import type { Item } from '../../global/globalHtmlTypes'
import type { RenderLayoutArgs } from '@alanizcreative/static-site-formation/iop/render/renderTypes'
import type { GenericStrings } from '@alanizcreative/static-site-formation/iop/global/globalTypes'

/**
 * @typedef LayoutArgs
 * @type {import('@alanizcreative/static-site-formation/iop/render/renderTypes').RenderLayoutArgs}
 * @prop {boolean} [showHeader]
 * @prop {boolean} [showFooter]
 * @prop {boolean} [showHero]
 * @prop {import('@alanizcreative/static-site-formation/iop/global/globalTypes').GenericStrings} [navigations]
 * @prop {import('../../global/globalHtmlTypes').Item} pageData
 */
export interface LayoutArgs extends RenderLayoutArgs {
  showHeader?: boolean
  showFooter?: boolean
  showHero?: boolean
  navigations?: GenericStrings
  pageData: Item
}
