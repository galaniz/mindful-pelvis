/**
 * Objects - Cards Node Types
 */

/* Imports */

import type { RenderFunctionArgs } from '@alanizcreative/static-site-formation/iop/render/renderTypes'
import type { InternalLink } from '@alanizcreative/static-site-formation/iop/global/globalTypes'
import type { Item } from '../../global/globalNodeTypes'

/**
 * @typedef {object} CardArgs
 * @prop {import('../../global/globalNodeTypes').Item} item
 * @prop {string} [headingLevel=h3]
 * @prop {string} contentType
 * @prop {string} [background]
 * @prop {boolean} [showExcerpt=false]
 * @prop {number} [columns=3]
 */
export interface CardArgs {
  item: Item
  headingLevel?: string
  contentType: string
  background?: string
  showExcerpt?: boolean
  columns?: number
}

/**
 * @typedef CardProps
 * @type {import('@alanizcreative/static-site-formation/iop/render/renderTypes').RenderFunctionArgs}
 * @prop {object} args
 * @prop {string} [args.gap]
 * @prop {string} [args.gapLarge]
 * @prop {import('@alanizcreative/static-site-formation/iop/global/globalTypes').InternalLink} [args.internalLink]
 * @prop {string} [args.externalLink]
 * @prop {boolean} [args.embed]
 * @prop {string} [args.embedTitle]
 * @prop {string} [args.embedText]
 * @prop {string} [args.background]
 */
export interface CardProps extends Partial<RenderFunctionArgs> {
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
 * @prop {CardsPropsRenderCard} renderCard
 */
export interface CardsProps {
  render: CardsPropsRender
  renderCard: CardsPropsRenderCard
}
