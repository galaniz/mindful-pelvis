/**
 * Text - Tabs Html
 */

/* Imports */

import type { Tabs } from './TabsHtmlTypes'
import { v4 as uuid } from 'uuid'
import {
  isArrayStrict,
  isStringStrict,
  addScriptStyle
} from '@alanizcreative/static-site-formation/iop/utils/utils'

/**
 * Function - output tabs list and panels
 *
 * @type {import('./TabsHtmlTypes').Tabs}
 */
const TabsHtml: Tabs = async (args) => {
  const { children, content } = args // Skip check as shortcode always passes object

  /* Children required */

  if (!isArrayStrict(children)) {
    return content
  }

  /* Store tabs list and panels */

  const list: string[] = []
  const panels: string[] = []

  /* Check for selected */

  let selectedIndex = children.findIndex((child) => {
    const { attributes } = child
    const { selected = false } = attributes

    return selected
  })

  if (selectedIndex === -1) {
    selectedIndex = 0
  }

  /* Tabs list and panel markup */

  const lastIndex = children.length - 1

  children.forEach((child, i) => {
    const {
      attributes,
      content
    } = child

    let {
      title = ''
    } = attributes

    if (!isStringStrict(title)) {
      title = `Tab ${i}`
    }

    const id = uuid()
    const tabId = `${id}-label`
    const selected = selectedIndex === i
    const selectedVal = selected.toString()
    const tabIndex = selected ? 0 : -1

    list.push(`
      <li${i !== lastIndex ? ' class="l-pr-2xs l-pr-xs-m"' : ''} role="presentation">
        <a class="o-tab l-inline-flex l-pb-3xs l-pb-2xs-m" href="#${id}" role="tab" aria-selected="${selectedVal}" id="${tabId}" tabindex="${tabIndex}">
          ${title}
        </a>
      </li>
    `)

    panels.push(`
      <div role="tabpanel" id="${id}" tabindex="${tabIndex}" aria-labelledby="${tabId}" data-selected="${selectedVal}"${!selected ? ' hidden' : ''}>
        ${content}
      </div>
    `)
  })

  /* Add styles */

  addScriptStyle({
    dir: 'objects/Tabs',
    style: 'Tabs',
    script: 'TabsInit'
  })

  /* Output */

  return `
    <div class="js-tabs">
      <ul class="t-list-style-none t-m t-height-snug t-weight-bold l-flex b-bottom l-mb-xs l-mb-s-m" role="tablist">
        ${list.join('')}
      </ul>
      ${panels.join('')}
    </div>
  `
}

/* Exports */

export { TabsHtml }
