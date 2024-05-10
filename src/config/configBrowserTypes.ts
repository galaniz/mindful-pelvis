/**
 * Config - Browser Types
 */

/* Imports */

import type { ConfigScriptMeta } from '@alanizcreative/static-site-formation/iop/config/configTypes'

/**
 * @typedef {object} ConfigNav
 * @prop {string} close
 * @prop {string} hover
 * @prop {string} accordion
 */
export interface ConfigNav {
  close: string
  hover: string
  accordion: string
}

/**
 * @typedef {object} ConfigVars
 * @prop {string} namespace
 * @prop {import('@alanizcreative/static-site-formation/iop/config/configTypes').ConfigScriptMeta} data
 * @prop {ConfigNav} nav
 */
export interface ConfigVars {
  namespace: string
  data: ConfigScriptMeta
  nav: ConfigNav
}
