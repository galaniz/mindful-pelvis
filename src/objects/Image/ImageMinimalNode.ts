/**
 * Objects - Image Minimal Node
 */

/* Imports */

import type { ImageMinimal, ImageProps } from './ImageNodeTypes'
import { isNumber, isObjectStrict, isStringStrict } from '@alanizcreative/static-site-formation/iop/utils/utils'
import { configNodeVars } from '../../config/configNode'
import { ImageNode } from './ImageNode'

/**
 * Function - output minimal image
 *
 * @type {import('../Image/ImageNodeTypes').ImageMinimal}
 */
const ImageMinimalNode: ImageMinimal = async (args) => {
  /* Args must be object */

  if (!isObjectStrict(args)) {
    return ''
  }

  /* Args */

  const {
    image,
    classes,
    imageClasses,
    assetClasses,
    containerClasses,
    imageContainerClasses,
    assetContainerClasses,
    includeTheme = false,
    parents,
    maxWidth
  } = args

  let {
    background
  } = args

  /* Image required */

  if (image === undefined) {
    return ''
  }

  /* Type required */

  const imageType = image.renderType

  if (imageType === '') {
    return ''
  }

  /* Classes */

  const innerClasses: string[] = []
  const outerClasses: string[] = []

  if (isStringStrict(classes)) {
    innerClasses.push(classes)
  }

  if (isStringStrict(containerClasses)) {
    outerClasses.push(containerClasses)
  }

  /* Color */

  let color = ''

  /* Props */

  const props: ImageProps = {
    args: {},
    parents
  }

  /* Asset type props */

  if (imageType === 'asset') {
    props.args = {
      image,
      width: '90px'
    }

    if (isStringStrict(assetClasses)) {
      innerClasses.push(assetClasses)
    }

    if (isStringStrict(assetContainerClasses)) {
      outerClasses.push(assetContainerClasses)
    }
  }

  /* Image type props */

  if (imageType === 'image') {
    if (isStringStrict(imageClasses)) {
      innerClasses.push(imageClasses)
    }

    if (isStringStrict(imageContainerClasses)) {
      outerClasses.push(imageContainerClasses)
    }

    const imageColor = image.color

    if (isStringStrict(imageColor)) {
      color = imageColor

      background = `${color} Light`
    }

    props.args = image
  }

  /* Invert */

  if (isStringStrict(background)) {
    props.args.invert = !background.includes('Light')
  }

  /* Classes */

  if (innerClasses.length > 0) {
    props.args.classes = innerClasses.join(' ')
  }

  /* Max width */

  if (isNumber(maxWidth)) {
    props.args.maxWidth = maxWidth
  }

  /* Output */

  let output = await ImageNode(props)

  if (output !== '' && (outerClasses.length > 0 || includeTheme)) {
    const colorVar = configNodeVars.options.color[color]
    const themeStyle = isStringStrict(colorVar) ? ` style="--theme:var(--${colorVar})"` : ''
    const divClasses = outerClasses.join(' ')

    output = `<div${divClasses !== '' ? ` class="${divClasses}"` : ''}${themeStyle}>${output}</div>`
  }

  return output
}

/* Exports */

export { ImageMinimalNode }
