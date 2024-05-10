/**
 * Text - Rich Text Node Types
 */

/* Imports */

import type {
  RichTextContentItemFilter,
  RichTextContentFilter,
  RichTextOutputFilter,
  RichTextPropsFilter
} from '@alanizcreative/static-site-formation/iop/text/RichText/RichTextTypes'

/**
 * @typedef {object} RichTextNodeFilters
 * @prop {import('@alanizcreative/static-site-formation/iop/text/RichText/RichTextTypes').RichTextPropsFilter} props
 * @prop {import('@alanizcreative/static-site-formation/iop/text/RichText/RichTextTypes').RichTextOutputFilter} output
 * @prop {import('@alanizcreative/static-site-formation/iop/text/RichText/RichTextTypes').RichTextContentItemFilter} contentItem
 * @prop {import('@alanizcreative/static-site-formation/iop/text/RichText/RichTextTypes').RichTextContentFilter} content
 */
export interface RichTextNodeFilters {
  props: RichTextPropsFilter
  output: RichTextOutputFilter
  contentItem: RichTextContentItemFilter
  content: RichTextContentFilter
}
