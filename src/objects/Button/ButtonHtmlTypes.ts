/**
 * Objects - Button Html Types
 */

/* Imports */

import type { InternalLink } from '../../global/globalHtmlTypes'

export interface ButtonProps {
  args: {
    title?: string
    link?: string
    internalLink?: InternalLink
    externalLink?: string
    type?: string
    size?: string
    justify?: string
    paddingTop?: string
    paddingBottom?: string
    theme?: string
  }
}
