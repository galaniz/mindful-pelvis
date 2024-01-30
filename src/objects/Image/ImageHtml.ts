/**
 * Objects - Image Html
 */

/* Imports */

import type { InternalLink } from '../../global/globalHtmlTypes'
import type { ParentArgs } from '@alanizcreative/static-site-formation/lib/global/globalTypes'
import type { PropFile } from '@alanizcreative/static-site-formation/lib/utils/getProp/getPropTypes'
import { getImage } from '@alanizcreative/static-site-formation/lib/utils'
// import { RichText } from '@alanizcreative/static-site-formation/lib/text/RichText/RichText'
import { configHtmlVars } from '../../config/configHtml'

/**
 * Function - output image
 *
 * @param {object} props
 * @param {object} props.args
 * @param {object} props.args.image
 * @param {string} props.args.aspectRatio
 * @param {string} props.args.borderRadius
 * @param {object} props.args.caption
 * @param {object[]} props.parents
 * @return {string} HTML - div
 */

interface ImageProps {
  args: {
    image?: PropFile
    aspectRatio?: string
    borderRadius?: string
    caption?: InternalLink
  }
  parents?: ParentArgs[]
}

const ImageHtml = async (props: ImageProps = { args: {}, parents: [] }): Promise<string> => {
  const { args = {}, parents = [] } = props

  let {
    image,
    aspectRatio = '1:1',
    borderRadius = 'None'
    // caption
  } = args

  /* Check card parent */

  let card = false

  const parentType = parents[0] !== undefined ? parents[0].renderType : ''

  if (parentType === 'card') {
    card = true
  }

  /* Normalize options */

  aspectRatio = configHtmlVars.options.aspectRatio[aspectRatio]
  borderRadius = configHtmlVars.options.borderRadius[borderRadius]

  /* Image */

  let imageOutput = ''

  if (image !== undefined) {
    const imageClasses = ['l-absolute l-top-0 l-left-0 l-width-100-pc l-height-100-pc l-object-cover']

    if (card) {
      imageClasses.push('e-transition l-object-left-top')
    }

    const imageObj = getImage({
      data: image,
      classes: imageClasses.join(' '),
      returnAspectRatio: true,
      source: true,
      maxWidth: card ? 200 : 1200
    })

    let imageObjAspectRatio = 0
    let imageObjOutput = ''

    if (typeof imageObj === 'string') {
      imageObjOutput = imageObj
    } else {
      imageObjAspectRatio = imageObj.aspectRatio
      imageObjOutput = imageObj.output
    }

    let classes = 'l-relative l-block l-overflow-hidden'

    if (aspectRatio !== '') {
      classes += ` l-aspect-ratio-${aspectRatio}`
    }

    if (card) {
      classes += ' l-after'
    }

    if (borderRadius !== '') {
      classes += ` b-radius-${borderRadius}`
    }

    const attr: string[] = []

    if (aspectRatio === '' && imageObjAspectRatio !== 0) {
      attr.push(`style="padding-top:${imageObjAspectRatio * 100}%"`)
    }

    if (imageObjOutput !== '') {
      imageOutput = `
        <picture class="${classes}"${attr.length > 0 ? attr.join(' ') : ''}>
          ${imageObjOutput}
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
        classes: 'l-padding-top-3xs'
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
