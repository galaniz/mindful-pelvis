/**
 * Objects - Cards Html
 */

/* Imports */

import type { CardArgs, CardProps, CardsProps, CardReturn } from './CardsHtmlTypes'
import type { Item } from '../../global/globalHtmlTypes'
import type { ImageProps } from '../Image/ImageHtmlTypes'
import { Container } from '@alanizcreative/static-site-formation/lib/layouts/Container/Container'
import { Column } from '@alanizcreative/static-site-formation/lib/layouts/Column/Column'
import { RichText } from '@alanizcreative/static-site-formation/lib/text/RichText/RichText'
import {
  getProp,
  isObjectStrict,
  isStringStrict,
  getExcerpt
} from '@alanizcreative/static-site-formation/lib/utils/utilsMin'
import { configHtmlVars } from '../../config/configHtml'
import { ContentHtml } from '../Content/ContentHtml'
import { ImageHtml } from '../Image/ImageHtml'

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
  const fields: Item = getProp.self(item)

  if (!isObjectStrict(fields)) {
    return ''
  }

  const {
    title = '',
    excerpt = '',
    content,
    heroImageMinimal
  } = fields

  /* Title required */

  if (!isStringStrict(title)) {
    return ''
  }

  /* Content args */

  const contentArgs = {
    gap: '15px',
    richTextStyles: false,
    headingStyle: 'Heading Three',
    textStyle: 'Extra Small',
    classes: 't-sharp'
  }

  /* Parents */

  const contentParent = {
    renderType: 'content',
    args: contentArgs
  }

  const cardParent = {
    renderType: 'card',
    args: {
      internalLink: item
    }
  }

  const contentParents = [
    contentParent,
    cardParent
  ]

  const imageParents = [
    cardParent
  ]

  /* Image output */

  let imageOutput = ''

  if (heroImageMinimal !== undefined) {
    const imageType = getProp.type(heroImageMinimal)

    let imageClasses = 'l-wd-100-pc l-z-index--1 l-mw-4xl l-mt-auto'

    const props: ImageProps = {
      args: {},
      parents: imageParents
    }

    if (imageType === 'asset') {
      props.args = {
        image: heroImageMinimal,
        width: '90px'
      }
    }

    if (imageType === 'image') {
      imageClasses += ' l-mr-auto l-ml-auto'

      const fields = getProp.self(heroImageMinimal)

      if (isStringStrict(fields.color)) {
        background = `${fields.color} Light`
      }

      props.args = fields
    }

    props.args.invert = !background.includes('Light')

    imageOutput = `
      <div class="${imageClasses}">
        ${await ImageHtml(props)}
      </div>
    `
  }

  /* Text output */

  const headingOutput = await RichText({
    args: {
      type: headingLevel,
      content: [
        {
          nodeType: 'text',
          value: title
        }
      ]
    },
    parents: contentParents
  })

  let textOutput = ''

  if (showExcerpt) {
    textOutput = await RichText({
      args: {
        type: 'paragraph',
        content: [
          {
            nodeType: 'text',
            value: getExcerpt({
              excerpt,
              content,
              limitExcerpt: true
            })
          }
        ]
      },
      parents: contentParents
    })
  }

  /* Containers */

  const containers = {
    column: await Column({
      args: {
        tag: 'List Item',
        widthSmall: '1/2',
        widthMedium: '1/3',
        widthLarge: `1/${columns}`,
        classes: 'l-flex'
      }
    }),
    card: await CardHtml({
      args: {
        gap: '45px',
        background
      }
    }),
    content: await ContentHtml({
      args: contentArgs
    })
  }

  /* Output */

  return (
    containers.column.start +
    containers.card.start +
    containers.content.start +
    headingOutput +
    textOutput +
    containers.content.end +
    imageOutput +
    containers.card.end +
    containers.column.end
  )
}

/**
 * Function - output card container
 *
 * @param {import('./CardsHtmlTypes').CardProps} props
 * @return {Promise<import('./CardsHtmlTypes').CardReturn>}
 */
const CardHtml = async (props: CardProps = { args: {} }): Promise<CardReturn> => {
  /* Fallback output */

  const fallback = {
    start: '',
    end: ''
  }

  /* Props must be object */

  if (!isObjectStrict(props)) {
    return fallback
  }

  /* Inner props */

  let { args } = props

  args = isObjectStrict(args) ? args : {}

  let {
    gap = 'None',
    gapLarge = 'None',
    background = 'None'
  } = args

  /* Normalize options */

  const shade = configHtmlVars.shades[background]

  gap = configHtmlVars.options.gap[gap]
  gapLarge = configHtmlVars.options.gap[gapLarge]
  background = configHtmlVars.options.color[background]

  /* Attributes */

  let attr = ''

  /* Classes */

  let classes = 'l-relative l-z-index-1 l-flex l-flex-column l-flex-grow-1 e-transition e-shift-up'

  /* Gap */

  if (isStringStrict(gap)) {
    classes += ` l-mb-${gap}-all`
  }

  if (isStringStrict(gapLarge) && gapLarge !== gap) {
    classes += ` l-mb-${gapLarge}-all-l`
  }

  /* Background */

  if (isStringStrict(background)) {
    const isLight = isStringStrict(shade)

    classes += ` bg-${background} l-px-xs l-py-s l-px-s-l`

    if (isLight) {
      classes += ' b-bottom b-theme b-width-thick'
      attr = ` style="--theme:var(--${shade})"`
    } else {
      classes += ' t-light'
    }
  }

  /* Embed */

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
    const cardsContainer = await Container({
      args: {
        tag: 'Unordered List',
        layout: 'Row',
        gap: '30px',
        gapLarge: '45px'
      }
    })

    return (
      cardsContainer.start +
      content +
      cardsContainer.end
    )
  },
  async renderCard (args) {
    return await _Card(args)
  }
}

/* Exports */

export { CardHtml, CardsHtml }
