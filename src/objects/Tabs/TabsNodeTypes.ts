/**
 * Text - Tabs Node Types
 */

/* Imports */

import type {
  ShortcodeData,
  ShortcodeAttrs
} from '@alanizcreative/static-site-formation/iop/utils/shortcodes/shortcodesTypes'

/**
 * @typedef TabAttrs
 * @type {import('@alanizcreative/static-site-formation/iop/utils/shortcodes/shortcodesTypes').ShortcodeAttrs}
 * @prop {string} [title]
 * @prop {boolean} [selected]
 */
export interface TabAttrs extends ShortcodeAttrs {
  title?: string
  selected?: boolean
}

/**
 * @typedef Tab
 * @prop {TabAttrs} attributes
 */
export interface Tab extends ShortcodeData {
  attributes: TabAttrs
}

/**
 * @typedef TabsArgs
 * @type {import('@alanizcreative/static-site-formation/iop/utils/shortcodes/shortcodesTypes').ShortcodeData}
 * @prop {Tab[]} children
 */
export interface TabsArgs extends ShortcodeData {
  children: Tab[]
}

/**
 * @typedef {function} Tabs
 * @param {TabsArgs} args
 * @return {Promise<string>}
 */
export type Tabs = (args: TabsArgs) => Promise<string>
