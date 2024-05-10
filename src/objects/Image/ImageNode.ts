/**
 * Objects - Image Node
 */

/* Imports */

import type { ImageProps } from './ImageNodeTypes'
import {
  getImage,
  isString,
  addScriptStyle,
  isStringStrict,
  isObjectStrict,
  isArrayStrict,
  isNumber
} from '@alanizcreative/static-site-formation/iop/utils/utils'
import { RichText } from '@alanizcreative/static-site-formation/iop/text/RichText/RichText'
import { configNodeVars } from '../../config/configNode'

/**
 * Function - output image
 *
 * @param {import('./ImageNodeTypes').ImageProps} props
 * @return {Promise<string>}
 */
const ImageNode = async (props: ImageProps): Promise<string> => {
  /* Props and args must be object */

  if (!isObjectStrict(props)) {
    return ''
  }

  const { args } = props

  if (!isObjectStrict(args)) {
    return ''
  }

  /* Args */

  let {
    image,
    aspectRatio = '1:1',
    width = 'Default',
    height = 'Default',
    borderRadius = 'None',
    color = 'Default',
    invert = false,
    classes = '',
    source = 'cms',
    lazy = true,
    maxWidth,
    caption
  } = args

  /* Normalize options */

  aspectRatio = configNodeVars.options.aspectRatio[aspectRatio]
  width = configNodeVars.options.dimension[width]
  height = configNodeVars.options.dimension[height]
  color = configNodeVars.options.color[color]
  borderRadius = configNodeVars.options.borderRadius[borderRadius]

  const hasColor = isStringStrict(color)
  const width2x = configNodeVars.options.dimension2x[width]

  /* Image */

  let imageOutput = ''

  if (image !== undefined) {
    const imageClasses = ['l-absolute l-top-0 l-left-0 l-wd-full l-ht-full l-object-cover']

    let imageMaxWidth = maxWidth

    if (imageMaxWidth === undefined) {
      imageMaxWidth = 1600
    }

    if (isNumber(width2x)) {
      imageMaxWidth = width2x
    }

    const imageRes = getImage({
      data: image,
      classes: imageClasses.join(' '),
      returnDetails: true,
      picture: true,
      maxWidth: imageMaxWidth,
      source,
      lazy
    })

    let imageResAspectRatio = 0
    let imageResOutput = ''

    if (isString(imageRes)) {
      imageResOutput = imageRes
    } else {
      imageResAspectRatio = imageRes.aspectRatio
      imageResOutput = imageRes.output
    }

    let pictureClasses = `l-relative l-block l-overflow-hidden l-ar-${aspectRatio}`

    if (isStringStrict(width)) {
      pictureClasses += ` l-wd-${width}`
    }

    if (isStringStrict(height)) {
      pictureClasses += height === 'strip' ? ' l-ht-3xl l-ht-4xl-s' : ` l-ht-${height}`
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
      pictureClasses += ' l-after o-image-color'
    }

    if (imageResAspectRatio !== 0) {
      style.push(`--aspect-ratio-padding:${imageResAspectRatio * 100}%`)
    }

    if (imageResOutput !== '') {
      imageOutput = `
        <picture class="${pictureClasses}"${style.length > 0 ? ` style="${style.join(';')}"` : ''}>
          ${imageResOutput}
        </picture>
      `
    }
  }

  /* Output early */

  if (imageOutput === '') {
    return ''
  }

  /* Add styles */

  if (hasColor) {
    addScriptStyle({
      dir: 'objects/Image',
      style: 'ImageColor',
      script: 'ImageColorBrowser'
    })
  }

  if (invert) {
    addScriptStyle({
      dir: 'objects/Image',
      style: 'ImageInvert'
    })
  }

  /* Figure caption */

  if (isArrayStrict(caption)) {
    const captionContent = await RichText({
      args: {
        tag: '',
        content: caption
      }
    })

    if (isStringStrict(captionContent)) {
      imageOutput = `
        <figure>
          ${imageOutput}
          <figcaption data-rich="figcaption" class="l-mt-3xs l-mt-2xs-m">
            ${captionContent}
          </figcaption>
        </figure>
      `
    }
  }

  /* Output */

  return imageOutput
}

/* Exports */

export { ImageNode }
