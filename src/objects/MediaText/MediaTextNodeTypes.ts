/**
 * Objects - Media Text Node Types
 */

/* Imports */

import type { Item } from '../../global/globalNodeTypes'

/**
 * @typedef {object} MediaTextArgs
 * @prop {import('../../global/globalNodeTypes').Item} item
 * @prop {string} headingLevel
 * @prop {string} contentType
 */
export interface MediaTextArgs {
  item: Item
  headingLevel: string
  contentType: string
}

/**
 * @typedef {function} MediaTextPropsRender
 * @param {string} content
 * @return {Promise<string>}
 */
export type MediaTextPropsRender = (content: string) => Promise<string>

/**
 * @typedef {function} MediaTextPropsItem
 * @param {CardArgs} args
 * @return {Promise<string>}
 */
export type MediaTextPropsItem = (args: MediaTextArgs) => Promise<string>

/**
 * @typedef {object} MediaTextProps
 * @prop {MediaTextPropsRender} render
 * @prop {MediaTextPropsItem} renderItem
 */
export interface MediaTextProps {
  render: MediaTextPropsRender
  renderItem: MediaTextPropsItem
}
