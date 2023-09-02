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
  }
}

export default FRM
