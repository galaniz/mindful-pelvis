/**
 * Svg - Calendar Html
 */

/* Imports */

import { configHtmlVars } from '../../config/configHtml'

/**
 * Function - output svg for calendar icon
 *
 * @param {string} classes
 * @return {string} HTML - svg
 */
const CalendarSvgHtml = (classes: string = ''): string => {
  /* Add to svg sprite */

  const viewBox = '0 0 20 20'
  const id = 'calendar-icon'

  configHtmlVars.svg[id] = {
    viewBox,
    output: `
      <path
        d="m3.75,18.33c-.33,0-.62-.12-.88-.38s-.38-.54-.38-.88V4.17c0-.33.12-.62.38-.88s.54-.38.88-.38h1.35v-.6c0-.18.06-.33.19-.46s.28-.19.48-.19.36.06.49.19c.13.12.2.28.2.48v.58h7.08v-.6c0-.18.06-.33.19-.46s.28-.19.48-.19.36.06.49.19c.13.12.2.28.2.48v.58h1.35c.33,0,.62.12.88.38s.38.54.38.88v12.92c0,.33-.12.62-.38.88s-.54.38-.88.38H3.75Zm0-1.25h12.5v-8.96H3.75v8.96Zm0-10.21h12.5v-2.71H3.75v2.71Zm0,0v-2.71,2.71Z"
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

export { CalendarSvgHtml }
