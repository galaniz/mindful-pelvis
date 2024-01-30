/**
 * Svg - info html
 */

/* Imports */

import { configHtmlVars } from '../../config/configHtml'

/**
 * Function - output svg for info icon
 *
 * @param {string} classes
 * @return {string} HTML - svg
 */

const InfoSvgHtml = (classes: string = ''): string => {
  /* Add to svg sprite */

  const viewBox = '0 0 20 20'
  const id = 'info-icon'

  configHtmlVars.svg[id] = {
    viewBox,
    output: `
      <path
        d="m10.06,14.17c.18,0,.33-.06.45-.18s.18-.27.18-.45v-3.77c0-.17-.06-.31-.19-.43-.12-.12-.27-.18-.44-.18-.18,0-.33.06-.45.18-.12.12-.18.27-.18.45v3.77c0,.17.06.31.19.43.12.12.27.18.44.18Zm-.06-6.54c.19,0,.36-.06.49-.19.13-.12.2-.28.2-.48s-.07-.36-.2-.5c-.13-.14-.3-.21-.49-.21s-.36.07-.49.21c-.13.14-.2.31-.2.5s.07.35.2.48c.13.12.3.19.49.19Zm0,10.71c-1.18,0-2.28-.21-3.29-.64-1.01-.42-1.9-1.01-2.65-1.76-.75-.75-1.34-1.63-1.76-2.65-.42-1.01-.64-2.11-.64-3.29s.21-2.26.64-3.27c.42-1.01,1.01-1.9,1.76-2.65.75-.75,1.63-1.34,2.65-1.77,1.01-.43,2.11-.65,3.29-.65s2.26.22,3.27.65c1.01.43,1.9,1.02,2.65,1.77.75.75,1.34,1.63,1.77,2.65.43,1.01.65,2.1.65,3.27s-.22,2.28-.65,3.29c-.43,1.01-1.02,1.9-1.77,2.65-.75.75-1.63,1.34-2.65,1.76-1.01.42-2.1.64-3.27.64Zm0-1.25c1.94,0,3.61-.69,5-2.08,1.39-1.39,2.08-3.06,2.08-5s-.69-3.61-2.08-5c-1.39-1.39-3.06-2.08-5-2.08s-3.61.69-5,2.08c-1.39,1.39-2.08,3.06-2.08,5s.69,3.61,2.08,5c1.39,1.39,3.06,2.08,5,2.08Z"
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

export { InfoSvgHtml }
