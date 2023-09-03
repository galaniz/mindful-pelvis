/**
 * Mindful Pelvis - type definitions
 */

import FRM from '@alanizcreative/static-site-formation'

declare global {
  namespace MP {
    /* Media data */

    interface Media {
      file: {
        url: string
        contentType: string
      }
    }

    /* Item/link data */

    interface ItemArchives {
      post?: InternalLink[]
      category?: InternalLink[]
      service?: InternalLink[]
      event?: InternalLink[]
      eventType?: InternalLink[]
    }

    interface Item extends ItemArchives {
      id: string
      title: string
      slug: string
      pagination?: boolean
      heroTitle?: string
      heroText?: string
      heroImage?: {
        fields: FRM.ImageData
      }
    }

    interface InternalLink extends FRM.InternalLinkBase {
      fields?: Item
      [key: string]: any
    }

    /* Navigation */

    interface NavigationsReturn {
      main: string
      footer: string
      social: string
    }

    /* Layout arguments */

    interface LayoutArgs extends FRM.LayoutArgs {
      navigations?: NavigationsReturn
    }

    /* Content arguments */

    interface ContentArgs {
      align?: string
      gap?: string
      gapLarge?: string
      textStyle?: string
      headingStyle?: string
      richTextStyles?: boolean
      classes?: string
    }

    /* Card arguments */

    interface CardArgs {
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
}

export default FRM
