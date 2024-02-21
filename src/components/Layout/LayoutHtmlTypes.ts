/**
 * Components - Layout Html Types
 */

/* Imports */

import type { Item } from '../../global/globalHtmlTypes'
import type { RenderLayoutArgs } from '@alanizcreative/static-site-formation/lib/render/RenderTypes'
import type { GenericStrings } from '@alanizcreative/static-site-formation/lib/global/globalTypes'

/**
 * @typedef LayoutArgs
 * @type {import('@alanizcreative/static-site-formation/lib/render/RenderTypes').RenderLayoutArgs}
 * @prop {import('@alanizcreative/static-site-formation/lib/global/globalTypes').GenericStrings} [navigations]
 * @prop {import('../../global/globalHtmlTypes').Item} pageData
 */
export interface LayoutArgs extends RenderLayoutArgs {
  navigations?: GenericStrings
  pageData: Item
}
