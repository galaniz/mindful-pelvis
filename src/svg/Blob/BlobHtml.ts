/**
 * Svg - Blob Html
 */

/* Imports */

import type { BlobArgs } from './BlobHtmlTypes'
import { addScriptStyle, isObjectStrict, isStringStrict } from '@alanizcreative/static-site-formation/iop/utils/utils'
import { configHtmlVars } from '../../config/configHtml'

/**
 * Function - output svg for blob
 *
 * @param {import('./BlobHtmlTypes').BlobArgs} args
 * @return {string} HTML - svg
 */
const BlobSvgHtml = (args: BlobArgs): string => {
  /* Args */

  const {
    type = 'one',
    size = 'medium',
    theme = 'primary',
    dir = 'left',
    flip = false,
    classes = ''
  } = isObjectStrict(args) ? args : {}

  /* Paths by type */

  const paths: { [key: string]: string } = {
    one: 'M16.15,1.52C10.21-1.78,1.53-.15.06,10.89c-.42,3.15,1.33,6.68,4.7,8.62,4.22,2.42,3.95-4.68,10.09-7.88,7.84-4.09,5.43-7.8,1.3-10.1Z',
    two: 'M12.21.74C8.52,1.98,5-1.9,3.17,3.14c-.42,1.16.2,2.33-.25,3.7-.4,1.23-.76,1.68-1.7,2.84-1.99,2.46-2.06,6.21,3.7,9.1,5.76,2.89,9.56.36,12.2-4.82,1.15-2.27,4.86-2.38,1.5-6.84-2.45-3.25,1.94-9.2-6.42-6.38Z'
  }

  /* Check path exists */

  const path: string = paths[type] !== undefined ? paths[type] : ''

  if (path === '') {
    return ''
  }

  /* Add to svg sprite */

  const viewBox = '0 0 20 20'
  const id = `blob-${type}-icon`

  configHtmlVars.svg[id] = {
    viewBox,
    output: `<path d="${path}" fill="currentcolor" />`
  }

  /* Classes */

  let svgClasses = `s-blob s-blob-${size} l-shrink-0`

  if (isStringStrict(classes)) {
    svgClasses += ` ${classes}`
  }

  /* Add styles */

  addScriptStyle({
    dir: 'svg/Blob',
    style: 'Blob'
  })

  /* Output */

  return `
    <svg
      width="20"
      height="20"
      aria-hidden="true"
      focusable="false"
      role="img"
      class="${svgClasses}"
      data-theme="${theme}"
      data-dir="${dir}"
      data-flip="${flip.toString()}"
    >
      <use xlink:href="#${id}" />
    </svg>
  `
}

/* Exports */

export { BlobSvgHtml }
