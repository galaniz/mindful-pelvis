/**
 * Text - Faux Heading Html Types
 */

/* Imports */

import type { ShortcodeData } from '@alanizcreative/static-site-formation/lib/utils/shortcodes/shortcodesTypes'

/**
 * @typedef FauxHeadingArgs
 * @type {import('@alanizcreative/static-site-formation/lib/utils/shortcodes/shortcodesTypes').ShortcodeData}
 * @prop {object} attributes
 * @prop {string} attributes.style
 */
export interface FauxHeadingArgs extends Omit<ShortcodeData, 'attributes'> {
  attributes: {
    style?: string
  }
}

/**
 * @typedef {function} FauxHeading
 * @param {FauxHeadingArgs} args
 * @return {Promise<string>}
 */
export type FauxHeading = (args: FauxHeadingArgs) => Promise<string>
