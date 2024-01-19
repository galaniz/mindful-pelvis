/**
 * Layouts - Column Html
 */

/* Imports */

import { configHtml } from '../../config/configHtml'

/**
 * Function - callback to filter formation column
 *
 * @see {@link https://github.com/galaniz/static-site-formation|Formation Column}
 */

const ColumnHtml = (props: FRM.ColumnProps): FRM.ColumnProps => {
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

  tag = configHtml.vars.options.tag[tag]
  width = configHtml.vars.options.width[width]
  widthSmall = configHtml.vars.options.width[widthSmall]
  widthMedium = configHtml.vars.options.width[widthMedium]
  widthLarge = configHtml.vars.options.width[widthLarge]
  justify = configHtml.vars.options.justify[justify]
  align = configHtml.vars.options.align[align]

  const ord: string = configHtml.vars.options.order[order]

  /* Width */

  if (width === '') {
    width = '1-1'
  }

  /* Order */

  if (ord !== '') {
    classes += `${classes !== '' ? ' ' : ''}l-order-${ord}`
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

export { ColumnHtml }
