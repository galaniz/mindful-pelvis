/**
 * Objects - Asset Html Types
 */

/* Imports */

import type { RenderFile } from '@alanizcreative/static-site-formation/iop/render/renderTypes'
import type { ParentArgs } from '@alanizcreative/static-site-formation/iop/global/globalTypes'

/**
 * @typedef {object} AssetProps
 * @prop {import('@alanizcreative/static-site-formation/iop/render/renderTypes').RenderFile} args
 * @prop {import('@alanizcreative/static-site-formation/iop/global/globalTypes').ParentArgs[]} [parents]
 */
export interface AssetProps {
  args: RenderFile
  parents?: ParentArgs[]
}
