/**
 * Text - Content Node
 */

/* Imports */

import type { ContentProps, ContentReturn } from './ContentNodeTypes'
import { isObjectStrict } from '@alanizcreative/static-site-formation/iop/utils/utils'
import { configNodeVars } from '../../config/configNode'

/**
 * Function - output content wrapper
 *
 * @param {import('./ContentNodeTypes').ContentProps} props
 * @return {Promise<import('./ContentNodeTypes').ContentReturn>}
 */
const ContentNode = async (props: ContentProps): Promise<ContentReturn> => {
  /* Fallback output */

  const fallback = {
    start: '',
    end: ''
  }

  /* Props and args must be object */

  if (!isObjectStrict(props)) {
    return fallback
  }

  const { args } = props

  if (!isObjectStrict(args)) {
    return fallback
  }

  /* Args */

  let {
    align = 'Left',
    gap = 'Default',
    gapLarge = 'Default',
    richTextStyles = 'Full'
  } = args

  const { classes = '' } = args

  /* Normalize options */

  align = configNodeVars.options.textAlign[align]
  gap = configNodeVars.options.gap[gap]
  gapLarge = configNodeVars.options.gap[gapLarge]
  richTextStyles = configNodeVars.options.richTextStyles[richTextStyles]

  /* Classes */

  const classesArr: string[] = []

  if (classes !== '') {
    classesArr.push(classes)
  }

  /* Rich text styles */

  const isRichTextFull = richTextStyles === 'full'
  const isRichText = isRichTextFull || richTextStyles === 'links'

  if (isRichTextFull) {
    classesArr.push('t-rich-text')
  }

  if (isRichText) {
    classesArr.push('e-line-y')
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

export { ContentNode }
