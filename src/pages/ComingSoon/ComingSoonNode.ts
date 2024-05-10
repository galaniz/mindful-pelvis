/**
 * Pages - Coming Soon Node
 */

/* Imports */

import type { RenderItem } from '@alanizcreative/static-site-formation/iop/render/renderTypes'
import { configNodeVars } from '../../config/configNode'
import { LogoNode } from '../../objects/Logo/LogoNode'

/**
 * Function - output coming soon page
 *
 * @return {import('@alanizcreative/static-site-formation/iop/render/renderTypes').RenderItem} HTML - html
 */
const ComingSoonNode = (): RenderItem => {
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
                    content: LogoNode()
                  }
                ]
              },
              {
                renderType: 'content',
                richTextStyles: 'Full',
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
                        link: `mailto:${configNodeVars.email}`,
                        content: configNodeVars.email
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

export { ComingSoonNode }
