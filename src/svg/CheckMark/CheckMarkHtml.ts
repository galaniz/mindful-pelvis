/**
 * Svg - Check Mark Html
 */

/* Imports */

import { configHtmlVars } from '../../config/configHtml'

/**
 * Function - output svg for check mark
 *
 * @param {string} classes
 * @return {string} HTML - svg
 */

const CheckMarkSvgHtml = (classes: string = ''): string => {
  /* Add to svg sprite */

  const viewBox = '0 0 20 20'
  const id = 'check-mark-icon'

  configHtmlVars.svg[id] = {
    viewBox,
    output: `
      <path
        d="m7.88,14.62c-.08,0-.16-.01-.23-.04-.07-.03-.14-.08-.21-.15l-3.77-3.77c-.12-.12-.19-.28-.19-.46s.06-.33.19-.46.27-.19.44-.19.31.06.44.19l3.33,3.33,7.56-7.56c.12-.12.27-.19.45-.19s.32.06.45.19.19.27.19.45-.06.32-.19.45l-8.02,8.02c-.07.07-.14.12-.21.15-.07.03-.15.04-.23.04Z"
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

export { CheckMarkSvgHtml }
