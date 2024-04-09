/**
 * Objects - Asset Html Types
 */

/* Imports */

import type { PropFile } from '@alanizcreative/static-site-formation/iop/utils/getProp/getPropTypes'
import type { ParentArgs } from '@alanizcreative/static-site-formation/iop/global/globalTypes'

/**
 * @typedef {object} AssetProps
 * @prop {import('@alanizcreative/static-site-formation/iop/utils/getProp/getPropTypes').PropFile.fields} args
 * @prop {import('@alanizcreative/static-site-formation/iop/global/globalTypes').ParentArgs[]} [parents]
 */
export interface AssetProps {
  args: PropFile['fields']
  parents?: ParentArgs[]
}
