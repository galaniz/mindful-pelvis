/**
 * Objects - Content Html Types
 */

/**
 * @typedef {object} ContentProps
 * @prop
 */
export interface ContentProps {
  args: {
    align?: string
    gap?: string
    gapLarge?: string
    textStyle?: string
    headingStyle?: string
    richTextStyles?: boolean
    classes?: string
  }
}

/**
 * @typedef {object} ContentReturn
 * @prop {string} start
 * @prop {string} end
 */
export interface ContentReturn {
  start: string
  end: string
}
