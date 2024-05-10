/**
 * Objects - Image Node Types
 */

/* Imports */

import type { ParentArgs } from '@alanizcreative/static-site-formation/iop/global/globalTypes'
import type {
  RenderFunctionArgs,
  RenderFile,
  RenderRichText
} from '@alanizcreative/static-site-formation/iop/render/renderTypes'

/**
 * @typedef ImageProps
 * @type {import('@alanizcreative/static-site-formation/iop/render/renderTypes').RenderFunctionArgs}
 * @prop {object} args
 * @prop {import('@alanizcreative/static-site-formation/iop/render/renderTypes').RenderFile} [args.image]
 * @prop {string} [args.aspectRatio]
 * @prop {string} [args.width]
 * @prop {string} [args.height]
 * @prop {string} [args.borderRadius]
 * @prop {string} [args.color]
 * @prop {string} [args.classes]
 * @prop {boolean} [args.invert]
 * @prop {import('@alanizcreative/static-site-formation/iop/render/renderTypes').RenderRichText[]} [args.caption]
 * @prop {string} [args.source]
 * @prop {boolean} [args.lazy]
 * @prop {number} [args.maxWidth]
 */
export interface ImageProps extends Partial<RenderFunctionArgs> {
  args: {
    image?: RenderFile
    aspectRatio?: string
    width?: string
    height?: string
    borderRadius?: string
    color?: string
    classes?: string
    invert?: boolean
    caption?: RenderRichText[]
    source?: string
    lazy?: boolean
    maxWidth?: number
  }
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
