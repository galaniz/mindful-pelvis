/**
 * Objects - Collapsible Init
 */

/* Imports */

import { config } from '@alanizcreative/formation/src/config/config'
import { addAction, setItems } from '@alanizcreative/formation/src/utils'
import { Collapsible } from '@alanizcreative/formation/src/objects/Collapsible/Collapsible'

/**
 * Function - initialize
 *
 * @return {void}
 */

const init = () => {
  /* Get DOM elements */

  const collapsibles = setItems([
    {
      context: '.o-collapsible',
      main: '.o-collapsible__main',
      trigger: '.o-collapsible__toggle'
    }
  ])

  /* Instantiate */

  const collapsible = (args) => {
    return new Collapsible(args)
  }

  /* Instantiate all */

  if (collapsibles.length > 0) {
    collapsibles.forEach(c => {
      const { context, main, trigger } = c

      const args = {
        container: context,
        collapsible: main,
        trigger: trigger || document.getElementById(context.getAttribute('data-trigger'))
      }

      const isNav = context.hasAttribute('data-nav')

      if (isNav) {
        args.doAccordion = config.vars.nav.accordion
        args.doHover = config.vars.nav.hover
      }

      const instance = collapsible(args)

      if (isNav) {
        addAction(config.vars.nav.close, () => {
          instance.toggle(false)
        })
      }
    })
  }
}

init()
