/**
 * Components - Header Html
 */

/* Imports */

import type { NavigationHtmlFunc } from '../Navigations/NavigationsHtmlTypes'
import { v4 as uuid } from 'uuid'
import { addScriptStyle, getPermalink } from '@alanizcreative/static-site-formation/iop/utils/utils'
import { SkipLinkHtml } from '../SkipLink/SkipLinkHtml'
import { LogoHtml } from '../../objects/Logo/LogoHtml'
import { configHtml, configHtmlVars } from '../../config/configHtml'

/**
 * Function - output header
 *
 * @type {import('../Navigations/NavigationsHtmlTypes').NavigationHtmlFunc}
 */
const HeaderHtml: NavigationHtmlFunc = (navigations) => { // Skip check as NavigationsHtml always returns object
  /* Id */

  const id = `n-${uuid()}`

  /* Style for nav half */

  let style = ''

  if (!isNaN(configHtmlVars.navHalf)) {
    style = ` style="--nav-half:${(configHtmlVars.navHalf * 2) / 16}rem"`
  }

  /* Main and/or social navs */

  let nav = ''

  if (navigations.main !== '') {
    addScriptStyle({
      dir: 'objects/Collapsible',
      priority: 2,
      style: 'Collapsible',
      script: 'CollapsibleInit'
    })

    addScriptStyle({
      dir: 'components/Header',
      priority: 3,
      style: 'Header',
      script: 'HeaderInit'
    })

    nav = `
      <nav class="c-nav l-container l-relative l-py-3xs l-py-xs-s t-sharp" aria-label="Main" data-nav-overflow="false" data-nav-overflow-all="false" data-nav-open="false"${style}>
        <div class="c-nav__main l-flex l-justify-between l-align-center l-relative no-js-nav">
          ${LogoHtml({
            link: true,
            classes: 'c-nav__logo l-z-index-1'
          })}
          ${navigations.main}
          <div class="c-nav__hide">
            <button class="c-nav__button c-nav__open l-ht-s l-wd-s l-relative l-pt-5xs" type="button" aria-haspopup="true" aria-controls="${id}" aria-label="Open menu">
              <span class="c-nav-icon l-block l-relative e-transition" data-nav-icon="7">
                <span class="c-nav-icon__top bg-current l-block e-transition"></span>
                <span class="c-nav-icon__middle bg-current l-block e-transition"></span>
                <span class="c-nav-icon__bottom bg-current l-block e-transition"></span>
              </span>
              <span class="c-nav-icon-label t-xs t-align-center t-height-tight l-pt-4xs l-block e-transition" aria-hidden="true">Menu</span>
            </button>
          </div>
          <div class="c-nav__overflow l-fixed l-top-0 l-left-0 l-wd-100-pc l-ht-100-pc t-light t-sharp t-link-current" role="dialog" aria-modal="true" aria-label="Main menu" id="${id}">
            <div class="c-nav__hide">
              <a class="c-nav__home o-logo l-inline-flex l-fixed js-pt-link" href="${getPermalink()}" aria-label="${configHtml.title} Home"></a>
            </div>
            <div class="c-nav__scroll l-ht-100-pc l-overflow-y-auto l-overscroll-none l-overflow-x-hidden l-pr-2xs l-pl-2xs l-pb-xs">
              <ul class="c-nav__column l-flex l-flex-column t-list-style-none" role="list"></ul>
            </div>
            <div class="c-nav__hide">
              <button class="c-nav__button c-nav__close l-ht-m l-wd-s l-fixed l-top-0" type="button" aria-label="Close menu"></button>
            </div>
            <div class="c-nav__overlay bg-foreground-base l-fixed l-top-0 l-left-0 l-overflow-hidden l-before l-after l-z-index--1 l-wd-100-pc l-ht-100-pc e-transition"></div>
          </div>
        </div>
      </nav>
    `
  }

  /* Output */

  return `
    <header>
      ${SkipLinkHtml()}
      ${nav}
    </header>
  `
}

/* Exports */

export { HeaderHtml }
