/**
 * Objects - Asset Html
 */

/* Imports */

import type { AssetProps } from './AssetHtmlTypes'
import { isObjectStrict } from '@alanizcreative/static-site-formation/iop/utils/utils'
import { ImageHtml } from '../Image/ImageHtml'

/**
 * Function - output asset (image, video or audio)
 *
 * @param {AssetProps} props
 * @return {Promise<string>}
 */
const AssetHtml = async (props: AssetProps): Promise<string> => {
  /* Props must be object */

  if (!isObjectStrict(props)) {
    return ''
  }

  const { args } = props

  /* Output */

  return await ImageHtml({
    args: {
      aspectRatio: 'None',
      image: {
        fields: args
      }
    }
  })
}

/* Exports */

export { AssetHtml }
