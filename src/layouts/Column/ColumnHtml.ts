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
    grow = false,
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
  const jst = isStringStrict(justify)
  const aln = isStringStrict(align)

  /* Classes */

  const classesArr: string[] = []

  if (isStringStrict(classes)) {
    classesArr.push(classes)
  }

  /* Width */

  if (width === '') {
    width = '1-1'
  }

  /* Flex */

  if (ord !== '' || jst || aln || grow) {
    classesArr.push('l-flex l-flex-column')
  }

  /* Grow */

  if (grow) {
    classesArr.push('l-flex-grow-1')
  }

  /* Order */

  if (ord !== '') {
    classesArr.push(`l-order-${ord}`)
  }

  /* Output */

  args.tag = tag
  args.width = isStringStrict(width) ? `l-wd-${width}` : ''
  args.widthSmall = isStringStrict(widthSmall) ? `l-wd-${widthSmall}-s` : ''
  args.widthMedium = isStringStrict(widthMedium) ? `l-wd-${widthMedium}-m` : ''
  args.widthLarge = isStringStrict(widthLarge) ? `l-wd-${widthLarge}-l` : ''
  args.justify = jst ? `l-justify-${justify}` : ''
  args.align = aln ? `l-align-${align}` : ''
  args.classes = classesArr.join(' ')

  return props
}

/* Exports */

export { ColumnHtml }
