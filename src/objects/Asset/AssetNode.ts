/**
 * Objects - Asset Node
 */

/* Imports */

import type { AssetProps } from './AssetNodeTypes'
import { isObjectStrict } from '@alanizcreative/static-site-formation/iop/utils/utils'
import { ImageNode } from '../Image/ImageNode'

/**
 * Function - output asset (image, video or audio)
 *
 * @param {AssetProps} props
 * @return {Promise<string>}
 */
const AssetNode = async (props: AssetProps): Promise<string> => {
  /* Props must be object */

  if (!isObjectStrict(props)) {
    return ''
  }

  const { args } = props

  /* Output */

  return await ImageNode({
    args: {
      aspectRatio: 'None',
      image: args
    }
  })
}

/* Exports */

export { AssetNode }
