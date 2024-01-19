/**
 * Text - rich text html
 */

/* Imports */

import { getLink, addScriptStyle } from '@alanizcreative/static-site-formation/lib/utils'
import { configHtml } from '../../config/configHtml'

/**
 * Callbacks for rich text filters
 *
 * @type {object}
 * @see {@link https://github.com/galaniz/static-site-formation|Formation Rich Text}
 */

const RichTextHtml: { props: Function, output: Function, content: Function } = {
  /* Props */

  props (props: FRM.RichTextProps): FRM.RichTextProps {
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
      const contentArgs: MP.ContentArgs = parents[0].args
      const heading = type.includes('heading')

      let {
        textStyle = 'Default',
        headingStyle = 'Default'
      } = contentArgs

      textStyle = configHtml.vars.options.content.text[textStyle]
      headingStyle = configHtml.vars.options.content.heading[headingStyle]

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

  output (output: string, props: FRM.RichTextProps): string {
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

  content (output: string, contentProps: FRM.RichTextContentFilterArgs): string {
    const { props } = contentProps
    const { args, parents = [] } = props
    const { type = 'paragraph' } = args

    /* Card ascendant */

    const grandParent = parents[1] !== undefined ? parents[1].renderType : ''

    if (output !== '' && grandParent === 'card' && type.includes('heading')) {
      const cardArgs: MP.CardArgs = parents[1].args

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
