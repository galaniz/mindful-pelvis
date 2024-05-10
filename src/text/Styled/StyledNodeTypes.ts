/**
 * Text - Styled Node Types
 */

/* Imports */

import type { ShortcodeData } from '@alanizcreative/static-site-formation/iop/utils/shortcodes/shortcodesTypes'

/**
 * @typedef StyledArgs
 * @type {import('@alanizcreative/static-site-formation/iop/utils/shortcodes/shortcodesTypes').ShortcodeData}
 * @prop {object} attributes
 * @prop {string} [attributes.style]
 * @prop {string} [attributes.tag]
 */
export interface StyledArgs extends ShortcodeData {
  attributes: {
    style?: string
    tag?: string
  }
}

/**
 * @typedef {function} Styled
 * @param {StyledArgs} args
 * @return {Promise<string>}
 */
export type Styled = (args: StyledArgs) => Promise<string>
