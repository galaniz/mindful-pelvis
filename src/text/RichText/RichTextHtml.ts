/**
 * Text - Rich Text Html
 */

/* Imports */

import type { RichTextHtmlFilters } from './RichTextHtmlTypes'
import type { ContentProps } from '../../objects/Content/ContentHtmlTypes'
import type { CardProps } from '../../objects/Cards/CardsHtmlTypes'
import { getLink, addScriptStyle } from '@alanizcreative/static-site-formation/iop/utils/utils'
import { configHtmlVars } from '../../config/configHtml'

/**
 * Callbacks for rich text filters
 *
 * @type {import('./RichTextHtmlTypes').RichTextHtmlFilters}
 */
const RichTextHtml: RichTextHtmlFilters = {
  /* Props */

  props: async (props) => {
    const { args, parents = [] } = props

    let {
      type = 'paragraph',
      classes = ''
    } = args

    /* Classes */

    const classesArr: string[] = []

    /* Content ascendant */

    const parent = parents[0] !== undefined ? parents[0].renderType : ''
    const heading = type.includes('heading')

    if (parent === 'content') {
      const contentArgs: ContentProps['args'] = parents[0].args

      let {
        textStyle = 'Default',
        headingStyle = 'Default',
        richTextStyles = true
      } = contentArgs

      textStyle = configHtmlVars.options.content.text[textStyle]
      headingStyle = configHtmlVars.options.content.heading[headingStyle]

      if (textStyle !== '' && !heading) {
        classesArr.push(textStyle)
      }

      if (headingStyle !== '' && heading) {
        classesArr.push(`t-${headingStyle}`)
      }

      if (richTextStyles) {
        addScriptStyle({
          dir: 'text/RichText',
          style: 'RichText'
        })
      } else {
        args.dataAttr = false
      }
    }

    /* Card ascendant */

    const grandParent = parents[1] !== undefined ? parents[1].renderType : ''

    if (grandParent === 'card' && heading) {
      classesArr.push('t-link-current t-break')
    }

    /* Output */

    if (classesArr.length > 0) {
      classes += `${classes !== '' ? ' ' : ''}${classesArr.join(' ')}`
    }

    args.classes = classes

    return props
  },

  /* Output */

  output: async (output, props) => {
    const { args } = props
    const { type = '' } = args

    if (type === 'table') {
      addScriptStyle({
        dir: 'text/RichTable',
        style: 'RichTable'
      })

      addScriptStyle({
        dir: 'objects/Overflow',
        style: 'Overflow',
        script: 'OverflowInit'
      })

      output = `
        <div class="l-overflow-hidden">
          <div class="l-overflow-x-auto l-wd-full t-rich-table o-overflow">
            ${output}
          </div>
        </div>
      `
    }

    return output
  },

  /* Content */

  content: async (output, contentProps) => {
    const { props } = contentProps
    const { args, parents = [] } = props
    const { type = 'paragraph' } = args

    /* Card ascendant */

    const grandParent = parents[1] !== undefined ? parents[1].renderType : ''

    if (output !== '' && grandParent === 'card' && type.includes('heading')) {
      const cardArgs: CardProps['args'] = parents[1].args

      const {
        internalLink,
        externalLink = '',
        embed = false
      } = cardArgs

      if (!embed) {
        const cardLink = getLink(internalLink, externalLink)

        output = `
          <a class="l-before" href="${cardLink}">
            ${output}
          </a>
        `
      }
    }

    /* Output */

    return output
  }
}

/* Exports */

export { RichTextHtml }
