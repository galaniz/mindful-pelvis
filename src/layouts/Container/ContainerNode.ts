/**
 * Layouts - Container Node
 */

/* Imports */

import type { ContainerPropsFilter } from '@alanizcreative/static-site-formation/iop/layouts/Container/ContainerTypes'
import { isObjectStrict, isArrayStrict, isStringStrict } from '@alanizcreative/static-site-formation/iop/utils/utils'
import { configNodeVars } from '../../config/configNode'

/**
 * Function - callback to filter formation container props
 *
 * @type {ContainerPropsFilter}
 */
const ContainerNode: ContainerPropsFilter = async (props) => {
  /* Props */

  let {
    args,
    parents
  } = props // Skip check as filter always passes object

  /* Args */

  args = isObjectStrict(args) ? { ...args } : {}

  let {
    tag = 'Div',
    layout = 'Column',
    maxWidth = 'None',
    paddingTop = 'None',
    paddingTopLarge = 'None',
    paddingBottom = 'None',
    paddingBottomLarge = 'None',
    gap = 'None',
    gapLarge = 'None',
    justify = 'None',
    align = 'None',
    classes = '',
    attr = '',
    nest = false
  } = args

  /* Normalize options */

  tag = configNodeVars.options.tag[tag]
  layout = configNodeVars.options.layout[layout]
  maxWidth = configNodeVars.options.maxWidth[maxWidth]
  paddingTop = configNodeVars.options.padding[paddingTop]
  paddingTopLarge = configNodeVars.options.padding[paddingTopLarge]
  paddingBottom = configNodeVars.options.padding[paddingBottom]
  paddingBottomLarge = configNodeVars.options.padding[paddingBottomLarge]
  gap = configNodeVars.options.gap[gap]
  gapLarge = configNodeVars.options.gap[gapLarge]
  justify = configNodeVars.options.justify[justify]
  align = configNodeVars.options.align[align]

  /* Nest */

  if (isArrayStrict(parents)) {
    const parentType = parents[0].renderType

    nest = parentType === 'container' || parentType === 'contentTemplate'
  }

  /* Classes */

  const classesArr: string[] = []

  /* Attributes */

  const attrs: string[] = []

  /* List check */

  if (tag === 'ul' || tag === 'ol') {
    classesArr.push('t-ls-none')
    attrs.push('role="list"')
  }

  /* Layout */

  let layoutClasses = ''

  if (layout === 'column') {
    layoutClasses = 'l-flex l-col'
  }

  if (layout === 'row') {
    layoutClasses = 'l-flex l-wrap'
  }

  /* Gap */

  let gapClasses = ''

  if (isStringStrict(gap)) {
    gapClasses = `l-gap-${gap}`
  }

  let gapLargeClasses = ''

  if (isStringStrict(gapLarge) && gapLarge !== gap) {
    gapLargeClasses = layout === 'row' ? `l-gap-${gapLarge}-l` : `l-gap-${gapLarge}-m`
  }

  /* Output */

  if (classesArr.length > 0) {
    classes += `${isStringStrict(classes) ? ' ' : ''}${classesArr.join(' ')}`
  }

  if (attrs.length > 0) {
    attr += `${isStringStrict(attr) ? ' ' : ''}${attrs.join(' ')}`
  }

  args.tag = tag
  args.layout = layoutClasses
  args.maxWidth = isStringStrict(maxWidth) ? `l-${maxWidth}` : ''
  args.paddingTop = isStringStrict(paddingTop) ? `l-pt-${paddingTop}` : ''
  args.paddingTopLarge = isStringStrict(paddingTopLarge) ? `l-pt-${paddingTopLarge}-m` : ''
  args.paddingBottom = isStringStrict(paddingBottom) ? `l-pb-${paddingBottom}` : ''
  args.paddingBottomLarge = isStringStrict(paddingBottomLarge) ? `l-pb-${paddingBottomLarge}-m` : ''
  args.gap = gapClasses
  args.gapLarge = gapLargeClasses
  args.justify = isStringStrict(justify) ? `l-justify-${justify}` : ''
  args.align = isStringStrict(align) ? `l-align-${align}` : ''
  args.classes = classes
  args.attr = attr
  args.nest = nest

  props.args = args

  return props
}

/* Exports */

export { ContainerNode }
