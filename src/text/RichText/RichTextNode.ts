/**
 * Text - Rich Text Node
 */

/* Imports */

/* Imports */

import type {
  RichTextContentItemFilter,
  RichTextContentFilter,
  RichTextOutputFilter,
  RichTextPropsFilter
} from '@alanizcreative/static-site-formation/iop/text/RichText/RichTextTypes'
import type { ContentProps } from '../Content/ContentNodeTypes'
import type { CardProps } from '../../objects/Cards/CardsNodeTypes'
import { getLink, addScriptStyle, isHeading } from '@alanizcreative/static-site-formation/iop/utils/utils'
import { configNodeVars } from '../../config/configNode'
import { QuoteMarkSvgNode } from '../../svg/QuoteMark/QuoteMarkNode'

/**
 * Function - callback to filter formation rich text props
 *
 * @type {RichTextPropsFilter}
 */
const RichTextNode: RichTextPropsFilter = async (props) => {
  const { args, parents = [] } = props

  let {
    tag = '',
    classes = ''
  } = args

  /* Classes */

  const classesArr: string[] = []

  /* Content ascendant */

  const parent = parents[0] !== undefined ? parents[0].renderType : ''
  const isSectionHeading = isHeading(tag)

  if (parent === 'content') {
    const contentArgs: ContentProps['args'] = parents[0].args

    let {
      textStyle = 'Default',
      headingStyle = 'Default',
      richTextStyles = 'Full'
    } = contentArgs

    textStyle = configNodeVars.options.textStyle[textStyle]
    headingStyle = configNodeVars.options.headingStyle[headingStyle]
    richTextStyles = configNodeVars.options.richTextStyles[richTextStyles]

    if (textStyle !== '' && !isSectionHeading) {
      classesArr.push(textStyle)
    }

    if (headingStyle !== '' && isSectionHeading) {
      classesArr.push(headingStyle)
    }

    const isRichTextFull = richTextStyles === 'full'
    const isRichTextLinks = richTextStyles === 'links'

    args.dataAttr = isRichTextFull

    if (isRichTextLinks) {
      args.dataAttr = ['a']
    }

    if (isRichTextFull) {
      addScriptStyle({
        dir: 'text/RichText',
        style: 'RichText'
      })
    }
  }

  /* Card ascendant */

  const grandParent = parents[1] !== undefined ? parents[1].renderType : ''

  if (grandParent === 'card' && isSectionHeading) {
    classesArr.push('t-link-current t-break')
  }

  /* Table */

  if (tag === 'table') {
    args.dataAttr = false
  }

  /* Quote */

  if (tag === 'blockquote') {
    classesArr.push('l-flex l-col l-row-m l-gap-3xs')
  }

  /* Output */

  if (classesArr.length > 0) {
    classes += `${classes !== '' ? ' ' : ''}${classesArr.join(' ')}`
  }

  args.classes = classes

  return props
}

/**
 * Function - callback to filter formation rich text output
 *
 * @type {RichTextOutputFilter}
 */
const RichTextOutputNode: RichTextOutputFilter = async (output, filterArgs) => {
  const { props, element } = filterArgs
  const { args } = props
  const { tag = '' } = args

  if (tag === 'table') {
    addScriptStyle({
      dir: 'text/RichTable',
      style: 'RichTable'
    })

    output = `
      <div class="l-overflow-hidden">
        <div class="l-overflow-x-auto l-wd-full t-rich-table o-overflow">
          ${output}
        </div>
      </div>
    `
  }

  if (tag === 'blockquote') {
    const { opening, content, closing } = element

    output = `${opening}${QuoteMarkSvgNode('l-wd-s l-ht-xs l-shrink-0 t-secondary-base')}${content}${closing}`
  }

  return output
}

/**
 * Function - callback to filter formation rich text content item
 *
 * @type {RichTextOutputFilter}
 */
const RichTextContentItemNode: RichTextContentItemFilter = async (item) => {
  const { tag } = item

  if (tag === 'th') {
    item.attr = 'scope="col"'
  }

  return item
}

/**
 * Function - callback to filter formation rich text content
 *
 * @type {RichTextOutputFilter}
 */
const RichTextContentNode: RichTextContentFilter = async (output, filterArgs) => {
  const { props } = filterArgs
  const { args, parents = [] } = props
  const { tag = '' } = args

  /* Card ascendant */

  const grandParent = parents[1] !== undefined ? parents[1].renderType : ''
  const isSectionHeading = isHeading(tag)

  if (output !== '' && grandParent === 'card' && isSectionHeading) {
    const cardArgs: CardProps['args'] = parents[1].args

    const {
      internalLink,
      externalLink = '',
      embed = false
    } = cardArgs

    const cardLink = getLink(internalLink, externalLink)

    if (!embed && cardLink !== '') {
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

/* Exports */

export {
  RichTextNode,
  RichTextOutputNode,
  RichTextContentItemNode,
  RichTextContentNode
}
