/**
 * Render - navigations
 */

/* Imports */

const Navigation = require('./navigation')
const socialSvg = require('./svg/social')

/**
 * Function - output navigations
 *
 * @param {object} args {
 *  @prop {array<object>} navs
 *  @prop {array<object>} items
 *  @prop {string} current
 * }
 */

const navigations = ({
  navs = [],
  items = [],
  current = ''
}) => {
  /* Navs and items required */

  if (!navs.length && !items.length) {
    return {
      main: '',
      footer: '',
      social: {
        left: '',
        center: ''
      }
    }
  }

  /* Navigation instance */

  const nav = new Navigation({ navs, items })

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
        linkClass: 'c-nav__link t-r t-line-height-130-pc l-inline-flex l-relative l-after',
        internalLinkClass: 'js-pt-link'
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
        linkAttr: 'data-inline'
      }
    ),
    social: nav.getOutput(
      'social',
      current,
      {
        listClass: 'l-flex l-flex-wrap l-gap-margin-2xs t-list-style-none',
        listAttr: 'role="list"',
        linkClass: 'l-flex l-align-center l-justify-center l-width-s l-height-s b-radius-100-pc b-all',
        filterBeforeLinkText: (args, item, output) => {
          output.html += '<span class="a11y-visually-hidden">'
        },
        filterAfterLinkText: (args, item, output) => {
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

/* Exports */

module.exports = navigations
