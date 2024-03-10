/**
 * Components - Header Init
 */

/* Imports */

import { doActions, setItems } from '@alanizcreative/formation/lib/utils/utils'
import { Nav } from '@alanizcreative/formation/lib/components/Nav/Nav'
import { configVars } from '../../config/config'

/**
 * Function - initialize
 *
 * @return {Nav}
 */
const init = (): Nav => {
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
    endToggle (open: boolean) {
      if (open) {
        return
      }

      doActions(configVars.nav.close)
    },
    onSet () {
      doActions(configVars.nav.hover, {
        // @ts-expect-error
        state: !this.isOverflowing
      })

      doActions(configVars.nav.accordion, {
        // @ts-expect-error
        state: !this.isOverflowing,
        group: 'nav-main'
      })
    }
  }

  return new Nav(args)
}

init()
