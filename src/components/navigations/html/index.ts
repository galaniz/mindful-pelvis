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

  const mainLinkClass = 'c-nav__link t-r t-line-height-130-pc l-inline-flex l-relative l-after'

  /* Output */

  return {
    main: nav.getOutput(
      'main',
      current,
      {
        listClass: 'c-nav__list l-relative l-flex l-align-center l-gap-margin-s t-list-style-none l-overflow-x-auto l-overflow-y-hidden',
        listAttr: 'role="list"',
        itemClass: 'c-nav__item',
        itemAttr: 'data-overflow-group="0"',
        linkClass: mainLinkClass,
        internalLinkClass: 'js-pt-link',
        filterBeforeLink: (args: FRM.NavigationArgs, item: FRM.NavigationItem, output: FRM.NavigationOutput) => {
          const { style = 'Text', children } = item

          const dropdownButton = style === 'Button' && children !== undefined

          args.linkAttr = dropdownButton ? 'aria-expanded="false" aria-controls=""' : ''
          args.linkClass = dropdownButton ? 'o-button o-button-main bg-primary-base b-radius-l l-overflow-hidden l-relative l-z-index-1 l-before' : mainLinkClass
        }
      }
    ),
    footer: nav.getOutput(
      'footer',
      current,
      {
        listClass: 'l-flex l-flex-wrap l-justify-center l-gap-margin-3xs t-list-style-none e-underline-reverse',
        listAttr: 'role="list"',
        linkClass: 't-r',
        internalLinkClass: 'js-pt-link',
        linkAttr: 'data-rich'
      }
    ),
    social: nav.getOutput(
      'social',
      current,
      {
        listClass: 'l-flex l-flex-wrap l-gap-margin-2xs t-list-style-none',
        listAttr: 'role="list"',
        linkClass: 'l-flex l-align-center l-justify-center l-width-s l-height-s b-radius-100-pc b-all',
        filterBeforeLinkText: (_args: FRM.NavigationArgs, _item: FRM.NavigationItem, output: FRM.NavigationOutput) => {
          output.html += '<span class="a11y-visually-hidden">'
        },
        filterAfterLinkText: (_args: FRM.NavigationArgs, item: FRM.NavigationItem, output: FRM.NavigationOutput) => {
          const { title = '' } = item
          const t = title.toLowerCase()

          output.html += '</span>'

          const icon = `
            <div class="l-flex l-width-2xs l-height-2xs l-svg">
              ${socialSvg(t)}
            </div>
          `

          output.html += icon
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
