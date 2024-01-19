/**
 * Components - Header Html
 */

/* Imports */

import { v4 as uuid } from 'uuid'
import { addScriptStyle, getPermalink } from '@alanizcreative/static-site-formation/lib/utils'
import { SkipLinkHtml } from '../SkipLink/SkipLinkHtml'
import { LogoHtml } from '../../objects/Logo/LogoHtml'
import { configHtml } from '../../config/configHtml'

/**
 * Function - output header
 *
 * @param {object} navigations
 * @return {string} HTML - header
 */

const HeaderHtml = (navigations: MP.NavigationsReturn): string => {
  /* Id */

  const id = `n-${uuid()}`

  /* Style for nav half */

  let style = ''

  if (!isNaN(configHtml.vars.navHalf)) {
    style = ` style="--nav-half:${(configHtml.vars.navHalf * 2) / 16}rem"`
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
      <nav class="c-nav l-container l-relative l-padding-top-3xs l-padding-bottom-3xs l-padding-top-xs-s l-padding-bottom-xs-s" aria-label="Main" data-nav-overflow="false" data-nav-overflow-all="false" data-nav-open="false"${style}>
        <div class="c-nav__main l-flex l-justify-between l-align-center l-relative no-js-nav">
          ${LogoHtml({
            link: true,
            classes: 'c-nav__logo l-z-index-1 no-js-nav__logo'
          })}
          ${navigations.main}
          <div class="c-nav__hide">
            <button class="c-nav__button c-nav__open l-height-s l-width-s l-relative l-padding-top-5xs" type="button" aria-haspopup="true" aria-controls="${id}" aria-label="Open menu">
              <span class="c-nav-icon l-block l-relative e-transition" data-nav-icon="7">
                <span class="c-nav-icon__top bg-current l-block e-transition"></span>
                <span class="c-nav-icon__middle bg-current l-block e-transition"></span>
                <span class="c-nav-icon__bottom bg-current l-block e-transition"></span>
              </span>
              <span class="c-nav-icon-label t-xs t-align-center t-height-100-pc l-padding-top-4xs l-block e-transition" aria-hidden="true">Menu</span>
            </button>
          </div>
          <div class="c-nav__overflow l-fixed l-top-0 l-left-0 l-width-100-pc l-height-100-pc t-light t-link-current" role="dialog" aria-modal="true" aria-label="Main menu" id="${id}">
            <div class="c-nav__hide">
              <a class="c-nav__home o-logo l-inline-flex l-fixed js-pt-link" href="${getPermalink()}" aria-label="${configHtml.title} Home"></a>
            </div>
            <div class="c-nav__scroll l-height-100-pc l-overflow-y-auto l-overscroll-none l-overflow-x-hidden l-padding-right-2xs l-padding-left-2xs l-padding-bottom-xs">
              <ul class="c-nav__column l-flex l-flex-column t-list-style-none" role="list"></ul>
            </div>
            <div class="c-nav__hide">
              <button class="c-nav__button c-nav__close l-height-m l-width-s l-fixed l-top-0" type="button" aria-label="Close menu"></button>
            </div>
            <div class="c-nav__overlay bg-foreground-dark l-fixed l-top-0 l-left-0 l-overflow-hidden l-before l-after l-z-index--1 l-width-100-pc l-height-100-pc e-transition"></div>
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
