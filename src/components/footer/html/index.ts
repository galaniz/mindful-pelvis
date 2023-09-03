/**
 * Components - footer html
 */

/* Imports */

import getYear from '@alanizcreative/static-site-formation/lib/utils/get-year'
import logo from '../../../objects/logo/html'
import config from '../../../config/html'

/**
 * Function - output footer
 *
 * @param {object} navigations
 * @return {string} HTML - footer
 */

const footer = (navigations: MP.NavigationsReturn): string => {
  /* Footer and/or social navs */

  let navs = ''

  if (navigations.footer !== '' || navigations.social !== '') {
    const navFooter = navigations.footer !== '' ? `<nav aria-label="Main">${navigations.footer}</nav>` : ''
    const navSocial = navigations.social !== '' ? `<nav aria-label="Social">${navigations.social}</nav>` : ''

    navs = `
      <div>
        <div class="l-flex l-flex-wrap l-align-center l-justify-center l-gap-margin-s">
          ${navFooter}
          ${navSocial}
        </div>
      </div>
    `
  }

  /* Output */

  return `
    <footer class="bg-foreground-dark t-light l-margin-top-auto">
      <div class="l-container l-padding-top-m l-padding-bottom-m l-padding-top-xl-m l-padding-bottom-xl-m">
        <div class="l-flex l-flex-wrap l-justify-between l-align-center l-gap-margin-s">
          <div>
            ${logo({ size: 's', link: true, theme: 'light' })}
          </div>
          ${navs}
          <div>
            <span class="t-s">&copy; ${getYear()} ${config.title}</span>
          </div>
        </div>
      </div>
    </footer>
  `
}

/* Exports */

export default footer
