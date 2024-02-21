/**
 * Objects - Posts Html Types
 */

/* Imports */

import type { Item } from '../../global/globalHtmlTypes'
import type { RenderServerlessData } from '@alanizcreative/static-site-formation/lib/render/RenderTypes'

/**
 * @typedef {object} PostsProps
 * @prop {object} args
 * @prop {string} [args.contentType]
 * @prop {number} [args.display]
 * @prop {string} [args.headingLevel]
 * @prop {boolean} [args.pagination]
 * @prop {string[]} [args.filters]
 * @prop {string} [args.linkContentType]
 * @prop {boolean} [args.nothingFoundText]
 * @prop {string} [args.order]
 * @prop {string} [args.termId]
 * @prop {import('../../global/globalHtmlTypes').Item} [pageData]
 * @prop {string[]} [pageContains]
 * @prop {import('@alanizcreative/static-site-formation/lib/render/RenderTypes').RenderServerlessData} [serverlessData]
 */
export interface PostsProps {
  args: {
    contentType?: string
    display?: number
    headingLevel?: string
    pagination?: boolean
    filters?: string[]
    linkContentType?: string
    nothingFoundText?: boolean
    order?: string
    termId?: string
  }
  pageData: Item
  pageContains: string[]
  serverlessData?: RenderServerlessData
}

/**
 * @typedef {Object.<string, string|number>} PostsQueryArgs
 * @prop {string} content_type
 * @prop {number} include
 */
export interface PostsQueryArgs {
  content_type: string
  include: number
  [key: string]: string | number
}
