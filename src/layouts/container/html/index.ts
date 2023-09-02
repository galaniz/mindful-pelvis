/**
 * Layouts - container html
 */

/* Imports */

import config from '../../../config/html'

/**
 * Function - callback to filter formation container
 *
 * @see {@link https://github.com/galaniz/static-site-formation|Formation Container}
 */

const container = (props: FRM.ContainerProps): FRM.ContainerProps => {
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

  tag = config.vars.options.tag[tag]
  layout = config.vars.options.layout[layout]
  maxWidth = config.vars.options.maxWidth[maxWidth]
  paddingTop = config.vars.options.padding[paddingTop]
  paddingTopLarge = config.vars.options.padding[paddingTopLarge]
  paddingBottom = config.vars.options.padding[paddingBottom]
  paddingBottomLarge = config.vars.options.padding[paddingBottomLarge]
  gap = config.vars.options.gap[gap]
  gapLarge = config.vars.options.gap[gapLarge]
  justify = config.vars.options.justify[justify]
  align = config.vars.options.align[align]

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

export default container
