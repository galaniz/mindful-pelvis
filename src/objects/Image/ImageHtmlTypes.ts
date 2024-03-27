/**
 * Objects - Image Html Types
 */

/* Imports */

import type { ParentArgs } from '@alanizcreative/static-site-formation/iop/global/globalTypes'
import type { RenderFile, RenderRichText } from '@alanizcreative/static-site-formation/iop/render/renderTypes'

/**
 * @typedef {object} ImageProps
 * @prop {object} args
 * @prop {import('@alanizcreative/static-site-formation/iop/render/renderTypes').RenderFile} [args.image]
 * @prop {string} [args.aspectRatio]
 * @prop {string} [args.width]
 * @prop {string} [args.borderRadius]
 * @prop {string} [args.color]
 * @prop {string} [args.classes]
 * @prop {boolean} [args.invert]
 * @prop {import('@alanizcreative/static-site-formation/iop/render/renderTypes').RenderRichText[]} [args.caption]
 * @prop {string} [args.source]
 * @prop {boolean} [args.lazy]
 * @prop {number} [args.maxWidth]
 * @prop {import('@alanizcreative/static-site-formation/iop/global/globalTypes').ParentArgs[]} [parents]
 */
export interface ImageProps {
  args: {
    image?: RenderFile
    aspectRatio?: string
    width?: string
    borderRadius?: string
    color?: string
    classes?: string
    invert?: boolean
    caption?: RenderRichText[]
    source?: string
    lazy?: boolean
    maxWidth?: number
  }
  parents?: ParentArgs[]
}

/**
 * @typedef {
 * import('@alanizcreative/static-site-formation/iop/render/renderTypes').RenderFile|
 * ImageProps['args']
 * } ImageMinimalData
 */
export type ImageMinimalData = RenderFile & ImageProps['args'] & { renderType: string }

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
 * @typedef {function} ImageMinimal
 * @param {ImageMinimalArgs} args
 * @return {Promise<string>}
 */
export type ImageMinimal = (args: ImageMinimalArgs) => Promise<string>
