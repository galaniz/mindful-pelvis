/**
 * Global - Html Types
 */

import type { InternalLinkBase } from '@alanizcreative/static-site-formation/lib/global/globalTypes'
import type { PropFile } from '@alanizcreative/static-site-formation/lib/utils/getProp/getPropTypes'
import type { RenderItem } from '@alanizcreative/static-site-formation/lib/render/RenderTypes'

export interface Item extends RenderItem {
  pagination?: boolean
  heroTitle?: string
  heroText?: string
  heroImage?: PropFile
  heroCallToAction?: InternalLink
  heroType?: string
  post?: InternalLink[]
  category?: InternalLink[]
  service?: InternalLink[]
  event?: InternalLink[]
  eventType?: InternalLink[]
}

export interface InternalLink extends InternalLinkBase {
  fields?: Item
  [key: string]: unknown
}
