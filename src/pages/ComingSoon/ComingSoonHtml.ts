/**
 * Pages - Coming Soon Html
 */

/* Imports */

import { renderInlineItem } from '@alanizcreative/static-site-formation/iop/render/renderInline'
import { configHtmlVars } from '../../config/configHtml'
import { LogoHtml } from '../../objects/Logo/LogoHtml'

/**
 * Function - output coming soon page
 *
 * @return {Promise<string>} HTML - html
 */
const ComingSoonHtml = async (): Promise<string> => {
  /* Title and slug */

  const title = 'Coming Soon'
  const id = 'coming-soon'
  const slug = 'index'

  /* Output */

  return await renderInlineItem({
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
        classes: 'l-mh-full-vh l-flex l-align-center',
        content: [
          {
            renderType: 'container',
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
            content: [
              {
                renderType: 'richText',
                tag: 'h1',
                content: 'New site coming soon!'
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
  })
}

/* Exports */

export { ComingSoonHtml }
