/**
 * Global - Scripts
 */

/* Imports */

import { config, setConfig } from '@alanizcreative/formation/src/config/config'

/**
 * Function - initialize
 *
 * @return {void}
 */
const init = () => {
  /* Init default functionality and props */

  setConfig()

  /* Additional props */

  config.vars = {
    nav: {
      close: 'nav-close',
      hover: 'nav-collapsible-hover',
      accordion: 'nav-collapsible-accordion'
    }
  }
}

init()
