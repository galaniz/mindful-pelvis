/**
 * Objects - content html
 */

/* Imports */

import config from '../../../config/html'

/**
 * Function - output content wrapper
 *
 * @param {object} props
 * @param {object} props.args
 * @param {string} props.args.align
 * @param {string} props.args.gap
 * @param {string} props.args.gapLarge
 * @param {boolean} props.args.richTextStyles
 * @param {string} props.args.classes - Back end option
 * @return {object}
 */

interface ContentProps {
  args: MP.ContentArgs
}

const content = (props: ContentProps = { args: {} }): FRM.StartEndReturn => {
  const { args = {} } = props

  let {
    align = 'Left',
    gap = 'Default',
    gapLarge = 'Default'
  } = args

  const {
    richTextStyles = true,
    classes = ''
  } = args

  /* Normalize options */

  align = config.vars.options.content.align[align]
  gap = config.vars.options.gap[gap]
  gapLarge = config.vars.options.gap[gapLarge]

  /* Classes */

  const classesArray: string[] = []

  if (classes !== '') {
    classesArray.push(classes)
  }

  /* Rich text styles */

  if (richTextStyles) {
    classesArray.push('t-rich-text e-underline')
  }

  /* Align */

  if (align === 'center') {
    classesArray.push('t-align-center')
  }

  /* Gap */

  if (gap !== '') {
    classesArray.push(`l-margin-bottom-${gap}-all`)
  }

  if (gapLarge !== '' && gapLarge !== gap) {
    classesArray.push(`l-margin-bottom-${gapLarge}-all-m`)
  }

  /* Output */

  return {
    start: `<div${classesArray.length > 0 ? ` class="${classesArray.join(' ')}"` : ''}>`,
    end: '</div>'
  }
}

/* Exports */

export default content
