/**
 * Components - header html
 */

/* Imports */

import { v4 as uuid } from 'uuid'
import addScriptStyle from '@alanizcreative/static-site-formation/lib/utils/add-script-style'
import skipLink from '../../skip-link/html'
import logo from '../../../objects/logo/html'

/**
 * Function - output header
 *
 * @param {object} navigations
 * @return {string} HTML - header
 */

const header = (navigations: MP.NavigationsReturn): string => {
  /* Id */

  const id = `n-${uuid()}`

  /* Main and/or social navs */

  let nav = ''

  if (navigations.main !== '') {
    addScriptStyle({
      dir: 'components/header',
      priority: 3,
      style: true
    })

    nav = `
      <nav class="c-nav l-relative l-padding-top-3xs l-padding-bottom-3xs l-padding-top-xs-s l-padding-bottom-xs-s" aria-label="Main" data-overflow="false" data-overflow-all="false" data-open="false">
        <div class="c-nav__overlay l-fixed l-top-0 l-left-0 l-z-index-1 l-width-100-pc l-height-100-pc e-transition"></div>
        <div class="l-container l-flex l-justify-between l-align-center l-relative">
          ${logo({ link: true, classes: 'c-nav__logo' })}
          ${navigations.main}
          <div class="c-nav__hide l-height-s l-width-s">
            <button class="c-nav__button c-nav__open l-height-s l-width-s l-relative l-padding-top-5xs" type="button" aria-haspopup="true" aria-controls="${id}" aria-label="Open menu">
              <span class="c-nav-icon l-block l-relative e-transition" data-num="7">
                <span class="c-nav-icon__top bg-current l-block e-transition"></span>
                <span class="c-nav-icon__middle bg-current l-block e-transition"></span>
                <span class="c-nav-icon__bottom bg-current l-block e-transition"></span>
              </span>
              <span class="c-nav-icon-label t-xs t-align-center t-height-130-pc l-padding-top-5xs l-block e-transition" aria-hidden="true">Menu</span>
            </button>
          </div>
          <div class="c-nav-overflow l-fixed l-right-0 l-bottom-0 l-z-index-1 l-height-100-pc bg-background-light t-light t-link-current e-transition l-width-4-5" role="dialog" aria-modal="true" aria-label="Main menu" id="${id}">
            <div class="c-nav-overflow__main e-transition l-height-100-pc l-overflow-y-auto l-overscroll-none l-overflow-x-hidden l-padding-right-s l-padding-left-s l-padding-top-3xl l-padding-bottom-xs">
              <ul class="c-nav-overflow__list l-flex l-flex-column l-gap-margin-2xs t-list-style-none" role="list"></ul>
            </div>
            <div class="c-nav__hide">
              <button class="c-nav__button c-nav__close l-height-l l-width-m l-fixed l-padding-top-5xs" type="button" aria-label="Close menu" data-visible="false"></button>
            </div>
          </div>
        </div>
      </nav>
    `
  }

  /* Output */

  return `
    <header>
      ${skipLink()}
      ${nav}
    </header>
  `
}

/* Exports */

export default header
