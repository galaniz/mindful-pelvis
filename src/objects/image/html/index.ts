/**
 * Objects - image html
 */

/* Imports */

import getProp from '@alanizcreative/static-site-formation/lib/utils/get-prop'
import getImage from '@alanizcreative/static-site-formation/lib/utils/get-image'
import richText from '@alanizcreative/static-site-formation/lib/text/rich-text'
import config from '../../../config/html'

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
    image?: object
    aspectRatio?: string
    borderRadius?: string
    caption?: MP.InternalLink
  }
  parents?: FRM.ParentArgs[]
}

const image = async (props: ImageProps = { args: {}, parents: [] }): Promise<string> => {
  const { args = {}, parents = [] } = props

  let {
    image,
    aspectRatio = '1:1',
    borderRadius = 'None',
    caption
  } = args

  /* Check card parent */

  let card = false

  const parentType = parents[0] !== undefined ? parents[0].renderType : ''

  if (parentType === 'card') {
    card = true
  }

  /* Normalize options */

  aspectRatio = config.vars.options.aspectRatio[aspectRatio]
  borderRadius = config.vars.options.borderRadius[borderRadius]

  /* Image */

  let imageOutput = ''

  if (image !== undefined) {
    const imageClasses = ['l-absolute l-top-0 l-left-0 l-width-100-pc l-height-100-pc l-object-cover']

    if (card) {
      imageClasses.push('e-transition l-object-left-top')
    }

    const imageObj = getImage({
      data: getProp(image),
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

  if (caption !== undefined) {
    const { content } = caption

    const captionContent = await richText({
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

  /* Output */

  return imageOutput
}

/* Exports */

export default image
