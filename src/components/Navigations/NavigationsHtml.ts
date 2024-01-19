/**
 * Components - Navigations Html
 */

/* Imports */

import { v4 as uuid } from 'uuid'
import { Navigation } from '@alanizcreative/static-site-formation/lib/components/Navigation/Navigation'
import { SocialSvgHtml } from '../../svg/Social/SocialHtml'
import { CaretSvgHtml } from '../../svg/Caret/CaretHtml'
import { configHtml } from '../../config/configHtml'

/**
 * Function - check if text dropdown
 *
 * @private
 * @param {object} item
 * @param {number} depth
 * @return {boolean}
 */

const _isDropdown = (item: FRM.NavigationItem, depth: number): boolean => {
  const { style = 'Text', children } = item

  return children !== undefined && depth === 0 && style === 'Text'
}

/**
 * Function - check if button dropdown
 *
 * @private
 * @param {object} item
 * @param {number} depth
 * @return {boolean}
 */

const _isButtonDropdown = (item: FRM.NavigationItem, depth: number): boolean => {
  const { style = 'Text', children } = item

  return children !== undefined && depth === 0 && style === 'Button'
}

/**
 * Function - check if button style
 *
 * @private
 * @param {object} item
 * @return {boolean}
 */

const _isButton = (item: FRM.NavigationItem): boolean => {
  const { style = 'Text' } = item

  return style === 'Button'
}

/**
 * Function - output navigations
 *
 * @param {object} args
 * @param {object[]} args.navigations
 * @param {object[]} args.items
 * @param {string} args.current
 * @return {object}
 */

interface NavigationsArgs {
  navigations: FRM.Navigation[]
  items: FRM.NavigationItem[]
  current: string
}

const NavigationsHtml = ({
  navigations = [],
  items = [],
  current = ''
}: NavigationsArgs): MP.NavigationsReturn => {
  /* Navs and items required */

  if (navigations.length === 0 || items.length === 0) {
    return {
      main: '',
      footer: '',
      social: ''
    }
  }

  /* Navigation instance */

  const nav = new Navigation({ navigations, items, current })

  /* Attributes */

  const linkClass = 'c-nav__link t-height-150-pc l-inline-flex'
  const itemClass = 'c-nav__item'
  const listAttr = 'role="list"'
  const listClass = 'c-nav__list t-list-style-none t-link-current l-flex'
  const listClassZero = `${listClass} l-align-center l-gap-margin-xs l-gap-margin-s-s l-overflow-x-auto l-overflow-y-hidden`

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
        filterBeforeList: ({ args, depth }: FRM.NavigationFilterArgs) => {
          if (depth > 0) {
            args.listClass = `${listClass} o-collapsible__main e-transition l-flex-column no-js-none`
            args.listAttr = `${listAttr} data-type="${listType}" id="${collapsibleId}"`
          } else {
            args.listAttr = listAttr
          }
        },
        filterBeforeItem: ({ args, index, item, items, depth, output }: FRM.NavigationFilterArgs) => {
          const newItemAttr: string[] = []

          let newListType = listType
          let newLinkClass = linkClass
          let newItemClass = itemClass
          let newLinkAttr = ''

          if (depth === 0) {
            newLinkClass += ' t-r'
            newItemClass += ' e-transition'

            if (index === 0) {
              output.html += '<li role="presentation" class="c-nav__width no-js-none l-padding-0 l-relative l-before"></li>'
            }
          } else {
            newLinkClass += ' t-s l-padding-top-5xs l-padding-bottom-5xs'
            newItemClass += ' l-padding-top-5xs l-padding-bottom-5xs'
          }

          if (_isButton(item)) {
            newLinkClass = 'c-nav__cta o-button o-button-main b-radius-l l-flex l-align-center l-justify-between l-overflow-hidden l-relative l-z-index-1 l-before'
          }

          if (_isButtonDropdown(item, depth)) {
            collapsibleId = uuid()
            newLinkAttr = `aria-expanded="false" aria-controls="${collapsibleId}"`
            newLinkClass += ' o-collapsible__toggle'
            newListType = 'cta'
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
        filterBeforeLink: ({ item, depth, output }: FRM.NavigationFilterArgs) => {
          if (_isDropdown(item, depth)) {
            output.html += '<div class="l-flex l-align-center l-justify-between">'
          }
        },
        filterAfterLink: ({ item, index, depth, output }: FRM.NavigationFilterArgs) => {
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
                <button class="o-collapsible__toggle t-current l-padding-left-4xs l-padding-top-5xs l-padding-bottom-5xs no-js-none" type="button" aria-controls="${collapsibleId}" aria-expanded="false" aria-label="${title} submenu">
                  ${CaretSvgHtml('down', 'l-flex l-width-3xs l-height-3xs')}
                </button>
              </div>
            `
          }
        },
        filterBeforeLinkText: ({ item, depth, output }: FRM.NavigationFilterArgs) => {
          if (_isButtonDropdown(item, depth)) {
            output.html += '<span class="l-padding-right-4xs">'
          }
        },
        filterAfterLinkText: ({ item, depth, output }: FRM.NavigationFilterArgs) => {
          if (_isButtonDropdown(item, depth)) {
            output.html += `
              </span>
              ${CaretSvgHtml('down', 'l-flex l-width-3xs l-height-3xs no-js-none')}
            `
          }
        }
      }
    ),
    footer: nav.getOutput(
      'footer',
      {
        listClass: 'l-flex l-flex-column l-gap-margin-3xs t-list-style-none e-underline-reverse',
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
        listClass: 'l-flex l-flex-wrap l-gap-margin-2xs t-list-style-none',
        listAttr: 'role="list"',
        linkClass: 'l-flex l-align-center l-justify-center l-relative l-width-s l-height-s b-radius-100-pc b-all',
        filterBeforeLinkText: ({ output }: FRM.NavigationFilterArgs) => {
          output.html += '<span class="a-visually-hidden">'
        },
        filterAfterLinkText: ({ item, output }: FRM.NavigationFilterArgs) => {
          const { title = '' } = item
          const t = title.toLowerCase()

          output.html += '</span>'

          output.html += SocialSvgHtml(t, 'l-flex l-width-2xs l-height-2xs')
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

    configHtml.vars.navHalf = Math.max(firstTotal, secondTotal)
  }

  /* Output */

  return output
}

/**
 * Function - output nav element with contents
 *
 * @param {object} args
 * @param {object} args.navigations
 * @param {object} args.props
 * @return {string}
 */

interface NavArgs {
  navigations: {
    [key: string]: any
  }
  props: {
    location?: string
    title?: string
  }
}

const NavigationHtml = ({ navigations = {}, props = {} }: NavArgs): string => {
  const { location = '', title = '' } = props

  if (location !== '' && title !== '') {
    const loc = location.toLowerCase().replace(/ /g, '')

    let nav = ''

    if (loc === 'social') {
      nav = navigations?.[loc]?.left !== '' ? navigations[loc].left : ''
    } else {
      nav = navigations?.[loc] !== '' ? navigations[loc] : ''
    }

    return `<nav aria-label="${title}">${nav}</nav>`
  }

  return ''
}

/* Exports */

export { NavigationsHtml, NavigationHtml }
