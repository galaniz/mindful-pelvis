/**
 * Objects - Feed Html Types
 */

/* Imports */

import type { ShortcodeData } from '@alanizcreative/static-site-formation/iop/utils/shortcodes/shortcodesTypes'

/**
 * @typedef {object} FeedRemoteData
 * @prop {string} url
 * @prop {string} alt
 * @prop {object} base64
 * @prop {string} base64.mime
 * @prop {string} base64.mime
 */
export interface FeedRemoteData {
  url: string
  alt: string
  base64: {
    mime: string
    data: string
  }
}

/**
 * @typedef {object} FeedData
 * @prop {string} url
 * @prop {string} src
 * @prop {string} alt
 */
export interface FeedData {
  url: string
  src: string
  alt: string
}

/**
 * @typedef FeedArgs
 * @type {import('@alanizcreative/static-site-formation/iop/utils/shortcodes/shortcodesTypes').ShortcodeData}
 * @prop {object} attributes
 * @prop {number} attributes.display
 * @prop {string} attributes.handle
 * @prop {boolean} attributes.show-handle
 */
export interface FeedArgs extends ShortcodeData {
  attributes: {
    display?: number
    handle?: string
    'show-handle'?: boolean
  }
}

/**
 * @typedef {function} Feed
 * @param {FeedArgs} args
 * @param {FeedData[]} [data]
 * @return {Promise<string>}
 */
export type Feed = (args: FeedArgs, data?: FeedData[]) => Promise<string>
