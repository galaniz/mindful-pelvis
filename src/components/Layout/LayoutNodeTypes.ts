/**
 * Components - Layout Node Types
 */

/* Imports */

import type { Item } from '../../global/globalNodeTypes'
import type { RenderLayoutArgs } from '@alanizcreative/static-site-formation/iop/render/renderTypes'
import type { GenericStrings } from '@alanizcreative/static-site-formation/iop/global/globalTypes'

/**
 * @typedef LayoutArgs
 * @type {import('@alanizcreative/static-site-formation/iop/render/renderTypes').RenderLayoutArgs}
 * @prop {import('@alanizcreative/static-site-formation/iop/global/globalTypes').GenericStrings} [navigations]
 * @prop {import('../../global/globalNodeTypes').Item} pageData
 */
export interface LayoutArgs extends RenderLayoutArgs {
  navigations?: GenericStrings
  pageData: Item
}
