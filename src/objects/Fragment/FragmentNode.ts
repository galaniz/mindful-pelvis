/**
 * Objects - Fragment Node
 */

/* Imports */

import type { FragmentProps } from './FragmentNodeTypes'

/**
 * Function - output any string content
 *
 * @param {FragmentProps} props
 * @return {string}
 */
const FragmentNode = async (props: FragmentProps): Promise<string> => {
  const { args } = props
  const { content = '' } = args

  return content
}

/* Exports */

export { FragmentNode }
