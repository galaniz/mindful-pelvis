/**
 * Objects - Content Html
 */

/* Imports */

import { configHtmlVars } from '../../config/configHtml'

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
  args: {
    align?: string
    gap?: string
    gapLarge?: string
    textStyle?: string
    headingStyle?: string
    richTextStyles?: boolean
    classes?: string
  }
}

/**
 * @typedef {object} StartEndReturn
 * @prop {string} start
 * @prop {string} end
 */
interface StartEndReturn {
  start: string
  end: string
}

const ContentHtml = (props: ContentProps = { args: {} }): StartEndReturn => {
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

  align = configHtmlVars.options.content.align[align]
  gap = configHtmlVars.options.gap[gap]
  gapLarge = configHtmlVars.options.gap[gapLarge]

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
    classesArray.push(`l-mb-${gap}-all`)
  }

  if (gapLarge !== '' && gapLarge !== gap) {
    classesArray.push(`l-mb-${gapLarge}-all-m`)
  }

  /* Output */

  return {
    start: `<div${classesArray.length > 0 ? ` class="${classesArray.join(' ')}"` : ''}>`,
    end: '</div>'
  }
}

/* Exports */

export { ContentHtml }
