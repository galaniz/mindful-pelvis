/**
 * Objects - Button Html Types
 */

/* Imports */

import type { InternalLink } from '../../global/globalHtmlTypes'

/**
 * @typedef {object} ButtonProps
 * @prop {object} args
 * @prop {string} [args.title]
 * @prop {string} [args.link]
 * @prop {import('../../global/globalHtmlTypes').InternalLink} [args.internalLink]
 * @prop {string} [args.externalLink]
 * @prop {string} [args.type]
 * @prop {string} [args.size]
 * @prop {string} [args.justify]
 * @prop {string} [args.paddingTop]
 * @prop {string} [args.paddingBottom]
 * @prop {string} [args.theme]
 */
export interface ButtonProps {
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
    theme?: string
  }
}
