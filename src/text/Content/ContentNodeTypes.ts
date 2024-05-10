/**
 * Text - Content Node Types
 */

/**
 * @typedef {object} ContentProps
 * @prop {object} args
 * @prop {string} [args.align]
 * @prop {string} [args.gap]
 * @prop {string} [args.gapLarge]
 * @prop {string} [args.textStyle]
 * @prop {string} [args.headingStyle]
 * @prop {string} [args.richTextStyles]
 * @prop {string} [args.classes] - Back end option
 */
export interface ContentProps {
  args: {
    align?: string
    gap?: string
    gapLarge?: string
    textStyle?: string
    headingStyle?: string
    richTextStyles?: string
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
