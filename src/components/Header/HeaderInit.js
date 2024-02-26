/**
 * Components - Header Init
 */

/* Imports */

import { config } from '@alanizcreative/formation/src/config/config'
import { doActions, setItems } from '@alanizcreative/formation/src/utils'
import { Nav } from '@alanizcreative/formation/src/components/Nav/Nav'

/**
 * Function - initialize
 *
 * @return {void}
 */
const init = () => {
  /* Item selector */

  const itemSelector = '.c-nav__item[data-depth="0"]'

  /* Get DOM elements */

  const n = setItems({
    context: '.c-nav',
    list: '.c-nav__list',
    overflow: '.c-nav__overflow',
    overflowList: '.c-nav__column',
    items: [
      itemSelector
    ],
    links: [
      '.c-nav__link'
    ],
    open: '.c-nav__open',
    close: '.c-nav__close',
    overlay: '.c-nav__overlay'
  })

  /* Instantiate */

  const nav = (args) => {
    return new Nav(args)
  }

  /* Navigation */

  const {
    context,
    list,
    overflow,
    overflowList,
    items,
    links,
    open,
    close,
    overlay
  } = n

  const args = {
    nav: context,
    list,
    overflow,
    overflowList,
    items,
    itemSelector,
    links,
    open,
    close,
    overlay,
    endToggle (open) {
      if (open) {
        return
      }

      doActions(config.vars.nav.close)
    },
    onSet () {
      doActions(config.vars.nav.hover, {
        state: !this.isOverflowing
      })

      doActions(config.vars.nav.accordion, {
        state: !this.isOverflowing,
        group: 'nav-main'
      })
    }
  }

  nav(args)
}

init()
