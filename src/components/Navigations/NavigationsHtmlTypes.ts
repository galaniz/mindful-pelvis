/**
 * Components - Navigations Html Types
 */

/* Imports */

import type { GenericStrings } from '@alanizcreative/static-site-formation/iop/global/globalTypes'
import type {
  NavigationProps,
  NavigationItem
} from '@alanizcreative/static-site-formation/iop/components/Navigation/NavigationTypes'

/**
 * @typedef GenericStrings
 * @type {import('@alanizcreative/static-site-formation/iop/global/globalTypes').GenericStrings}
 */

/**
 * @typedef NavigationProps
 * @type {import('@alanizcreative/static-site-formation/iop/components/Navigation/NavigationTypes').NavigationProps}
 */

/**
 * @typedef NavigationItem
 * @type {import('@alanizcreative/static-site-formation/iop/components/Navigation/NavigationTypes').NavigationItem}
 */

/**
 * @typedef {object} NavigationArgs
 * @prop {GenericStrings} navigations
 * @prop {object} props
 * @prop {string} [props.location]
 * @prop {string} [props.title]
 */
export interface NavigationArgs {
  navigations: GenericStrings
  props: {
    location?: string
    title?: string
  }
}

/**
 * @typedef {function} NavigationIs
 * @param {NavigationItem} item
 * @param {number} depth
 * @return {boolean}
 */
export type NavigationIs = (item: NavigationItem, depth: number) => boolean

/**
 * @typedef {function} NavigationsHtmlObj
 * @param {NavigationProps} props
 * @return {GenericStrings}
 */
export type NavigationsHtmlObj = (props: NavigationProps) => GenericStrings

/**
 * @typedef {function} NavigationHtmlFunc
 * @param {GenericStrings} navigations
 * @return {string} HTML
 */
export type NavigationHtmlFunc = (navigations: GenericStrings) => string
