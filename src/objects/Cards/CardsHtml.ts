/**
 * Objects - Cards Html
 */

/* Imports */

import type { CardArgs, CardProps, CardsProps, CardReturn } from './CardsHtmlTypes'
import type { RenderItem } from '@alanizcreative/static-site-formation/iop/render/renderTypes'
import { renderInlineContent } from '@alanizcreative/static-site-formation/iop/render/renderInline'
import {
  isObjectStrict,
  isStringStrict,
  getExcerpt,
  isObject
} from '@alanizcreative/static-site-formation/iop/utils/utils'
import { configHtmlVars } from '../../config/configHtml'
import { ImageMinimalHtml } from '../Image/ImageMinimalHtml'

/**
 * Function - output post with card layout
 *
 * @private
 * @param {import('./CardsHtmlTypes').CardArgs} args
 * @return {Promise<string>}
 */
const _Card = async ({
  item,
  headingLevel,
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
          internalLink: item as any,
          content: [
            {
              renderType: 'content',
              gap: '15px',
              richTextStyles: false,
              headingStyle: 'Heading Three',
              textStyle: 'Extra Small',
              classes: 't-sharp',
              content: textContent
            },
            {
              renderType: 'fragment',
              content: await ImageMinimalHtml({
                image: heroImageMinimal,
                containerClasses: 'l-wd-full l-z-index--1 l-mt-auto',
                imageContainerClasses: 'l-mw-4xl l-mr-auto l-ml-auto',
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
 * @param {import('./CardsHtmlTypes').CardProps} props
 * @return {Promise<import('./CardsHtmlTypes').CardReturn>}
 */
const CardHtml = async (props: CardProps): Promise<CardReturn> => {
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

  const { args } = props

  let {
    gap = 'None',
    gapLarge = 'None',
    background = 'None',
    internalLink = undefined,
    externalLink = ''
  } = isObjectStrict(args) ? args : {}

  /* Normalize options */

  const shade = configHtmlVars.shades[background]

  gap = configHtmlVars.options.gap[gap]
  gapLarge = configHtmlVars.options.gap[gapLarge]
  background = configHtmlVars.options.color[background]

  /* Attributes */

  let attr = ''

  /* Classes */

  let classes = 'l-relative l-z-index-1 l-flex l-col l-grow-1'

  if (internalLink !== undefined || externalLink !== '') {
    classes += ' e-trans e-shift-up'
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
    start: `<div class="${classes}"${attr}>`,
    end: '</div>'
  }
}

/**
 * Output single card and cards container
 *
 * @type {import('./CardsHtmlTypes').CardsProps}
 */
const CardsHtml: CardsProps = {
  async render (content) {
    return `
      <ul class="l-flex l-wrap l-gap-xs l-gap-s-l t-ls-none" role="list">
        ${content}
      </ul>
    `
  },
  async renderCard (args) {
    return await _Card(args)
  }
}

/* Exports */

export { CardHtml, CardsHtml }
