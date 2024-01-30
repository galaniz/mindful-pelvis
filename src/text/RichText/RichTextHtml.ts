/**
 * Text - rich text html
 */

/* Imports */

import type { InternalLink } from '../../global/globalHtmlTypes'
import type { RichTextContentFilter, RichTextOutputFilter, RichTextPropsFilter } from '@alanizcreative/static-site-formation/lib/text/RichText/RichTextTypes'
import { getLink, addScriptStyle } from '@alanizcreative/static-site-formation/lib/utils'
import { configHtmlVars } from '../../config/configHtml'

interface RichTextHtmlFilters {
  props: RichTextPropsFilter
  output: RichTextOutputFilter
  content: RichTextContentFilter
}

interface CardArgs {
  gap?: string
  gapLarge?: string
  internalLink?: InternalLink
  externalLink?: string
  embed?: boolean
  embedTitle?: string
  embedText?: string
  background?: string
}

interface ContentArgs {
  align?: string
  gap?: string
  gapLarge?: string
  textStyle?: string
  headingStyle?: string
  richTextStyles?: boolean
  classes?: string
}

/**
 * Callbacks for rich text filters
 *
 * @type {RichTextHtmlFilters}
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

    const classesArray: string[] = []

    /* Content ascendant */

    const parent = parents[0] !== undefined ? parents[0].renderType : ''

    if (parent === 'content') {
      const contentArgs: ContentArgs = parents[0].args
      const heading = type.includes('heading')

      let {
        textStyle = 'Default',
        headingStyle = 'Default'
      } = contentArgs

      textStyle = configHtmlVars.options.content.text[textStyle]
      headingStyle = configHtmlVars.options.content.heading[headingStyle]

      if (textStyle !== '' && !heading) {
        classesArray.push(`t-${textStyle}`)
      }

      if (headingStyle !== '' && heading) {
        classesArray.push(`t-${headingStyle}`)
      }
    }

    /* Card ascendant */

    const grandParent = parents[1] !== undefined ? parents[1].renderType : ''

    if (grandParent === 'card' && type === 'paragraph') {
      classesArray.push('t-link-current')
    }

    /* Add styles */

    addScriptStyle({
      dir: 'text/RichText',
      style: 'RichText'
    })

    /* Output */

    if (classesArray.length > 0) {
      classes += `${classes !== '' ? ' ' : ''}${classesArray.join(' ')}`
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
          <div class="l-overflow-x-auto l-width-100-pc t-rich-table o-overflow">
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
      const cardArgs: CardArgs = parents[1].args

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
