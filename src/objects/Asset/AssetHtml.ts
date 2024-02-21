/**
 * Objects - Asset Html
 */

/* Imports */

import type { AssetProps } from './AssetHtmlTypes'
import { ImageHtml } from '../Image/ImageHtml'

/**
 * Function - output asset (image, video or audio)
 *
 * @param {AssetProps} props
 * @return {Promise<string>}
 */
const AssetHtml = async (props: AssetProps = { args: {}, parents: [] }): Promise<string> => {
  const { args = {} } = props

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
