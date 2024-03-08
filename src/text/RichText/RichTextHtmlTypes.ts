/**
 * Text - Rich Text Html Types
 */

/* Imports */

import type {
  RichTextContentFilter,
  RichTextOutputFilter,
  RichTextPropsFilter
} from '@alanizcreative/static-site-formation/iop/text/RichText/RichTextTypes'

/**
 * @typedef {object} RichTextHtmlFilters
 * @prop {import('@alanizcreative/static-site-formation/iop/text/RichText/RichTextTypes').RichTextPropsFilter} props
 * @prop {import('@alanizcreative/static-site-formation/iop/text/RichText/RichTextTypes').RichTextOutputFilter} output
 * @prop {import('@alanizcreative/static-site-formation/iop/text/RichText/RichTextTypes').RichTextContentFilter} content
 */
export interface RichTextHtmlFilters {
  props: RichTextPropsFilter
  output: RichTextOutputFilter
  content: RichTextContentFilter
}
