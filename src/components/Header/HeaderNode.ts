/**
 * Components - Header Node
 */

/* Imports */

import type { NavigationNodeFunc } from '../Navigations/NavigationsNodeTypes'
import { v4 as uuid } from 'uuid'
import { addScriptStyle, getPermalink } from '@alanizcreative/static-site-formation/iop/utils/utils'
import { SkipLinkNode } from '../SkipLink/SkipLinkNode'
import { LogoNode } from '../../objects/Logo/LogoNode'
import { configNode, configNodeVars } from '../../config/configNode'

/**
 * Function - output header
 *
 * @type {import('../Navigations/NavigationsNodeTypes').NavigationNodeFunc}
 */
const HeaderNode: NavigationNodeFunc = (navigations) => { // Skip check as NavigationsNode always returns object
  /* Id */

  const id = `n-${uuid()}`

  /* Style for nav half */

  let style = ''

  if (!isNaN(configNodeVars.navHalf)) {
    style = ` style="--half:${(configNodeVars.navHalf * 2) / 16}rem"`
  }

  /* Main output and styles and scripts */

  let nav = ''

  if (navigations.main !== '') {
    addScriptStyle({
      dir: 'objects/Collapsible',
      priority: 2,
      style: 'Collapsible',
      script: 'CollapsibleBrowser'
    })

    addScriptStyle({
      dir: 'components/Header',
      priority: 3,
      style: 'Header',
      script: 'HeaderBrowser'
    })

    nav = `
      <nav class="c-nav l-container l-relative t-sharp t-deco-none" aria-label="Main" data-nav-overflow="false" data-nav-overflow-all="false" data-nav-open="false"${style}>
        <div class="l-flex l-justify-between l-align-center l-relative no-js-nav">
          ${LogoNode({
            link: true,
            classes: 'c-nav__logo l-z-index-1'
          })}
          ${navigations.main}
          <div class="c-nav__hide">
            <button class="c-nav__button c-nav__open l-relative l-z-index-1 l-ht-s l-wd-s l-pt-5xs" type="button" aria-haspopup="true" aria-controls="${id}" aria-label="Open menu">
              <span class="c-nav-icon l-block e-trans" data-nav-icon="7">
                <span class="c-nav-icon__top bg-current l-block e-trans"></span>
                <span class="c-nav-icon__middle bg-current l-block e-trans"></span>
                <span class="c-nav-icon__bottom bg-current l-block e-trans"></span>
              </span>
              <span class="c-nav-icon-label t-xs t-align-center t-ht-tight l-pt-4xs l-block e-trans" aria-hidden="true">Menu</span>
            </button>
          </div>
          <div class="c-nav__overflow l-fixed l-top-0 l-left-0 l-wd-full l-ht-full t-light t-sharp t-link-current" role="dialog" aria-modal="true" aria-label="Main menu" id="${id}">
            <div class="c-nav__hide">
              <a class="c-nav__home o-logo l-inline-flex l-fixed js-pt-link" href="${getPermalink()}" aria-label="${configNode.title} Home"></a>
            </div>
            <div class="c-nav__scroll l-ht-full l-overflow-y-auto l-overscroll-none l-overflow-x-hidden l-pr-2xs l-pl-2xs l-pb-xs">
              <ul class="c-nav__column l-flex l-col t-ls-none" role="list"></ul>
            </div>
            <div class="c-nav__hide">
              <button class="c-nav__button c-nav__close l-ht-m l-wd-s l-fixed l-top-0" type="button" aria-label="Close menu"></button>
            </div>
            <div class="c-nav__overlay bg-foreground-base l-fixed l-top-0 l-left-0 l-overflow-hidden l-before l-after l-z-index--1 l-wd-full l-ht-full e-trans"></div>
          </div>
        </div>
      </nav>
    `
  }

  /* Output */

  return `
    <header>
      ${SkipLinkNode()}
      ${nav}
    </header>
  `
}

/* Exports */

export { HeaderNode }
