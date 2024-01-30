/**
 * Svg - Marker Html
 */

/* Imports */

import { configHtmlVars } from '../../config/configHtml'

/**
 * Function - output svg for location marker icon
 *
 * @param {string} classes
 * @return {string} HTML - svg
 */

const MarkerSvgHtml = (classes: string = ''): string => {
  /* Add to svg sprite */

  const viewBox = '0 0 20 20'
  const id = 'marker-icon'

  configHtmlVars.svg[id] = {
    viewBox,
    output: `
      <path
        d="m10,9.79c.4,0,.75-.14,1.03-.43.28-.28.43-.63.43-1.03s-.14-.75-.43-1.03c-.28-.28-.63-.43-1.03-.43s-.75.14-1.03.43c-.28.28-.43.63-.43,1.03s.14.75.43,1.03c.28.28.63.43,1.03.43Zm0,6.9c1.85-1.68,3.21-3.2,4.09-4.57.88-1.37,1.32-2.57,1.32-3.61,0-1.64-.52-2.98-1.57-4.02-1.05-1.04-2.33-1.56-3.84-1.56s-2.8.52-3.84,1.56c-1.05,1.04-1.57,2.38-1.57,4.02,0,1.04.45,2.25,1.35,3.61.9,1.37,2.26,2.89,4.06,4.57Zm.02,1.4c-.1,0-.19-.01-.27-.04-.08-.03-.16-.07-.23-.12-2.07-1.82-3.62-3.51-4.65-5.06-1.03-1.56-1.54-3.01-1.54-4.35,0-2.08.67-3.74,2.01-4.98,1.34-1.24,2.89-1.85,4.66-1.85s3.32.62,4.66,1.85c1.34,1.24,2.01,2.9,2.01,4.98,0,1.35-.51,2.8-1.54,4.35-1.03,1.56-2.58,3.24-4.65,5.06-.07.06-.14.1-.22.12-.08.03-.16.04-.24.04Z"
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

export { MarkerSvgHtml }
