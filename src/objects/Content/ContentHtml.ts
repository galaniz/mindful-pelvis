/**
 * Objects - Content Html
 */

/* Imports */

import type { ContentProps, ContentReturn } from './ContentHtmlTypes'
import { configHtmlVars } from '../../config/configHtml'

/**
 * Function - output content wrapper
 *
 * @param {import('./ContentHtmlTypes').ContentProps} props
 * @return {Promise<import('./ContentHtmlTypes').ContentReturn>}
 */
const ContentHtml = async (props: ContentProps = { args: {} }): Promise<ContentReturn> => {
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

  const classesArr: string[] = []

  if (classes !== '') {
    classesArr.push(classes)
  }

  /* Rich text styles */

  if (richTextStyles) {
    classesArr.push('t-rich-text e-underline')
  }

  /* Align */

  if (align === 'center') {
    classesArr.push('t-align-center')
  }

  /* Gap */

  if (gap !== '') {
    classesArr.push(`l-mb-${gap}-all`)
  }

  if (gapLarge !== '' && gapLarge !== gap) {
    classesArr.push(`l-mb-${gapLarge}-all-m`)
  }

  /* Output */

  return {
    start: `<div${classesArr.length > 0 ? ` class="${classesArr.join(' ')}"` : ''}>`,
    end: '</div>'
  }
}

/* Exports */

export { ContentHtml }
