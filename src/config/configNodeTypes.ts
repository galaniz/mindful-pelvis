/**
 * Config - Node Types
 */

/* Imports */

import type { GenericNumbers, GenericStrings } from '@alanizcreative/static-site-formation/iop/global/globalTypes'

/**
 * @typedef {import('@alanizcreative/static-site-formation/iop/global/globalTypes').GenericStrings} GenericStrings
 */

/**
 * @typedef {object} ConfigCloudflare
 * @prop {string} namespaceId
 * @prop {string} accountId
 * @prop {string} token
 * @prop {string} apiEmail
 * @prop {string} apiKey
 */
export interface ConfigCloudflare {
  namespaceId: string
  accountId: string
  token: string
  apiEmail: string
  apiKey: string
}

/**
 * @typedef {object} ConfigSvg
 * @prop {string} viewBox
 * @prop {string} output
 */
export interface ConfigSvg {
  viewBox: string
  output: string
}

/**
 * @typedef {object} ConfigOptions
 * @prop {GenericStrings} buttonType
 * @prop {GenericStrings} buttonSize
 * @prop {GenericStrings} buttonColor
 * @prop {GenericStrings} tag
 * @prop {GenericStrings} dimension
 * @prop {Object.<string, number>} dimension2x
 * @prop {GenericStrings} justify
 * @prop {GenericStrings} align
 * @prop {GenericStrings} order
 * @prop {GenericStrings} layout
 * @prop {GenericStrings} maxWidth
 * @prop {GenericStrings} padding
 * @prop {GenericStrings} gap
 * @prop {GenericStrings} aspectRatio
 * @prop {GenericStrings} borderRadius
 * @prop {GenericStrings} headingStyle
 * @prop {GenericStrings} textStyle
 * @prop {GenericStrings} textAlign
 * @prop {GenericStrings} richTextStyles
 * @prop {GenericStrings} heroType
 * @prop {GenericStrings} color
 * @prop {GenericNumbers} blobs
 */
export interface ConfigOptions {
  buttonType: GenericStrings
  buttonSize: GenericStrings
  buttonColor: GenericStrings
  tag: GenericStrings
  dimension: GenericStrings
  dimension2x: {
    [key: string]: number
  }
  justify: GenericStrings
  align: GenericStrings
  order: GenericStrings
  layout: GenericStrings
  maxWidth: GenericStrings
  padding: GenericStrings
  gap: GenericStrings
  aspectRatio: GenericStrings
  borderRadius: GenericStrings
  headingStyle: GenericStrings
  textStyle: GenericStrings
  textAlign: GenericStrings
  richTextStyles: GenericStrings
  heroType: GenericStrings
  color: GenericStrings
  blobs: GenericNumbers
}

/**
 * @typedef {object} ConfigVars
 * @prop {string} email
 * @prop {string} instagram
 * @prop {ConfigCloudflare} cloudflare
 * @prop {GenericStrings} theme
 * @prop {string} head
 * @prop {Object.<string, ConfigSvg>} svg
 * @prop {object} css
 * @prop {string} css.in
 * @prop {string} css.out
 * @prop {string} css.head
 * @prop {string} css.cache
 * @prop {string[]} css.safelist
 * @prop {GenericStrings} css.static
 * @prop {object} js
 * @prop {string} js.in
 * @prop {string} js.out
 * @prop {number} navHalf
 * @prop {GenericStrings} shades
 * @prop {string[]} backgrounds
 * @prop {ConfigOptions} options
 */
export interface ConfigVars {
  email: string
  instagram: string
  cloudflare: ConfigCloudflare
  theme: GenericStrings
  head: string
  svg: {
    [key: string]: ConfigSvg
  }
  css: {
    in: string
    out: string
    head: string
    cache: string
    safelist: string[]
    static: GenericStrings
  }
  js: {
    in: string
    out: string
  }
  navHalf: number
  shades: GenericStrings
  backgrounds: string[]
  options: ConfigOptions
}
