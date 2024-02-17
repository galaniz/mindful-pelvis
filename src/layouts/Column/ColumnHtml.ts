/**
 * Layouts - Column Html
 */

/* Imports */

import type { ColumnPropsFilter } from '@alanizcreative/static-site-formation/lib/layouts/column/ColumnTypes'
import { isObjectStrict, isStringStrict } from '@alanizcreative/static-site-formation/lib/utils/utilsMin'
import { configHtmlVars } from '../../config/configHtml'

/**
 * Function - callback to filter formation column
 *
 * @type {ColumnPropsFilter}
 */
const ColumnHtml: ColumnPropsFilter = async (props) => {
  const { args } = props

  let {
    tag = 'Div',
    width = 'None',
    widthSmall = 'None',
    widthMedium = 'None',
    widthLarge = 'None',
    justify = 'None',
    align = 'None',
    order = 'Default',
    classes = ''
  } = isObjectStrict(args) ? args : {}

  /* Normalize options */

  tag = configHtmlVars.options.tag[tag]
  width = configHtmlVars.options.width[width]
  widthSmall = configHtmlVars.options.width[widthSmall]
  widthMedium = configHtmlVars.options.width[widthMedium]
  widthLarge = configHtmlVars.options.width[widthLarge]
  justify = configHtmlVars.options.justify[justify]
  align = configHtmlVars.options.align[align]

  const ord = isStringStrict(order) ? configHtmlVars.options.order[order] : ''

  /* Width */

  if (width === '') {
    width = '1-1'
  }

  /* Order */

  if (ord !== '') {
    classes += `${isStringStrict(classes) ? ' ' : ''}l-order-${ord}`
  }

  /* Output */

  args.tag = tag
  args.width = isStringStrict(width) ? `l-width-${width}` : ''
  args.widthSmall = isStringStrict(widthSmall) ? `l-width-${widthSmall}-s` : ''
  args.widthMedium = isStringStrict(widthMedium) ? `l-width-${widthMedium}-m` : ''
  args.widthLarge = isStringStrict(widthLarge) ? `l-width-${widthLarge}-l` : ''
  args.justify = isStringStrict(justify) ? `l-justify-${justify}` : ''
  args.align = isStringStrict(align) ? `l-align-${align}` : ''
  args.classes = classes

  return props
}

/* Exports */

export { ColumnHtml }
