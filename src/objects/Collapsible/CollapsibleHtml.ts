/**
 * Objects - Collapsible Html
 */

/* Imports */

import { addScriptStyle } from '@alanizcreative/static-site-formation/lib/utils'

/**
 * Function - output
 *
 * @return {string} HTML - li
 */

const CollapsibleHtml = (): string => {
  /* Add styles */

  addScriptStyle({
    dir: 'objects/Collapsible',
    style: 'Collapsible',
    script: 'CollapsibleInit'
  })

  /* Output */

  return '<li></li>'
}

/* Exports */

export { CollapsibleHtml }
