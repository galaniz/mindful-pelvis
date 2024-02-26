/**
 * Render - Http Error Html
 */

/* Imports */

import type { HttpErrorText } from './HttpErrorHtmlTypes'
import { getPermalink } from '@alanizcreative/static-site-formation/lib/utils/utilsMin'
import { Container } from '@alanizcreative/static-site-formation/lib/layouts/Container/Container'
import { LayoutHtml } from '../../components/Layout/LayoutHtml'
import { NavigationsHtml } from '../../components/Navigations/NavigationsHtml'
import { ButtonHtml } from '../../objects/Button/ButtonHtml'
import { configHtml } from '../../config/configHtml'

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
  const id = 'http-error'

  /* Navigations */

  const navs = NavigationsHtml({
    navigations: configHtml.navigation,
    items: configHtml.navigationItem,
    current: getPermalink(slug)
  })

  /* Container and button */

  const output = {
    container: await Container({
      args: {
        maxWidth: '1160px',
        paddingTop: '75px',
        paddingTopLarge: '90px',
        paddingBottom: '120px',
        paddingBottomLarge: '150px',
        gap: '20px',
        gapLarge: '30px',
        classes: 't-align-center'
      }
    }),
    button: ButtonHtml({
      args: {
        title: 'Back to Homepage',
        type: 'Secondary',
        paddingTop: '5px',
        link: getPermalink()
      }
    })
  }

  /* Output */

  return await LayoutHtml({
    id,
    slug,
    meta: {
      title,
      noIndex: true
    },
    pageData: {
      id,
      title,
      slug
    },
    contentType: 'page',
    navigations: navs,
    content: `
      ${output.container.start}
        <h1>${type}</h1>
        <p class="t-m">${heroText}</p>
        ${output.button}
      ${output.container.end}
    `
  })
}

/* Exports */

export { HttpErrorHtml }
