/**
 * Objects - Fragment Html
 */

/* Imports */

import type { FragmentProps } from './FragmentHtmlTypes'

/**
 * Function - output any string content
 *
 * @param {FragmentProps} props
 * @return {string}
 */
const FragmentHtml = async (props: FragmentProps): Promise<string> => {
  const { args } = props
  const { content = '' } = args

  return content
}

/* Exports */

export { FragmentHtml }
