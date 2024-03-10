/**
 * Text - Faux Heading Html
 */

/* Imports */

import type { FauxHeading } from './FauxHeadingHtmlTypes'
import { isStringStrict } from '@alanizcreative/static-site-formation/iop/utils/utils'

/**
 * Function - output text with heading style
 *
 * @type {FauxHeading}
 */
const FauxHeadingHtml: FauxHeading = async (args) => {
  const { attributes, content } = args // Skip check as shortcode always passes object
  const { style = 'h3' } = attributes

  if (!isStringStrict(style)) {
    return content
  }

  return `<p class='t-${style}'>${content}</p>`
}

/* Exports */

export { FauxHeadingHtml }
