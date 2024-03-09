/**
 * Objects - Cards Html Types
 */

/* Imports */

import type { Item, InternalLink } from '../../global/globalHtmlTypes'

/**
 * @typedef {object} CardArgs
 * @prop {import('../../global/globalHtmlTypes').Item} item
 * @prop {string} headingLevel
 * @prop {string} contentType
 * @prop {string} background
 * @prop {boolean} [showExcerpt=false]
 * @prop {number} [columns=3]
 */
export interface CardArgs {
  item: Item
  headingLevel: string
  contentType: string
  background: string
  showExcerpt?: boolean
  columns?: number
}

/**
 * @typedef {object} CardProps
 * @prop {object} args
 * @prop {string} [args.gap]
 * @prop {string} [args.gapLarge]
 * @prop {import('../../global/globalHtmlTypes').InternalLink} [args.internalLink]
 * @prop {string} [args.externalLink]
 * @prop {boolean} [args.embed]
 * @prop {string} [args.embedTitle]
 * @prop {string} [args.embedText]
 * @prop {string} [args.background]
 */
export interface CardProps {
  args: {
    gap?: string
    gapLarge?: string
    internalLink?: InternalLink
    externalLink?: string
    embed?: boolean
    embedTitle?: string
    embedText?: string
    background?: string
  }
}

/**
 * @typedef {object} CardReturn
 * @prop {string} start
 * @prop {string} end
 */
export interface CardReturn {
  start: string
  end: string
}

/**
 * @typedef {function} CardsPropsRender
 * @param {string} content
 * @return {Promise<string>}
 */
export type CardsPropsRender = (content: string) => Promise<string>

/**
 * @typedef {function} CardsPropsRenderCard
 * @param {CardArgs} args
 * @return {Promise<string>}
 */
export type CardsPropsRenderCard = (args: CardArgs) => Promise<string>

/**
 * @typedef {object} CardsProps
 * @prop {CardsPropsRender} render
 * @prop {} renderCard
 */
export interface CardsProps {
  render: CardsPropsRender
  renderCard: CardsPropsRenderCard
}
