/**
 * Components - Footer Html
 */

/* Imports */

import type { NavigationHtmlFunc } from '../Navigations/NavigationsHtmlTypes'
import { getYear } from '@alanizcreative/static-site-formation/lib/utils/getYear/getYear'
import { LogoHtml } from '../../objects/Logo/LogoHtml'
import { configHtml } from '../../config/configHtml'

/**
 * Function - output footer
 *
 * @type {import('../Navigations/NavigationsHtmlTypes').NavigationHtmlFunc}
 */
const FooterHtml: NavigationHtmlFunc = (navigations) => {
  /* Footer and/or social navs */

  let navs = ''

  if (navigations.footer !== '' || navigations.social !== '') {
    const navFooter = navigations.footer !== '' ? `<nav aria-label="Main" class="l-pt-4xs">${navigations.footer}</nav>` : ''
    const navSocial = navigations.social !== '' ? `<nav aria-label="Social" class="l-pt-4xs">${navigations.social}</nav>` : ''

    navs = `
      <div>${navFooter}</div>
      <div>${navSocial}</div>
    `
  }

  /* Output */

  return `
    <footer class="bg-foreground-dark t-light l-mt-auto">
      <div class="l-container l-pt-m l-pb-m l-pt-xl-m l-pb-xl-m">
        <div class="l-flex l-flex-column l-flex-row-s l-flex-wrap l-justify-between l-gm-s l-gm-m-s">
          <div>
            ${LogoHtml({ size: 's', link: true, theme: 'light' })}
          </div>
          ${navs}
          <div>
            <span class="t-s l-pt-4xs l-block">&copy; ${getYear()} ${configHtml.title}</span>
          </div>
        </div>
      </div>
    </footer>
  `
}

/* Exports */

export { FooterHtml }
