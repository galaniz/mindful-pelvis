/**
 * Pages - Http Error Html
 */

/* Imports */

import type { HttpErrorText } from './HttpErrorHtmlTypes'
import { renderInlineItem } from '@alanizcreative/static-site-formation/iop/render/renderInline'
import { getPermalink } from '@alanizcreative/static-site-formation/iop/utils/utils'

/**
 * Function - output http error page (404 or 500)
 *
 * @param {number} type - 404 or 500
 * @return {string} HTML - html
 */
const HttpErrorHtml = async (type: number = 404): Promise<string> => {
  /* Text by type */

  const text: HttpErrorText = {
    404: {
      metaTitle: 'Page Not Found',
      heroText: 'Looks like nothing was found in this location.'
    },
    500: {
      metaTitle: 'Internal Server Error',
      heroText: 'Looks like we\'re experiencing an internal server problem.'
    }
  }

  const title: string = text[type].metaTitle
  const heroText: string = text[type].heroText
  const slug = `${type}`
  const id = `http-error-${type}`

  /* Output */

  return await renderInlineItem({
    id,
    slug,
    meta: {
      title,
      noIndex: true
    },
    contentType: 'page',
    content: [
      {
        renderType: 'container',
        maxWidth: '1160px',
        paddingTop: '75px',
        paddingTopLarge: '90px',
        paddingBottom: '120px',
        paddingBottomLarge: '150px',
        gap: '20px',
        gapLarge: '30px',
        classes: 't-align-center',
        content: [
          {
            renderType: 'richText',
            tag: 'h1',
            content: `${type}`
          },
          {
            renderType: 'richText',
            tag: 'p',
            textStyle: 'Small',
            content: heroText
          },
          {
            renderType: 'button',
            title: 'Back to Homepage',
            type: 'Secondary',
            paddingTop: '5px',
            link: getPermalink()
          }
        ]
      }
    ]
  })
}

/* Exports */

export { HttpErrorHtml }
