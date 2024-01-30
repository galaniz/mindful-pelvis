/**
 * Components - Layout Html Types
 */

import { Item } from '../../global/globalHtmlTypes'
import type { NavigationsReturn } from '../Navigations/NavigationsHtmlTypes'
import type { RenderLayoutArgs } from '@alanizcreative/static-site-formation/lib/render/RenderTypes'

export interface LayoutArgs extends RenderLayoutArgs {
  navigations?: NavigationsReturn
  pageData: Item
}
