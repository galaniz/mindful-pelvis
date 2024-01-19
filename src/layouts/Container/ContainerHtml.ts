/**
 * Layouts - container html
 */

/* Imports */

import { configHtml } from '../../config/configHtml'

/**
 * Function - callback to filter formation container
 *
 * @see {@link https://github.com/galaniz/static-site-formation|Formation Container}
 */

const ContainerHtml = (props: FRM.ContainerProps): FRM.ContainerProps => {
  const { args } = props

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
    attr = ''
  } = args

  /* Normalize options */

  tag = configHtml.vars.options.tag[tag]
  layout = configHtml.vars.options.layout[layout]
  maxWidth = configHtml.vars.options.maxWidth[maxWidth]
  paddingTop = configHtml.vars.options.padding[paddingTop]
  paddingTopLarge = configHtml.vars.options.padding[paddingTopLarge]
  paddingBottom = configHtml.vars.options.padding[paddingBottom]
  paddingBottomLarge = configHtml.vars.options.padding[paddingBottomLarge]
  gap = configHtml.vars.options.gap[gap]
  gapLarge = configHtml.vars.options.gap[gapLarge]
  justify = configHtml.vars.options.justify[justify]
  align = configHtml.vars.options.align[align]

  /* Classes */

  const classesArray: string[] = []

  /* Attributes */

  const attrs: string[] = []

  /* List check */

  if (tag === 'ul' || tag === 'ol') {
    classesArray.push('t-list-style-none')
    attrs.push('role="list"')
  }

  /* Layout */

  let layoutClasses = ''

  if (layout === 'column' && (justify !== '' || align !== '')) {
    layoutClasses = 'l-flex l-flex-column'
  }

  if (layout === 'row') {
    layoutClasses = 'l-flex l-flex-wrap'
  }

  /* Gap */

  let gapClasses = ''

  if (gap !== '') {
    gapClasses = layout === 'row' ? `l-gap-margin-${gap}` : `l-margin-bottom-${gap}-all`
  }

  let gapLargeClasses = ''

  if (gapLarge !== '' && gapLarge !== gap) {
    gapLargeClasses = layout === 'row' ? `l-gap-margin-${gapLarge}-l` : `l-margin-bottom-${gapLarge}-all-m`
  }

  /* Output */

  if (classesArray.length > 0) {
    classes += `${classes !== '' ? ' ' : ''}${classesArray.join(' ')}`
  }

  if (attrs.length > 0) {
    attr += `${attr !== '' ? ' ' : ''}${attrs.join(' ')}`
  }

  args.tag = tag
  args.layout = layoutClasses
  args.maxWidth = maxWidth !== '' ? `l-${maxWidth}` : ''
  args.paddingTop = paddingTop !== '' ? `l-padding-top-${paddingTop}` : ''
  args.paddingTopLarge = paddingTopLarge !== '' ? `l-padding-top-${paddingTopLarge}-m` : ''
  args.paddingBottom = paddingBottom !== '' ? `l-padding-bottom-${paddingBottom}` : ''
  args.paddingBottomLarge = paddingBottomLarge !== '' ? `l-padding-bottom-${paddingBottomLarge}-m` : ''
  args.gap = gapClasses
  args.gapLarge = gapLargeClasses
  args.justify = justify !== '' ? `l-justify-${justify}` : ''
  args.align = align !== '' ? `l-align-${align}` : ''
  args.classes = classes
  args.attr = attr

  return props
}

/* Exports */

export { ContainerHtml }
