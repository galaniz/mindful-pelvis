/**
 * Text - Slot Html Types
 */

/* Imports */

import type { ShortcodeData } from '@alanizcreative/static-site-formation/iop/utils/shortcodes/shortcodesTypes'

/**
 * @typedef SlotArgs
 * @type {import('@alanizcreative/static-site-formation/iop/utils/shortcodes/shortcodesTypes').ShortcodeData}
 * @prop {object} attributes
 * @prop {string} attributes.type
 * @prop {string} attributes.size
 */
export interface SlotArgs extends ShortcodeData {
  attributes: {
    type?: string
    size?: string
  }
}

/**
 * @typedef {function} Slot
 * @param {SlotArgs} args
 * @return {Promise<string>}
 */
export type Slot = (args: SlotArgs) => Promise<string>
