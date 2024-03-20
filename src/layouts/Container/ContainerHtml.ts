/**
 * Layouts - Container Html
 */

/* Imports */

import type { ContainerPropsFilter } from '@alanizcreative/static-site-formation/iop/layouts/Container/ContainerTypes'
import { isObjectStrict, isArrayStrict, isStringStrict } from '@alanizcreative/static-site-formation/iop/utils/utils'
import { configHtmlVars } from '../../config/configHtml'

/**
 * Function - callback to filter formation container
 *
 * @type {ContainerPropsFilter}
 */
const ContainerHtml: ContainerPropsFilter = async (props) => {
  const {
    args,
    parents
  } = props // Skip check as filter always passes object

  /* Args */

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
  } = isObjectStrict(args) ? args : {}

  /* Normalize options */

  tag = configHtmlVars.options.tag[tag]
  layout = configHtmlVars.options.layout[layout]
  maxWidth = configHtmlVars.options.maxWidth[maxWidth]
  paddingTop = configHtmlVars.options.padding[paddingTop]
  paddingTopLarge = configHtmlVars.options.padding[paddingTopLarge]
  paddingBottom = configHtmlVars.options.padding[paddingBottom]
  paddingBottomLarge = configHtmlVars.options.padding[paddingBottomLarge]
  gap = configHtmlVars.options.gap[gap]
  gapLarge = configHtmlVars.options.gap[gapLarge]
  justify = configHtmlVars.options.justify[justify]
  align = configHtmlVars.options.align[align]

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

  if (layout === 'column' && (isStringStrict(justify) || isStringStrict(align))) {
    layoutClasses = 'l-flex l-flex-col'
  }

  if (layout === 'row') {
    layoutClasses = 'l-flex l-flex-wrap'
  }

  /* Gap */

  let gapClasses = ''

  if (isStringStrict(gap)) {
    gapClasses = layout === 'row' ? `l-gm-${gap}` : `l-mb-${gap}-all`
  }

  let gapLargeClasses = ''

  if (isStringStrict(gapLarge) && gapLarge !== gap) {
    gapLargeClasses = layout === 'row' ? `l-gm-${gapLarge}-l` : `l-mb-${gapLarge}-all-m`
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

  return props
}

/* Exports */

export { ContainerHtml }
