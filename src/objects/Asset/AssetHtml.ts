/**
 * Objects - Asset Html
 */

/* Imports */

import type { PropFile } from '@alanizcreative/static-site-formation/lib/utils/getProp/getPropTypes'
import type { ParentArgs } from '@alanizcreative/static-site-formation/lib/global/globalTypes'
import { ImageHtml } from '../Image/ImageHtml'

/**
 * Function - output asset (image, video or audio)
 */

interface AssetProps {
  args: PropFile['fields']
  parents?: ParentArgs[]
}

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
