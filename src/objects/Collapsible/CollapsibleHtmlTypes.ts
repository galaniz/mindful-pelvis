/**
 * Objects - Collapsible Html Types
 */

/* Imports */

import type {
  ShortcodeData,
  ShortcodeAttrs
} from '@alanizcreative/static-site-formation/iop/utils/shortcodes/shortcodesTypes'

/**
 * @typedef {object} CollapsibleAttributes
 * @type {import('@alanizcreative/static-site-formation/iop/utils/shortcodes/shortcodesTypes').ShortcodeAttrs}
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
export interface CollapsibleAttributes extends ShortcodeAttrs {
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
 * @type {import('@alanizcreative/static-site-formation/iop/utils/shortcodes/shortcodesTypes').ShortcodeData}
 * @prop {CollapsibleAttributes} attributes
 */
export interface CollapsibleArgs extends ShortcodeData {
  attributes: CollapsibleAttributes
}

/**
 * @typedef {function} Collapsible
 * @param {CollapsibleArgs} args
 * @return {Promise<string>}
 */
export type Collapsible = (args: CollapsibleArgs) => Promise<string>
