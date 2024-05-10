/**
 * Text - Styled Node
 */

/* Imports */

import type { Styled } from './StyledNodeTypes'
import { configNodeVars } from '../../config/configNode'
import { isHeading, isStringStrict } from '@alanizcreative/static-site-formation/iop/utils/utils'

/**
 * Function - output text with custom style and tag
 *
 * @type {import('./StyledNodeTypes').Styled}
 */
const StyledNode: Styled = async (args) => {
  /* Args */

  const { attributes, content } = args // Skip check as shortcode always passes object

  let {
    style = 'Heading Three',
    tag = 'Paragraph'
  } = attributes

  /* Normalize */

  tag = configNodeVars.options.tag[tag]
  style = configNodeVars.options[isHeading(tag) ? 'headingStyle' : 'textStyle'][style]

  /* Tag and style required */

  if (!isStringStrict(style)) {
    return content
  }

  if (!isStringStrict(tag)) {
    return content
  }

  /* Output */

  return `<${tag} class="${style}">${content}</${tag}>`
}

/* Exports */

export { StyledNode }
