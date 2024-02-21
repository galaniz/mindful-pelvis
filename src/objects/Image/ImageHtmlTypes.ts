/**
 * Objects - Image Html Types
 */

/* Imports */

import type { InternalLink } from '../../global/globalHtmlTypes'
import type { ParentArgs } from '@alanizcreative/static-site-formation/lib/global/globalTypes'
import type { PropFile } from '@alanizcreative/static-site-formation/lib/utils/getProp/getPropTypes'

/**
 * @typedef {object} ImageProps
 * @prop {object} args
 * @prop {import('@alanizcreative/static-site-formation/lib/utils/getProp/getPropTypes').PropFile} [args.image]
 * @prop {string} [args.aspectRatio]
 * @prop {string} [args.width]
 * @prop {string} [args.borderRadius]
 * @prop {string} [args.color]
 * @prop {string} [args.classes]
 * @prop {boolean} [args.invert]
 * @prop {import('../../global/globalHtmlTypes').InternalLink} [args.caption]
 * @prop {string} [args.source]
 * @prop {import('@alanizcreative/static-site-formation/lib/global/globalTypes').ParentArgs[]} [parents]
 */
export interface ImageProps {
  args: {
    image?: PropFile
    aspectRatio?: string
    width?: string
    borderRadius?: string
    color?: string
    classes?: string
    invert?: boolean
    caption?: InternalLink
    source?: string
  }
  parents?: ParentArgs[]
}
