/**
 * Components - Footer Node
 */

/* Imports */

import type { NavigationNodeFunc } from '../Navigations/NavigationsNodeTypes'
import { getYear } from '@alanizcreative/static-site-formation/iop/utils/getYear/getYear'
import { LogoNode } from '../../objects/Logo/LogoNode'
import { configNode } from '../../config/configNode'

/**
 * Function - output footer
 *
 * @type {import('../Navigations/NavigationsNodeTypes').NavigationNodeFunc}
 */
const FooterNode: NavigationNodeFunc = (navigations) => { // Skip check as NavigationsNode always returns object
  /* Additional navs */

  let navs = ''

  /* Footer links */

  if (navigations.footer !== '') {
    navs += `
      <div>
        <nav aria-label="Overview" class="l-pt-4xs">
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
        <div class="l-flex l-col l-row-s l-wrap l-justify-between l-gap-s l-gap-m-s">
          <div>
            ${LogoNode({ size: 's', link: true, theme: 'light' })}
          </div>
          ${navs}
          <div>
            <span class="t-s l-pt-4xs l-block">&copy; ${getYear()} ${configNode.title}</span>
          </div>
        </div>
      </div>
    </footer>
  `
}

/* Exports */

export { FooterNode }
