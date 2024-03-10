/**
 * Objects - Tabs Init
 */

/* Imports */

import { setItems } from '@alanizcreative/formation/lib/utils/utils'
import { Tabs } from '@alanizcreative/formation/lib/objects/Tabs/Tabs'

/**
 * Function - initialize
 *
 * @return {void}
 */
const init = (): void => {
  /* Get DOM elements */

  const t = setItems([
    {
      context: '.js-tabs',
      nav: [
        '[role="tab"]'
      ],
      panels: [
        '[role="tabpanel"]'
      ]
    }
  ])

  /* Instantiate */

  if (t.length > 0) {
    t.forEach(tab => {
      const { nav, panels } = tab

      return new Tabs({
        tabs: nav,
        panels
      })
    })
  }
}

init()
