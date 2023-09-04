/**
 * Components - navigations html
 */

/* Imports */

import Navigation from '@alanizcreative/static-site-formation/lib/components/navigation'
import socialSvg from '../../../svg/social/html'

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

const navigations = ({
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

  const nav = new Navigation({ navigations, items })

  /* Attributes */

  const linkClass = 'c-nav__link t-height-130-pc l-inline-flex'
  const itemClass = 'c-nav__item'
  const listClass = 'c-nav__list t-list-style-none l-flex'
  const listClassZero = `${listClass} l-flex-grow-1 l-align-center l-gap-margin-xs l-gap-margin-s-m l-overflow-x-auto l-overflow-y-hidden`

  /* Output */

  return {
    main: nav.getOutput(
      'main',
      current,
      {
        listClass: listClassZero,
        listAttr: 'role="list"',
        itemClass,
        itemAttr: 'data-overflow-group="0"',
        linkClass,
        internalLinkClass: 'js-pt-link',
        filterBeforeList: ({ args, depth }: FRM.NavigationFilterArgs) => {
          if (depth > 0) {
            args.listClass = `${listClass} l-flex-column l-padding-top-4xs l-padding-bottom-4xs`
          }
        },
        filterBeforeItem: ({ args, index, item, items, depth }: FRM.NavigationFilterArgs) => {
          const { style = 'Text', children } = item

          const dropdownButton = style === 'Button' && children !== undefined

          let newLinkClass = linkClass
          let newItemClass = itemClass

          if (depth === 0) {
            newLinkClass += ' t-r'

            if (dropdownButton) {
              newLinkClass = 'o-button o-button-main bg-primary-base b-radius-l l-overflow-hidden l-relative l-z-index-1 l-before'
            }
          } else {
            newLinkClass += ' t-s l-padding-top-5xs l-padding-bottom-5xs'
            newItemClass += ' l-padding-top-5xs l-padding-bottom-5xs'
          }

          args.itemClass = newItemClass
          args.linkClass = newLinkClass
          args.linkAttr = dropdownButton ? 'aria-expanded="false" aria-controls=""' : ''

          /* Mid item */

          if (depth > 0) {
            return
          }

          const odd = items.length % 2 !== 0

          let mid = Math.round(items.length / 2)

          if (odd) {
            mid -= 1
          }

          if (index === mid) {
            args.itemAttr = 'data-mid'
          } else {
            args.itemAttr = ''
          }
        }
      }
    ),
    footer: nav.getOutput(
      'footer',
      current,
      {
        listClass: 'l-flex l-flex-column l-gap-margin-3xs t-list-style-none e-underline-reverse',
        listAttr: 'role="list"',
        linkClass: 't-r t-height-130-pc',
        internalLinkClass: 'js-pt-link',
        linkAttr: 'data-rich'
      },
      0
    ),
    social: nav.getOutput(
      'social',
      current,
      {
        listClass: 'l-flex l-flex-wrap l-gap-margin-2xs t-list-style-none',
        listAttr: 'role="list"',
        linkClass: 'l-flex l-align-center l-justify-center l-relative l-width-s l-height-s b-radius-100-pc b-all',
        filterBeforeLinkText: ({ output }: FRM.NavigationFilterArgs) => {
          output.html += '<span class="a11y-visually-hidden">'
        },
        filterAfterLinkText: ({ item, output }: FRM.NavigationFilterArgs) => {
          const { title = '' } = item
          const t = title.toLowerCase()

          output.html += '</span>'

          output.html += socialSvg(t, 'l-flex l-width-2xs l-height-2xs')
        }
      }
    )
  }
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

export const navigation = ({ navigations = {}, props = {} }: NavArgs): string => {
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

export default navigations
