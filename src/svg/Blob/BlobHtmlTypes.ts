/**
 * Svg - Blob Html Types
 */

/**
 * @typedef BlobArgs
 * @prop {string} [type] - one | two
 * @prop {string} [size] - small | medium | large
 * @prop {string} [theme] - primary | secondary | foreground
 * @prop {string} [dir] - left | right
 * @prop {boolean} [flip]
 * @prop {string} [classes]
 */
export interface BlobArgs {
  type?: string
  size?: string
  theme?: string
  dir?: string
  flip?: boolean
  classes?: string
}
