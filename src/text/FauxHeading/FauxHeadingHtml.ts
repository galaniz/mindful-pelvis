/**
 * Text - Faux Heading Html
 */

/* Imports */

import type { FauxHeading } from './FauxHeadingHtmlTypes'
import { isStringStrict } from '@alanizcreative/static-site-formation/lib/utils/utilsMin'

/**
 * Function - output text with heading style
 *
 * @type {FauxHeading}
 */
const FauxHeadingHtml: FauxHeading = async (args) => {
  const { attributes, content } = args // Skip check as shortcode always passes object
  const { style = 'h3' } = attributes

  if (!isStringStrict(content) || !isStringStrict(style)) {
    return ''
  }

  return `<p class='t-${style}'>${content}</p>`
}

/* Exports */

export { FauxHeadingHtml }
