/**
 * Objects - Collapsible Html Types
 */

/* Imports */

import type { ShortcodeData } from '@alanizcreative/static-site-formation/lib/utils/shortcodes/shortcodesTypes'

/**
 * @typedef {object} CollapsibleAttributes
 * @prop {string} [tag=div]
 * @prop {string} [attr]
 * @prop {string} [classes]
 * @prop {string} label
 * @prop {string} [labelClasses]
 * @prop {string} [headingLevel=h3]
 * @prop {string} [headingClasses]
 * @prop {string} [iconClasses]
 * @prop {boolean} [expanded]
 */
export interface CollapsibleAttributes {
  tag?: string
  attr?: string
  classes?: string
  label: string
  labelClasses?: string
  headingLevel?: string
  headingClasses?: string
  iconClasses?: string
  expanded?: boolean
}

/**
 * @typedef CollapsibleArgs
 * @type {import('@alanizcreative/static-site-formation/lib/utils/shortcodes/shortcodesTypes').ShortcodeData}
 * @prop {CollapsibleAttributes} attributes
 */
export interface CollapsibleArgs extends Omit<ShortcodeData, 'attributes'> {
  attributes: CollapsibleAttributes
}

/**
 * @typedef {function} Collapsible
 * @param {CollapsibleArgs} args
 * @return {Promise<string>}
 */
export type Collapsible = (args: CollapsibleArgs) => Promise<string>
