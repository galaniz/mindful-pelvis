/**
 * Text - Icon Node Types
 */

/* Imports */

import type { ShortcodeData } from '@alanizcreative/static-site-formation/iop/utils/shortcodes/shortcodesTypes'

/**
 * @typedef IconArgs
 * @type {import('@alanizcreative/static-site-formation/iop/utils/shortcodes/shortcodesTypes').ShortcodeData}
 * @prop {object} attributes
 * @prop {string} [attributes.type]
 * @prop {string} [attributes.gap]
 * @prop {string} [attributes.size]
 */
export interface IconArgs extends ShortcodeData {
  attributes: {
    type?: string
    gap?: string
    size?: string
  }
}

/**
 * @typedef {function} Icon
 * @param {IconArgs} args
 * @return {Promise<string>}
 */
export type Icon = (args: IconArgs) => Promise<string>
