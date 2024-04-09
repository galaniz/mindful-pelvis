/**
 * Components - Navigations Html
 */

/* Imports */

import type { NavigationsHtmlObj, NavigationIs, NavigationArgs } from './NavigationsHtmlTypes'
import { v4 as uuid } from 'uuid'
import { Navigation } from '@alanizcreative/static-site-formation/iop/components/Navigation/Navigation'
import {
  isObjectStrict,
  isArrayStrict,
  isStringStrict
} from '@alanizcreative/static-site-formation/iop/utils/utils'
import { SocialSvgHtml } from '../../svg/Social/SocialHtml'
import { CaretSvgHtml } from '../../svg/Caret/CaretHtml'
import { configHtmlVars } from '../../config/configHtml'

/**
 * Function - check if text dropdown
 *
 * @private
 * @type {import('./NavigationsHtmlTypes').NavigationIs}
 */
const _isDropdown: NavigationIs = (item, depth) => {
  const { style = 'Text', children } = item

  return children !== undefined && depth === 0 && style === 'Text'
}

/**
 * Function - check if button dropdown
 *
 * @private
 * @type {import('./NavigationsHtmlTypes').NavigationIs}
 */
const _isButtonDropdown: NavigationIs = (item, depth) => {
  const { style = 'Text', children } = item

  return children !== undefined && depth === 0 && style === 'Button'
}

/**
 * Function - check if button style
 *
 * @private
 * @type {import('./NavigationsHtmlTypes').NavigationIs}
 */
const _isButton: NavigationIs = (item, _depth) => {
  const { style = 'Text' } = item

  return style === 'Button'
}

/**
 * Function - output navigations
 *
 * @type {import('./NavigationsHtmlTypes').NavigationsHtmlObj}
 */
