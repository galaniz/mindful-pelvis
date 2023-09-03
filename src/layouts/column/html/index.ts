/**
 * Layouts - column html
 */

/* Imports */

import config from '../../../config/html'

/**
 * Function - callback to filter formation column
 *
 * @see {@link https://github.com/galaniz/static-site-formation|Formation Column}
 */

const column = (props: FRM.ColumnProps): FRM.ColumnProps => {
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
  } = args

  /* Normalize options */

  tag = config.vars.options.tag[tag]
  width = config.vars.options.width[width]
  widthSmall = config.vars.options.width[widthSmall]
  widthMedium = config.vars.options.width[widthMedium]
  widthLarge = config.vars.options.width[widthLarge]
  justify = config.vars.options.justify[justify]
  align = config.vars.options.align[align]
  order = config.vars.options.order[order]

  /* Width */

  if (width === '') {
    width = '1-1'
  }

  /* Order */

  if (order !== '') {
    classes += `${classes !== '' ? ' ' : ''}l-order-${order}`
  }

  /* Output */

  args.tag = tag
  args.width = width !== '' ? `l-width-${width}` : ''
  args.widthSmall = widthSmall !== '' ? `l-width-${widthSmall}-s` : ''
  args.widthMedium = widthMedium !== '' ? `l-width-${widthMedium}-m` : ''
  args.widthLarge = widthLarge !== '' ? `l-width-${widthLarge}-l` : ''
  args.justify = justify !== '' ? `l-justify-${justify}` : ''
  args.align = align !== '' ? `l-align-${align}` : ''
  args.classes = classes

  return props
}

/* Exports */

export default column
