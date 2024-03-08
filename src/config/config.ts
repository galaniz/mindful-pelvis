/**
 * Config - Scripts
 */

/* Imports */

import type { ConfigVars } from './configTypes'
import { config, setConfig } from '@alanizcreative/formation/lib/config/config'

/**
 * Store custom variables
 *
 * @type {import('./configTypes').ConfigVars}
 */
const configVars: ConfigVars = {
  nav: {
    close: 'nav-close',
    hover: 'nav-collapsible-hover',
    accordion: 'nav-collapsible-accordion'
  }
}

/**
 * Function - initialize default functionality and props
 *
 * @return {void}
 */
const configInit = (): void => {
  setConfig()
}

/* Exports */

export { config, configVars, configInit }