const NavigationsHtml: NavigationsHtmlObj = (args) => {
  /* Args */

  const {
    navigations = [],
    items = [],
    current = ''
  } = isObjectStrict(args) ? args : {}

  /* Navs and items required */

  if (!isArrayStrict(navigations) || !isArrayStrict(items)) {
    return {
      main: '',
      footer: '',
      social: ''
    }
  }

  /* Navigation instance */

  const nav = new Navigation({ navigations, items, current })

  /* Attributes */

  const linkClass = 'c-nav__link'
  const itemClass = 'c-nav__item'
  const listAttr = 'role="list"'
  const listClass = 'c-nav__list t-ls-none t-link-current l-flex'
  const listClassZero = `${listClass} c-nav__height l-align-center l-gap-xs l-gap-s-s l-overflow-x-auto l-overflow-y-hidden`

  let listType = 'min'

  /* Store collapsible id */

  let collapsibleId = ''

  /* Store estimated item widths */

  let itemMidIndex = 0

  const itemWidths: number[] = []

  /* Output by location */

  const output = {
    main: nav.getOutput(
      'main',
      {
        listClass: listClassZero,
        listAttr,
        itemClass,
        linkClass,
        internalLinkClass: 'js-pt-link',
        filterBeforeList: ({ args, depth }) => {
          if (depth > 0) {
            args.listClass = `${listClass} o-collapsible__main outline-snug e-line-r e-trans l-col no-js-none`
            args.listAttr = `${listAttr} data-list="${listType}" id="${collapsibleId}"`
          } else {
            args.listAttr = listAttr
          }
        },
        filterBeforeItem: ({ args, index, item, items, depth, output }) => {
          const newItemAttr: string[] = []

          let newListType = listType
          let newLinkClass = linkClass
          let newItemClass = itemClass
          let newLinkAttr = ''

          if (depth === 0) {
            newLinkClass += ' t-r l-inline-flex l-before l-relative l-my-3xs'
            newItemClass += ' e-trans'

            if (index === 0) {
              newItemClass += ' c-nav__flow l-before l-relative'
            }
          } else {
            newLinkAttr = 'data-rich'
            newLinkClass += ' t-s t-ht-snug'

            if (listType === 'cta') {
              newItemClass += ' l-py-3xs l-px-2xs b-top'
            } else {
              newItemClass += ' l-py-4xs'
            }
          }

          if (_isButton(item, depth)) {
            newLinkClass = 'c-nav__cta outline-inset t-wt-bold t-ht-snug t-m l-px-2xs l-py-3xs b-radius-l l-flex l-align-center l-justify-between l-overflow-hidden l-relative l-z-index-1 l-before l-wd-full'
          }

          if (_isButtonDropdown(item, depth)) {
            collapsibleId = uuid()
            newLinkAttr = `aria-expanded="false" aria-controls="${collapsibleId}"`
            newLinkClass += ' o-collapsible__toggle e-trans'
            newListType = 'cta'
            newItemAttr.push('data-cta')
          }

          if (_isDropdown(item, depth) || _isButtonDropdown(item, depth)) {
            newItemClass += ' o-collapsible'
            newItemAttr.push('data-nav')

            if (depth === 0) {
              newItemAttr.push('data-drop')
            }
          }

          args.itemClass = newItemClass
          args.linkClass = newLinkClass
          args.linkAttr = newLinkAttr
          args.itemAttr = newItemAttr.join(' ')

          listType = newListType

          /* Mid item */

          if (depth > 0) {
            return
          }

          const odd = items.length % 2 !== 0

          itemMidIndex = Math.round(items.length / 2)

          if (odd) {
            itemMidIndex -= 1
          }

          if (index === itemMidIndex) {
            newItemAttr.push('data-mid')
          }

          args.itemAttr = newItemAttr.join(' ')
        },
        filterBeforeLink: ({ item, depth, output }) => {
          if (_isDropdown(item, depth)) {
            output.html += '<div class="l-flex l-align-center l-justify-between">'
          }
        },
        filterAfterLink: ({ item, index, depth, output }) => {
          const { title = '' } = item

          if (depth === 0) {
            let width = title.length * 18

            if (_isDropdown(item, depth)) {
              width += 25
            }

            if (_isButtonDropdown(item, depth)) {
              width += 60
            }

            itemWidths[index] = width
          }

          if (_isDropdown(item, depth)) {
            collapsibleId = uuid()

            output.html += `
                <button class="o-collapsible__toggle t-current l-pl-4xs l-py-5xs no-js-none" type="button" aria-controls="${collapsibleId}" aria-expanded="false" aria-label="${title} submenu">
                  ${CaretSvgHtml('down', 'l-flex l-wd-3xs l-ht-3xs e-trans')}
                </button>
              </div>
            `
          }
        },
        filterBeforeLinkText: ({ item, depth, output }) => {
          if (depth === 1 && listType === 'cta') {
            output.html += '<b>'
          }

          if (_isButtonDropdown(item, depth)) {
            output.html += '<span class="l-pr-4xs">'
          }
        },
        filterAfterLinkText: ({ item, depth, output }) => {
          const { description } = item

          if (depth === 1 && listType === 'cta') {
            output.html += `</b>${isStringStrict(description) ? ` <br>${description}` : ''}`
          }

          if (_isButtonDropdown(item, depth)) {
            output.html += `
              </span>
              ${CaretSvgHtml('down', 'l-flex l-wd-3xs l-ht-3xs e-trans no-js-none')}
            `
          }
        }
      }
    ),
    footer: nav.getOutput(
      'footer',
      {
        listClass: 'l-flex l-col l-gap-3xs t-ls-none e-line-r',
        listAttr: 'role="list"',
        linkClass: 't-r',
        internalLinkClass: 'js-pt-link',
        linkAttr: 'data-rich'
      },
      0
    ),
    social: nav.getOutput(
      'social',
      {
        listClass: 'l-flex l-wrap l-gap-2xs t-ls-none',
        listAttr: 'role="list"',
        linkClass: 'l-flex l-align-center l-justify-center l-relative l-wd-s l-ht-s b-radius-full b-all e-color e-trans',
        filterBeforeLinkText: ({ output }) => {
          output.html += '<span class="a-hide-vis">'
        },
        filterAfterLinkText: ({ item, output }) => {
          const { title = '' } = item
          const t = title.toLowerCase()

          output.html += '</span>'

          output.html += SocialSvgHtml(t, 'l-flex l-wd-2xs l-ht-2xs')
        }
      }
    )
  }

  /* Get largest width */

  if (itemWidths.length !== 0 && itemMidIndex !== 0) {
    const firstWidths = itemWidths.slice(0, itemMidIndex)
    const secondWidths = itemWidths.slice(itemMidIndex, itemWidths.length)

    const firstTotal = firstWidths.reduce((a, b) => a + b, 0)
    const secondTotal = secondWidths.reduce((a, b) => a + b, 0)

    configHtmlVars.navHalf = Math.max(firstTotal, secondTotal)
  }

  /* Output */

  return output
}

/**
 * Function - output nav element with contents
 *
 * @param {import('./NavigationsHtmlTypes').NavigationArgs} args
 * @return {string}
 */
const NavigationHtml = (args: NavigationArgs): string => {
  /* Args must be object */

  if (!isObjectStrict(args)) {
    return ''
  }

  const {
    navigations,
    props
  } = args

  /* Props must be object */

  if (!isObjectStrict(props)) {
    return ''
  }

  /* Props */

  const {
    location = 'main',
    title = ''
  } = props

  /* Location, title and navigation required */

  if (!isStringStrict(location) || !isStringStrict(title)) {
    return ''
  }

  if (!isStringStrict(navigations[location])) {
    return ''
  }

  /* Output */

  return `<nav aria-label="${title}">${navigations[location]}</nav>`
}

/* Exports */

export { NavigationsHtml, NavigationHtml }
