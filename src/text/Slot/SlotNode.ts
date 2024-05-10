/**
 * Text - Slot Node
 */

/* Imports */

import type { Slot } from './SlotNodeTypes'

/**
 * Function - output text with heading style
 *
 * @type {Slot}
 */
const SlotNode: Slot = async (args) => {
  const { attributes } = args // Skip check as shortcode always passes object
  const {
    type = 'single',
    size = 'm'
  } = attributes

  let classes = 't-l t-wt-bold t-align-center bg-foreground-base-fade l-m-0 l-px-2xs'

  if (size === 's') {
    classes += ' l-py-xs'
  } else if (size === 'l') {
    classes += ' l-py-2xl'
  } else {
    classes += ' l-py-l'
  }

  return `
    <p class="${classes}" style="text-transform:capitalize;">
      Slot ${type}
    </p>
  `
}

/* Exports */

export { SlotNode }
