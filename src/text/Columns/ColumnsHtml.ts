/**
 * Text - Columns Html
 */

/* Imports */

import type { Columns } from './ColumnsHtmlTypes'
import { configHtmlVars } from '../../config/configHtml'
import { addScriptStyle } from '@alanizcreative/static-site-formation/iop/utils/utils'

/**
 * Function - output columns for inline text
 *
 * @type {import('./ColumnsHtmlTypes').Columns}
 */
const ColumnsHtml: Columns = async (args) => {
  const { attributes, content } = args // Skip check as shortcode always passes object
  let {
    count = 2,
    gap = '30px'
  } = attributes

  /* Count above 1 required */

  if (count === 0 || count === 1) {
    return content
  }

  /* Normalize */

  gap = configHtmlVars.options.gap[gap]

  /* Style attribute */

  let style = ''

  if (count > 2) {
    style += `--t-count:${count};`
  }

  if (gap !== 'xs') {
    style += `--t-gap:var(--${gap});`
  }

  /* Add styles */

  addScriptStyle({
    dir: 'text/Columns',
    style: 'Columns'
  })

  /* Output */

  return `
    <div class="t-columns"${style}>
      ${content}
    </div>
  `
}

/* Exports */

export { ColumnsHtml }
