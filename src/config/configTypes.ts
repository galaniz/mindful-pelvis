/**
 * Config - Scripts Types
 */

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
 * @prop {ConfigNav} nav
 */
export interface ConfigVars {
  nav: ConfigNav
}
