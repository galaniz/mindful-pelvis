/**
 * Objects - Image Html
 */

/* Imports */

import type { ImageProps } from './ImageHtmlTypes'
import {
  getImage,
  isString,
  addScriptStyle,
  isStringStrict,
  isObjectStrict,
  isArrayStrict
} from '@alanizcreative/static-site-formation/lib/utils/utilsMin'
// import { RichText } from '@alanizcreative/static-site-formation/lib/text/RichText/RichText'
import { configHtmlVars } from '../../config/configHtml'

/**
 * Function - output image
 *
 * @param {import('./ImageHtmlTypes').ImageProps} props
 * @return {Promise<string>}
 */
const ImageHtml = async (props: ImageProps): Promise<string> => {
  /* Props and args must be object */

  if (!isObjectStrict(props)) {
    return ''
  }

  const { args, parents } = props

  if (!isObjectStrict(args)) {
    return ''
  }

  /* Args */

  let {
    image,
    aspectRatio = '1:1',
    width = 'Default',
    borderRadius = 'None',
    color = 'Default',
    invert = false,
    classes = '',
    source = 'cms'
    // caption
  } = args

  /* Check card parent */

  let card = false
  let parentType = ''

  if (isArrayStrict(parents)) {
    parentType = parents[0].renderType
  }

  if (parentType === 'card') {
    card = true
  }

  /* Normalize options */

  aspectRatio = configHtmlVars.options.aspectRatio[aspectRatio]
  width = configHtmlVars.options.width[width]
  color = configHtmlVars.options.color[color]
  borderRadius = configHtmlVars.options.borderRadius[borderRadius]

  const hasColor = isStringStrict(color)
  const hasAspectRatio = isStringStrict(aspectRatio)

  /* Add styles */

  if (hasColor) {
    addScriptStyle({
      dir: 'objects/Image',
      style: 'ImageColor'
    })
  }

  if (invert) {
    addScriptStyle({
      dir: 'objects/Image',
      style: 'ImageInvert'
    })
  }

  /* Image */

  let imageOutput = ''

  if (image !== undefined) {
    const imageClasses = ['l-absolute l-top-0 l-left-0 l-wd-100-pc l-ht-100-pc l-object-cover']

    const imageRes = getImage({
      data: image,
      classes: imageClasses.join(' '),
      returnDetails: true,
      picture: true,
      maxWidth: card ? 600 : 1200,
      source
    })

    let imageResAspectRatio = 0
    let imageResSrc = ''
    let imageResOutput = ''

    if (isString(imageRes)) {
      imageResOutput = imageRes
    } else {
      imageResAspectRatio = imageRes.aspectRatio
      imageResSrc = imageRes.src
      imageResOutput = imageRes.output
    }

    let pictureClasses = 'l-relative l-block l-overflow-hidden'

    if (hasAspectRatio) {
      pictureClasses += ` l-ar-${aspectRatio}`
    }

    if (isStringStrict(width)) {
      pictureClasses += ` l-wd-${width}`
    }

    if (isStringStrict(borderRadius)) {
      pictureClasses += ` b-radius-${borderRadius}`
    }

    if (isStringStrict(classes)) {
      pictureClasses += ` ${classes}`
    }

    if (invert) {
      pictureClasses += ' o-image-invert'
    }

    const style: string[] = []

    if (hasColor) {
      pictureClasses += ' l-before o-image-color'

      style.push(`--img-url:url(${imageResSrc})`)
    }

    if (!hasAspectRatio && imageResAspectRatio !== 0) {
      style.push(`padding-top:${imageResAspectRatio * 100}%`)
    }

    if (imageResOutput !== '') {
      imageOutput = `
        <picture class="${pictureClasses}"${style.length > 0 ? ` style="${style.join(';')}"` : ''}>
          ${imageResOutput}
        </picture>
      `
    }
  }

  /* Figure caption */

  /*
  if (caption !== undefined) {
    const { content } = caption

    const captionContent = await RichText({
      args: {
        type: 'paragraph',
        content: content[0].content,
        textStyle: 'Small',
        classes: 'l-pt-3xs'
      }
    })

    if (captionContent !== '') {
      imageOutput = `
        <figure>
          ${imageOutput}
          <figcaption data-rich>${captionContent}</figcaption>
        </figure>
      `
    }
  }
  */

  /* Output */

  return imageOutput
}

/* Exports */

export { ImageHtml }
