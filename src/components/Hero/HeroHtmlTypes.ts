/**
 * Components - Hero Html Types
 */

import type { InternalLink, Item } from '../../global/globalHtmlTypes'
import type { PropFile } from '@alanizcreative/static-site-formation/lib/utils/getProp/getPropTypes'

export interface HeroArgs {
  contentType: string
  type?: string
  title: string
  text?: string
  image?: PropFile
  callToAction?: InternalLink
  pageData?: Item
}
