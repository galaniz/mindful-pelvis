/**
 * Render - http error
 */

/* Imports */

import getPermalink from '@alanizcreative/static-site-formation/lib/utils/get-permalink'
import container from '@alanizcreative/static-site-formation/lib/layouts/container'
import config from '../../../config/html'
import layout from '../../../components/layout/html'
import navigations from '../../../components/navigations/html'
import button from '../../../objects/button/html'

/**
 * Function - output http error page (404 or 500)
 *
 * @param {number} type - 404 or 500
 * @return {string} HTML - html
 */

interface HttpErrorText {
  [key: number]: {
    metaTitle: string
    heroText: string
  }
}

const httpError = async (type: number = 404): Promise<string> => {
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

  const navs = navigations({
    navigations: config.navigation,
    items: config.navigationItem,
    current: getPermalink(slug)
  })

  /* Container and button */

  const output = {
    container: await container({
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
    button: button({
      args: {
        title: 'Back to Homepage',
        type: 'Secondary',
        paddingTop: '5px',
        link: getPermalink()
      }
    })
  }

  /* Output */

  return await layout({
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
    pageContains: [],
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

export default httpError
