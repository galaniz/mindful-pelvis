/**
 * Objects - Loader Node Types
 */

/**
 * @typedef {object} LoaderArgs
 * @prop {boolean} [show]
 * @prop {string} [classes]
 * @prop {boolean} [ariaHidden]
 * @prop {string} [a11yHideText]
 */
export interface LoaderArgs {
  show?: boolean
  classes?: string
  ariaHidden?: boolean
  a11yHideText?: string
}
