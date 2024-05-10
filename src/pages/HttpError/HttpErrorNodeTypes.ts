/**
 * Pages - Http Error Node Types
 */

/**
 * @typedef {object} HttpErrorTextItem
 * @prop {string} metaTitle
 * @prop {string} heroText
 */
export interface HttpErrorTextItem {
  metaTitle: string
  heroText: string
}

/**
 * @typedef {Object.<number, HttpErrorTextItem>} HttpErrorText
 */
export interface HttpErrorText {
  [key: number]: HttpErrorTextItem
}
