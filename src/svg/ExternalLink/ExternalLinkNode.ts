/**
 * Svg - External Link Node
 */

/* Imports */

import { configNodeVars } from '../../config/configNode'

/**
 * Function - output svg for external link icon
 *
 * @param {string} classes
 * @return {string} HTML - svg
 */
const ExternalLinkSvgNode = (classes: string = ''): string => {
  /* Add to svg sprite */

  const viewBox = '0 0 20 20'
  const id = 'external-link-icon'

  configNodeVars.svg[id] = {
    viewBox,
    output: `
      <path
        d="m17.08,17.14c0,.66-.53,1.19-1.19,1.19H2.82c-.66,0-1.19-.52-1.19-1.18l-.02-13.1c0-.66.53-1.19,1.19-1.19h7.73c.33,0,.6.27.6.59s-.27.59-.6.59H2.8v13.09s13.09,0,13.09,0v-7.73c0-.33.27-.59.6-.59s.59.27.59.59v7.73Zm1.31-14.87v.07s0,4.72,0,4.72c0,.29-.21.54-.49.59h-.11c-.33,0-.6-.26-.6-.59v-3.26s-7.18,7.18-7.18,7.18c-.23.23-.61.23-.84,0-.23-.23-.23-.61,0-.84l7.26-7.26h-3.42c-.33,0-.59-.26-.59-.59s.27-.59.59-.59h4.78c.33,0,.59.26.59.59h0Z"
        fill="currentcolor"
      />
    `
  }

  /* Output */

  return `
    <svg
      width="20"
      height="20"
      aria-hidden="true"
      focusable="false"
      role="img"
      ${classes !== '' ? ` class="${classes}"` : ''}
    >
      <use xlink:href="#${id}" />
    </svg>
  `
}

/* Exports */

export { ExternalLinkSvgNode }
