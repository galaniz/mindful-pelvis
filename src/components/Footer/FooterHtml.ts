/**
 * Components - Footer Html
 */

/* Imports */

import type { NavigationHtmlFunc } from '../Navigations/NavigationsHtmlTypes'
import { getYear } from '@alanizcreative/static-site-formation/iop/utils/getYear/getYear'
import { LogoHtml } from '../../objects/Logo/LogoHtml'
import { configHtml } from '../../config/configHtml'

/**
 * Function - output footer
 *
 * @type {import('../Navigations/NavigationsHtmlTypes').NavigationHtmlFunc}
 */
const FooterHtml: NavigationHtmlFunc = (navigations) => { // Skip check as NavigationsHtml always returns object
  /* Additional navs */

  let navs = ''

  /* Footer links */

  if (navigations.footer !== '') {
    navs += `
      <div>
        <nav aria-label="Main" class="l-pt-4xs">
          ${navigations.footer}
        </nav>
      </div>
    `
  }

  /* Social links */

  if (navigations.social !== '') {
    navs += `
      <div>
        <nav aria-label="Social" class="l-pt-4xs">
          ${navigations.social}
        </nav>
      </div>
    `
  }

  /* Output */

  return `
    <footer class="bg-foreground-base t-light l-mt-auto">
      <div class="l-container l-pt-m l-pb-m l-pt-xl-m l-pb-xl-m">
        <div class="l-flex l-flex-col l-flex-row-s l-flex-wrap l-justify-between l-gm-s l-gm-m-s">
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
