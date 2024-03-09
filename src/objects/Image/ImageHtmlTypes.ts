/**
 * Objects - Image Html Types
 */

/* Imports */

import type { InternalLink } from '../../global/globalHtmlTypes'
import type { ParentArgs } from '@alanizcreative/static-site-formation/iop/global/globalTypes'
import type { PropFile, PropType } from '@alanizcreative/static-site-formation/iop/utils/getProp/getPropTypes'

/**
 * @typedef {object} ImageProps
 * @prop {object} args
 * @prop {import('@alanizcreative/static-site-formation/iop/utils/getProp/getPropTypes').PropFile} [args.image]
 * @prop {string} [args.aspectRatio]
 * @prop {string} [args.width]
 * @prop {string} [args.borderRadius]
 * @prop {string} [args.color]
 * @prop {string} [args.classes]
 * @prop {boolean} [args.invert]
 * @prop {import('../../global/globalHtmlTypes').InternalLink} [args.caption]
 * @prop {string} [args.source]
 * @prop {boolean} [args.lazy]
 * @prop {number} [args.maxWidth]
 * @prop {import('@alanizcreative/static-site-formation/iop/global/globalTypes').ParentArgs[]} [parents]
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
    lazy?: boolean
    maxWidth?: number
  }
  parents?: ParentArgs[]
}

/**
 * @typedef {
 * import('@alanizcreative/static-site-formation/iop/utils/getProp/getPropTypes').PropFile|
 * import('@alanizcreative/static-site-formation/iop/utils/getProp/getPropTypes').PropType|
 * ImageProps['args']
 * } ImageMinimalData
 */
export type ImageMinimalData = PropFile & ImageProps['args'] & PropType

/**
 * @typedef {object} ImageMinimalArgs
 * @prop {ImageMinimalData} [image]
 * @prop {import('@alanizcreative/static-site-formation/iop/global/globalTypes').ParentArgs[]} [parents]
 * @prop {string} [classes]
 * @prop {string} [assetClasses]
 * @prop {string} [imageClasses]
 * @prop {string} [containerClasses]
 * @prop {string} [assetContainerClasses]
 * @prop {string} [imageContainerClasses]
 * @prop {string} [background]
 * @prop {boolean} [includeTheme=false]
 */
export interface ImageMinimalArgs {
  image?: ImageMinimalData
  parents?: ParentArgs[]
  classes?: string
  assetClasses?: string
  imageClasses?: string
  containerClasses?: string
  assetContainerClasses?: string
  imageContainerClasses?: string
  background?: string
  includeTheme?: boolean
}

/**
 * @typedef {object} ImageMinimalReturn
 * @prop {string} color
 * @prop {string} background
 * @prop {string} output
 * @prop {string} type
 */
export interface ImageMinimalReturn {
  color: string
  background: string
  output: string
  type: string
}

/**
 * @typedef {function} ImageMinimal
 * @param {ImageMinimalArgs} args
 * @return {Promise<ImageMinimalReturn>}
 */
export type ImageMinimal = (args: ImageMinimalArgs) => Promise<ImageMinimalReturn>
