/**
 * Config - Browser
 */

/* Imports */

import type { ConfigVars } from './configBrowserTypes'
import type { ConfigScriptMeta } from '@alanizcreative/static-site-formation/iop/config/configTypes'
import { config, setConfig } from '@alanizcreative/formation/lib/config/config'
import { configFlexGap } from '@alanizcreative/formation/lib/config/configFlexGap'
import { isStringStrict } from '@alanizcreative/formation/lib/utils/utils'

/* Workaround for global window variables */

type Meta = Record<string, ConfigScriptMeta>

interface Name {
  namespace?: string
}

declare const window: Name & Meta & Window

/**
 * Store custom variables
 *
 * @type {import('./configTypes').ConfigVars}
 */
const configBrowserVars: ConfigVars = {
  namespace: '',
  data: {},
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
const setConfigBrowser = (): void => {
  setConfig()
  configFlexGap()

  const namespace = isStringStrict(window.namespace) ? window.namespace : ''
  const data = window[namespace]

  configBrowserVars.namespace = namespace
  configBrowserVars.data = data !== undefined ? data : {}

  if (!config.flexGap) {
    const head = document.querySelector('head')

    if (head !== null) {
      head.insertAdjacentHTML(
        'afterbegin',
        '<link rel="stylesheet" href="/assets/css/global/globalGapFallback.css" media="all">'
      )
    }
  }
}

/* Exports */

export {
  config as configBrowser,
  configBrowserVars,
  setConfigBrowser
}
