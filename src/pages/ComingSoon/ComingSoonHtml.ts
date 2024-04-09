/**
 * Pages - Coming Soon Html
 */

/* Imports */

import type { RenderItem } from '@alanizcreative/static-site-formation/iop/render/renderTypes'
import { configHtmlVars } from '../../config/configHtml'
import { LogoHtml } from '../../objects/Logo/LogoHtml'

/**
 * Function - output coming soon page
 *
 * @return {import('@alanizcreative/static-site-formation/iop/render/renderTypes').RenderItem} HTML - html
 */
const ComingSoonHtml = (): RenderItem => {
  /* Title and slug */

  const title = 'Coming Soon'
  const id = 'coming-soon'
  const slug = 'index'

  /* Output */

  return {
    id,
    slug,
    meta: {
      title
    },
    contentType: 'page',
    showFooter: false,
    showHeader: false,
    showHero: false,
    content: [
      {
        renderType: 'container',
        maxWidth: '800px',
        paddingTop: '90px',
        paddingTopLarge: '120px',
        paddingBottom: '90px',
        paddingBottomLarge: '120px',
        align: 'Center',
        justify: 'Center',
        classes: 'l-mh-full-vh',
        content: [
          {
            renderType: 'container',
            content: [
              {
                renderType: 'container',
                align: 'Center',
                justify: 'Center',
                paddingBottom: '90px',
                content: [
                  {
                    renderType: 'fragment',
                    content: LogoHtml()
                  }
                ]
              },
              {
                renderType: 'content',
                richTextStyles: true,
                align: 'Center',
                content: [
                  {
                    renderType: 'richText',
                    tag: 'h1',
                    content: 'New site coming soon!',
                    classes: 'l-pb-2xs'
                  },
                  {
                    renderType: 'richText',
                    tag: 'p',
                    content: [
                      {
                        content: 'In the meantime you can reach me at '
                      },
                      {
                        tag: 'a',
                        link: `mailto:${configHtmlVars.email}`,
                        content: configHtmlVars.email
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
}

/* Exports */

export { ComingSoonHtml }
