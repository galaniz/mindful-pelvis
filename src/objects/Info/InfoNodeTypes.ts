/**
 * Objects - Info Node Types
 */

/**
 * @typedef {object} InfoArgs
 * @prop {string} text
 * @prop {string} [textType]
 * @prop {string} [type]
 * @prop {string} [classes]
 * @prop {string} [role]
 * @prop {number} [tabIndex]
 */
export interface InfoArgs {
  text: string
  textType?: string
  type?: string
  classes?: string
  role?: string
  tabIndex?: number
}
