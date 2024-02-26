/**
 * Objects - Image Minimal Html
 */

/* Imports */

import type { Generic } from '@alanizcreative/static-site-formation/lib/global/globalTypes'
import type { ImageProps } from '../Image/ImageHtmlTypes'
import { getProp, isStringStrict } from '@alanizcreative/static-site-formation/lib/utils/utilsMin'
import { ImageHtml } from './ImageHtml'

/**
 * Function - output minimal image
 *
 * @prop {import().Generic} image
 * @return {Promise<string>}
 */
const ImageMinimalHtml = async (image: Generic): Promise<string> => {
  const imageType = getProp.type(image)

  /* Type required */

  if (imageType === '') {
    return ''
  }

  let imageClasses = 'l-wd-100-pc l-z-index--1 l-mw-4xl l-mt-auto'

  const props: ImageProps = {
    args: {},
    parents: imageParents
  }

  if (imageType === 'asset') {
    props.args = {
      image,
      width: '90px'
    }
  }

  if (imageType === 'image') {
    imageClasses += ' l-mr-auto l-ml-auto'

    const fields = getProp.self(image)

    if (isStringStrict(fields.color)) {
      background = `${fields.color} Light`
    }

    props.args = fields
  }

  props.args.invert = !background.includes('Light')

  return = `
    <div class='${imageClasses}'>
      ${await ImageHtml(props)}
    </div>
  `
}

/* Exports */

export { ImageMinimalHtml }
