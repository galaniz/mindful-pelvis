/**
 * Render - coming soon html
 */

/* Imports */

import container from '@alanizcreative/static-site-formation/lib/layouts/container'
import layout from '../../../components/layout/html'
import content from '../../../objects/content/html'
import logo from '../../../objects/logo/html'
import config from '../../../config/html'

/**
 * Function - output coming soon page
 *
 * @return {string} HTML - html
 */

const comingSoon = async (): Promise<string> => {
  /* Title and slug */

  const title = 'Coming Soon'
  const slug = 'coming-soon'

  /* Container and content */

  const output = {
    container: await container({
      args: {
        maxWidth: '650px',
        paddingTop: '80px',
        paddingTopLarge: '120px',
        paddingBottom: '80px',
        paddingBottomLarge: '120px',
        classes: 'l-min-height-100-vh l-flex l-align-center'
      }
    }),
    content: content({
      args: {
        richTextStyles: true
      }
    })
  }

  /* Output */

  return await layout({
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
          ${logo()}
          <h1 class="l-padding-top-xl l-padding-bottom-s">New site coming soon!</h1>
          <p>
            In the meantime you can reach me at 
            <a href="mailto:${config.vars.email}" data-rich>${config.vars.email}</a>
          </p>
        ${output.content.end}
      ${output.container.end}
    `
  })
}

/* Exports */

export default comingSoon
