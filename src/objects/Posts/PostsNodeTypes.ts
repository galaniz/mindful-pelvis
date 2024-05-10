/**
 * Objects - Posts Node Types
 */

/* Imports */

import type { Item } from '../../global/globalNodeTypes'
import type { RenderFunctionArgs } from '@alanizcreative/static-site-formation/iop/render/renderTypes'

/**
 * @typedef PostsProps
 * @type {import('@alanizcreative/static-site-formation/iop/render/renderTypes').RenderFunctionArgs}
 * @prop {object} args
 * @prop {string} [args.contentType]
 * @prop {number} [args.display]
 * @prop {string} [args.headingLevel]
 * @prop {boolean} [args.pagination]
 * @prop {string} [args.order]
 * @prop {string[]} [args.filters]
 * @prop {string} [args.termId]
 * @prop {import('../../global/globalNodeTypes').Item} [pageData]
 */
export interface PostsProps extends Partial<RenderFunctionArgs> {
  args: {
    contentType?: string
    display?: number
    headingLevel?: string
    pagination?: boolean
    order?: string
    filters?: string[]
    termId?: string
  }
  pageData?: Item
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
