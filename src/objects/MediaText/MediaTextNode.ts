/**
 * Objects - Media Text Node
 */

/* Imports */

import type { MediaTextArgs, MediaTextProps } from './MediaTextNodeTypes'
import type { RenderItem } from '@alanizcreative/static-site-formation/iop/render/renderTypes'
import { renderInlineContent } from '@alanizcreative/static-site-formation/iop/render/renderInline'
import {
  isObjectStrict,
  isStringStrict,
  getExcerpt,
  isObject
} from '@alanizcreative/static-site-formation/iop/utils/utils'
import { ImageMinimalNode } from '../Image/ImageMinimalNode'

/**
 * Function - output post with media text layout
 *
 * @private
 * @param {import('./MediaTextNodeTypes').MediaTextArgs} args
 * @return {Promise<string>}
 */
const _MediaText = async ({ item, headingLevel, contentType }: MediaTextArgs): Promise<string> => {
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

  /* Color */

  const color =
    isStringStrict(heroImageMinimal?.color) && heroImageMinimal.renderType === 'image' ? heroImageMinimal.color : 'Blue'

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

  if (isObject(content)) {
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

  textContent.push({
    renderType: 'button',
    title: `${title} ${contentType}`,
    internalLink: item,
    type: 'Secondary',
    paddingTop: '10px',
    color
  })

  /* Output */

  return await renderInlineContent([
    {
      renderType: 'container',
      layout: 'Row',
      tag: 'List Item',
      gap: '30px',
      gapLarge: '60px',
      align: 'Center',
      content: [
        {
          renderType: 'column',
          width: '3/4',
          widthSmall: '2/5',
          widthMedium: '1/3',
          content: [
            {
              renderType: 'fragment',
              content: await ImageMinimalNode({
                image: heroImageMinimal,
                containerClasses: 'l-wd-full l-z-index--1',
                maxWidth: 700
              })
            }
          ]
        },
        {
          renderType: 'column',
          widthMedium: '2/3',
          content: [
            {
              renderType: 'content',
              gap: '20px',
              richTextStyles: 'None',
              textStyle: 'Text Medium',
              content: textContent
            }
          ]
        }
      ]
    }
  ])
}

/**
 * Output single media text item and container
 *
 * @type {import('./CardsNodeTypes').MediaTextProps}
 */
const MediaTextNode: MediaTextProps = {
  async render (content) {
    return `
      <ul class="l-flex l-col l-gap-xl l-gap-2xl-l t-ls-none t-deco-none" role="list">
        ${content}
      </ul>
    `
  },
  async renderItem (args) {
    return await _MediaText(args)
  }
}

/* Exports */

export { MediaTextNode }
