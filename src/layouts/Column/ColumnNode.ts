/**
 * Layouts - Column Node
 */

/* Imports */

import type { ColumnPropsFilter } from '@alanizcreative/static-site-formation/iop/layouts/Column/ColumnTypes'
import { isObjectStrict, isStringStrict } from '@alanizcreative/static-site-formation/iop/utils/utils'
import { configNodeVars } from '../../config/configNode'

/**
 * Function - callback to filter formation column props
 *
 * @type {ColumnPropsFilter}
 */
const ColumnNode: ColumnPropsFilter = async (props) => {
  const { args } = props // Skip check as filter always passes object

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

  tag = configNodeVars.options.tag[tag]
  width = configNodeVars.options.dimension[width]
  widthSmall = configNodeVars.options.dimension[widthSmall]
  widthMedium = configNodeVars.options.dimension[widthMedium]
  widthLarge = configNodeVars.options.dimension[widthLarge]
  justify = configNodeVars.options.justify[justify]
  align = configNodeVars.options.align[align]

  const ord = isStringStrict(order) ? configNodeVars.options.order[order] : ''
  const jst = isStringStrict(justify)
  const aln = isStringStrict(align)

  /* Classes */

  const classesArr: string[] = []

  if (isStringStrict(classes)) {
    classesArr.push(classes)
  }

  /* Width */

  if (width === '') {
    width = '12'
  }

  /* Flex */

  if (ord !== '' || jst || aln || grow) {
    classesArr.push('l-flex l-col')
  }

  /* Grow */

  if (grow) {
    classesArr.push('l-grow-1')
  }

  /* Order */

  if (ord !== '') {
    classesArr.push(`l-order-${ord}`)
  }

  /* Output */

  args.tag = tag
  args.width = isStringStrict(width) ? `l-col-${width}` : ''
  args.widthSmall = isStringStrict(widthSmall) ? `l-col-${widthSmall}-s` : ''
  args.widthMedium = isStringStrict(widthMedium) ? `l-col-${widthMedium}-m` : ''
  args.widthLarge = isStringStrict(widthLarge) ? `l-col-${widthLarge}-l` : ''
  args.justify = jst ? `l-justify-${justify}` : ''
  args.align = aln ? `l-align-${align}` : ''
  args.classes = classesArr.join(' ')

  return props
}

/* Exports */

export { ColumnNode }
