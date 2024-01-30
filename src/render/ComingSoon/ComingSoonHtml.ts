/**
 * Render - Coming Soon Html
 */

/* Imports */

import { Container } from '@alanizcreative/static-site-formation/lib/layouts/Container/Container'
import { LayoutHtml } from '../../components/Layout/LayoutHtml'
import { ContentHtml } from '../../objects/Content/ContentHtml'
import { LogoHtml } from '../../objects/Logo/LogoHtml'
import { configHtmlVars } from '../../config/configHtml'

/**
 * Function - output coming soon page
 *
 * @return {Promise<string>} HTML - html
 */
const ComingSoonHtml = async (): Promise<string> => {
  /* Title and slug */

  const title = 'Coming Soon'
  const slug = 'coming-soon'

  /* Container and content */

  const output = {
    container: await Container({
      args: {
        maxWidth: '650px',
        paddingTop: '80px',
        paddingTopLarge: '120px',
        paddingBottom: '80px',
        paddingBottomLarge: '120px',
        classes: 'l-min-height-100-vh l-flex l-align-center'
      }
    }),
    content: ContentHtml({
      args: {
        richTextStyles: true
      }
    })
  }

  /* Output */

  return await LayoutHtml({
    id: slug,
    slug,
    meta: {
      title,
      noIndex: false
    },
    contentType: 'page',
    pageData: {
      id: slug,
      slug,
      title
    },
    pageContains: [],
    content: `
      ${output.container.start}
        ${output.content.start}
          ${LogoHtml()}
          <h1 class="l-padding-top-xl l-padding-bottom-s">New site coming soon!</h1>
          <p>
            In the meantime you can reach me at 
            <a href="mailto:${configHtmlVars.email}" data-rich>${configHtmlVars.email}</a>
          </p>
        ${output.content.end}
      ${output.container.end}
    `
  })
}

/* Exports */

export { ComingSoonHtml }
