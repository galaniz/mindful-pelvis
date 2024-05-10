/**
 * Svg - Quote Mark Node
 */

/* Imports */

import { configNodeVars } from '../../config/configNode'

/**
 * Function - output svg for quote mark
 *
 * @param {string} classes
 * @return {string} HTML - svg
 */
const QuoteMarkSvgNode = (classes: string = ''): string => {
  /* Add to svg sprite */

  const viewBox = '0 0 20 16'
  const id = 'quote-mark-icon'

  configNodeVars.svg[id] = {
    viewBox,
    output: `
      <path
        d="m0,10.02c0,1.53.4,3.12,1.26,4.5.8.61,1.91,1.48,3.57,1.48,2.16,0,4.22-1.84,4.22-4.19,0-1.43-.4-2.71-1.96-3.78l-2.46-1.69c1.31-1.89,3.02-3.48,4.37-4.19l-.9-2.15C3.22,1.79,0,5.52,0,10.02Zm10.95,0c0,1.53.4,3.12,1.26,4.5.8.61,1.91,1.48,3.57,1.48,2.16,0,4.22-1.84,4.22-4.19,0-1.43-.4-2.71-1.96-3.78l-2.46-1.69c1.31-1.89,3.02-3.48,4.37-4.19l-.9-2.15c-4.87,1.79-8.09,5.52-8.09,10.02Z"
        fill="currentcolor"
      />
    `
  }

  /* Output */

  return `
    <svg
      width="20"
      height="16"
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

export { QuoteMarkSvgNode }
