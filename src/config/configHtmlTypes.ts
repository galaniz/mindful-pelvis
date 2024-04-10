/**
 * Config - Html Types
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
 * @prop {object} button
 * @prop {GenericStrings} button.type
 * @prop {GenericStrings} button.size
 * @prop {GenericStrings} tag
 * @prop {GenericStrings} width
 * @prop {Object.<string, number>} width2x
 * @prop {GenericStrings} justify
 * @prop {GenericStrings} align
 * @prop {GenericStrings} order
 * @prop {GenericStrings} layout
 * @prop {GenericStrings} maxWidth
 * @prop {GenericStrings} padding
 * @prop {GenericStrings} gap
 * @prop {GenericStrings} aspectRatio
 * @prop {GenericStrings} borderRadius
 * @prop {object} content
 * @prop {GenericStrings} content.text
 * @prop {GenericStrings} content.heading
 * @prop {GenericStrings} content.align
 * @prop {object} posts
 * @prop {GenericStrings} posts.contentType
 * @prop {GenericStrings} posts.headingLevel
 * @prop {object} hero
 * @prop {GenericStrings} hero.type
 * @prop {GenericStrings} color
 */
export interface ConfigOptions {
  button: {
    type: GenericStrings
    size: GenericStrings
  }
  tag: GenericStrings
  width: GenericStrings
  width2x: {
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
  content: {
    text: GenericStrings
    heading: GenericStrings
    align: GenericStrings
  }
  posts: {
    contentType: GenericStrings
    headingLevel: GenericStrings
  }
  hero: {
    type: GenericStrings
  }
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
