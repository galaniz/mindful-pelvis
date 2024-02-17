/**
 * Objects - Feed Html Types
 */

/* Imports */

import type { ShortcodeData } from '@alanizcreative/static-site-formation/lib/utils/shortcodes/shortcodesTypes'

/**
 * @typedef FeedArgs
 * @type {import('@alanizcreative/static-site-formation/lib/utils/shortcodes/shortcodesTypes').ShortcodeData}
 * @prop {object} attributes
 * @prop {number} attributes.display
 * @prop {string} attributes.handle
 * @prop {boolean} attributes.show-handle
 */
export interface FeedArgs extends Omit<ShortcodeData, 'attributes'> {
  attributes: {
    display?: number
    handle?: string
    'show-handle'?: boolean
  }
}

/**
 * @typedef {function} Feed
 * @param {FeedArgs} args
 * @return {Promise<string>}
 */
export type Feed = (args: FeedArgs) => Promise<string>
