/**
 * Objects - Cards Node
 */

/* Imports */

import type { CardArgs, CardProps, CardsProps, CardReturn } from './CardsNodeTypes'
import type { RenderItem } from '@alanizcreative/static-site-formation/iop/render/renderTypes'
import { renderInlineContent } from '@alanizcreative/static-site-formation/iop/render/renderInline'
import {
  isObjectStrict,
  isStringStrict,
  isArrayStrict,
  getExcerpt,
  isObject,
  getLink
} from '@alanizcreative/static-site-formation/iop/utils/utils'
import { configNodeVars } from '../../config/configNode'
import { ImageMinimalNode } from '../Image/ImageMinimalNode'

/**
 * Function - output post with card layout
 *
 * @private
 * @param {import('./CardsNodeTypes').CardArgs} args
 * @return {Promise<string>}
 */
const _Card = async ({
  item,
  headingLevel = 'h3',
  showExcerpt = false,
  background = 'Navy Light',
  columns = 3
}: CardArgs): Promise<string> => {
  /* Item must be object */

  if (!isObjectStrict(item)) {
    return ''
  }

  /* Props */

  const {
    title = '',
    excerpt = '',
    content,
    heroImageMinimal
  } = item

  /* Title required */

  if (!isStringStrict(title)) {
    return ''
  }

  /* Background */

  const imageColor =
    isStringStrict(heroImageMinimal?.color) && heroImageMinimal.renderType === 'image' ? heroImageMinimal.color : ''

  if (imageColor !== '') {
    background = `${imageColor} Light`
  }

  /* Text content */

  const textContent: RenderItem[] = [
    {
      renderType: 'richText',
      tag: headingLevel,
      content: [
        {
          content: title
        }
      ]
    }
  ]

  if (showExcerpt && isObject(content)) {
    textContent.push({
      renderType: 'richText',
      tag: 'p',
      content: getExcerpt({
        excerpt,
        content,
        limitExcerpt: true
      })
    })
  }

  /* Output */

  return await renderInlineContent([
    {
      renderType: 'column',
      tag: 'List Item',
      widthSmall: '1/2',
      widthMedium: '1/3',
      widthLarge: `1/${columns}`,
      classes: 'l-flex',
      content: [
        {
          renderType: 'card',
          gap: '45px',
          background,
          internalLink: item,
          content: [
            {
              renderType: 'content',
              gap: '15px',
              richTextStyles: 'None',
              headingStyle: 'Heading Three',
              textStyle: 'Text Extra Small',
              classes: 't-sharp',
              content: textContent
            },
            {
              renderType: 'fragment',
              content: await ImageMinimalNode({
                image: heroImageMinimal,
                containerClasses: 'l-wd-full l-z-index--1 l-mt-auto',
                imageContainerClasses: 'l-mw-5xl l-mr-auto l-ml-auto',
                maxWidth: 600,
                background
              })
            }
          ]
        }
      ]
    }
  ])
}

/**
 * Function - output card container
 *
 * @param {import('./CardsNodeTypes').CardProps} props
 * @return {Promise<import('./CardsNodeTypes').CardReturn>}
 */
const CardNode = async (props: CardProps): Promise<CardReturn> => {
  /* Fallback output */

  const fallback = {
    start: '',
    end: ''
  }

  /* Props must be object */

  if (!isObjectStrict(props)) {
    return fallback
  }

  /* Args */

  const { args, children } = props

  let {
    gap = 'None',
    gapLarge = 'None',
    background = 'None',
    internalLink = undefined,
    externalLink = ''
  } = isObjectStrict(args) ? args : {}

  /* Normalize options */

  const shade = configNodeVars.shades[background]

  gap = configNodeVars.options.gap[gap]
  gapLarge = configNodeVars.options.gap[gapLarge]
  background = configNodeVars.options.color[background]

  /* Link exists */

  const isExternal = externalLink !== ''
  const isLink = internalLink !== undefined || isExternal

  /* Link (if image only child) */

  let isImageLink = false
  let linkStart = ''
  let linkEnd = ''

  if (isArrayStrict(children) && children.length === 1) {
    const childRenderType = children[0].renderType

    if (childRenderType === 'image' && isLink) {
      isImageLink = true
      linkStart = `<a href="${getLink(internalLink, externalLink)}"${isExternal ? ' rel="noreferrer"' : ''}>`
      linkEnd = '</a>'
    }
  }

  /* Attributes */

  let attr = ''

  /* Classes */

  let classes = 'l-relative l-z-index-1 l-flex l-col l-grow-1'

  if (isLink) {
    classes += ` e-trans ${isImageLink ? 'e-fade' : 'e-shift-up'}`
  }

  /* Gap */

  if (isStringStrict(gap)) {
    classes += ` l-gap-${gap}`
  }

  if (isStringStrict(gapLarge) && gapLarge !== gap) {
    classes += ` l-gap-${gapLarge}-l`
  }

  /* Background */

  if (isStringStrict(background)) {
    const isLight = isStringStrict(shade)

    classes += ` bg-${background} l-px-xs l-py-s l-px-s-l`

    if (isLight) {
      classes += ' b-bottom b-theme b-wd-thick'
      attr = ` style="--theme:var(--${shade})"`
    } else {
      classes += ' t-light'
    }
  }

  /* Output */

  return {
    start: `<div class="${classes}"${attr}>${linkStart}`,
    end: `${linkEnd}</div>`
  }
}

/**
 * Output single card and cards container
 *
 * @type {import('./CardsNodeTypes').CardsProps}
 */
const CardsNode: CardsProps = {
  async render (content) {
    return `
      <ul class="l-flex l-wrap l-gap-xs l-gap-s-l t-ls-none t-deco-none" role="list">
        ${content}
      </ul>
    `
  },
  async renderCard (args) {
    return await _Card(args)
  }
}

/* Exports */

export { CardNode, CardsNode }
