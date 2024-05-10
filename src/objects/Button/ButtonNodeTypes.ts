/**
 * Objects - Button Node Types
 */

/* Imports */

import type { InternalLink } from '@alanizcreative/static-site-formation/iop/global/globalTypes'
import type { RenderFunctionArgs } from '@alanizcreative/static-site-formation/iop/render/renderTypes'
import type { Item } from '../../global/globalNodeTypes'

/**
 * @typedef ButtonProps
 * @type {import('@alanizcreative/static-site-formation/iop/render/renderTypes').RenderFunctionArgs}
 * @prop {object} args
 * @prop {string} [args.title]
 * @prop {string} [args.link]
 * @prop {import('@alanizcreative/static-site-formation/iop/global/globalTypes').InternalLink} [args.internalLink]
 * @prop {string} [args.externalLink]
 * @prop {string} [args.type]
 * @prop {string} [args.size]
 * @prop {string} [args.justify]
 * @prop {string} [args.paddingTop]
 * @prop {string} [args.paddingBottom]
 * @prop {string} [args.theme]
 * @prop {import('../../global/globalNodeTypes').Item} [pageData]
 */
export interface ButtonProps extends Partial<RenderFunctionArgs> {
  args: {
    title?: string
    link?: string
    internalLink?: InternalLink
    externalLink?: string
    type?: string
    size?: string
    justify?: string
    paddingTop?: string
    paddingBottom?: string
    color?: string
  }
  pageData?: Item
}
