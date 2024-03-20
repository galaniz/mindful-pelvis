/**
 * Objects - Collapsible Init
 */

/* Imports */

import { addAction, setItems, onResize, isStringStrict } from '@alanizcreative/formation/lib/utils/utils'
import { Collapsible } from '@alanizcreative/formation/lib/objects/Collapsible/Collapsible'
import { config, configVars } from '../../config/config'
import { CollapsibleArgs } from '@alanizcreative/formation/lib/objects/Collapsible/CollapsibleTypes'

/**
 * Function - initialize
 *
 * @return {void}
 */
const init = (): void => {
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

  /* Instantiate */

  if (collapsibles.length > 0) {
    collapsibles.forEach(c => {
      const { context, main, trigger } = c

      const args: CollapsibleArgs = {
        container: context,
        collapsible: main,
        trigger
      }

      let isNav = false
      let isArticle = false

      if (context !== null) {
        isNav = context.hasAttribute('data-nav')
        isArticle = context.hasAttribute('data-article')

        const triggerId = context.getAttribute('data-trigger')

        if (trigger === null && isStringStrict(triggerId)) {
          args.trigger = document.getElementById(triggerId)
        }
      }

      if (isNav) {
        args.doAccordion = configVars.nav.accordion
        args.doHover = configVars.nav.hover
      }

      const instance = new Collapsible(args)

      if (isNav) {
        addAction(configVars.nav.close, () => {
          instance.toggle(false)
        })
      }

      if (isArticle) {
        if (window.innerWidth >= articleBreakpoint) {
          instance.toggle(true)
        }

        onResize(() => {
          if (window.innerWidth >= articleBreakpoint) {
            instance.toggle(true)
          }
        })
      }
    })
  }
}

init()
