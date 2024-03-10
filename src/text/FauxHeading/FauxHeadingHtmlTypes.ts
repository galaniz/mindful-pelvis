/**
 * Text - Faux Heading Html Types
 */

/* Imports */

import type { ShortcodeData } from '@alanizcreative/static-site-formation/iop/utils/shortcodes/shortcodesTypes'

/**
 * @typedef FauxHeadingArgs
 * @type {import('@alanizcreative/static-site-formation/iop/utils/shortcodes/shortcodesTypes').ShortcodeData}
 * @prop {object} attributes
 * @prop {string} attributes.style
 */
export interface FauxHeadingArgs extends ShortcodeData {
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
