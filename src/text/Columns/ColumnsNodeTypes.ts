/**
 * Text - Columns Node Types
 */

/* Imports */

import type { ShortcodeData } from '@alanizcreative/static-site-formation/iop/utils/shortcodes/shortcodesTypes'

/**
 * @typedef ColumnsArgs
 * @type {import('@alanizcreative/static-site-formation/iop/utils/shortcodes/shortcodesTypes').ShortcodeData}
 * @prop {object} attributes
 * @prop {number} [attributes.count=2]
 * @prop {string} [attributes.gap=30px]
 */
export interface ColumnsArgs extends ShortcodeData {
  attributes: {
    count?: number
    gap?: string
  }
}

/**
 * @typedef {function} Columns
 * @param {ColumnsArgs} args
 * @return {Promise<string>}
 */
export type Columns = (args: ColumnsArgs) => Promise<string>
