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

  /* Breakpoint */

  const { fontSizeMultiplier } = config
  const articleBreakpoint = 1200 * fontSizeMultiplier

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
      const isArticle = context.hasAttribute('data-article')

      if (isNav) {
        args.doAccordion = config.vars.nav.accordion
        args.doHover = config.vars.nav.hover
      }

      const instance = new Collapsible(args)

      if (isNav) {
        addAction(config.vars.nav.close, () => {
          instance.toggle(false)
        })
      }

      if (isArticle) {
        if (window.innerWidth >= articleBreakpoint) {
          instance.toggle(true)
        }

        window.addEventListener('resize', () => {
          if (window.innerWidth >= articleBreakpoint) {
            instance.toggle(true)
          }
        })
      }
    })
  }
}

init()
