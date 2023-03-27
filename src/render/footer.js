/**
 * Render - footer
 */

/* Imports */

const { enumSite } = require('../vars/enums')
const { getPermalink, getYear } = require('../utils')
const logoSvg = require('./svg/logo')

/**
 * Function - output footer
 *
 * @param {object} navigations
 * @return {string} HTML - footer
 */

const footer = (navigations = {}) => {
  /* Footer and/or social navs */

  let navs = ''

  if (navigations?.footer || navigations?.social?.center) {
    const navFooter = navigations?.footer ? `<nav aria-label="Main">${navigations.footer}</nav>` : ''
    const navSocial = navigations?.social?.center ? `<nav aria-label="Social">${navigations.social.center}</nav>` : ''

    navs = `
      <div>
        <div class="l-flex l-flex-wrap l-align-center l-justify-center l-gap-margin-s">
          ${navFooter}
          ${navSocial}
        </div>
      </div>
    `
  }

  /* Output */

  return `
    <footer class="bg-foreground-dark t-light l-margin-top-auto">
      <div class="l-container l-padding-top-m l-padding-bottom-m l-padding-top-xl-m l-padding-bottom-xl-m">
        <div class="l-flex l-flex-wrap l-justify-between l-align-center l-gap-margin-s">
          <div>
            <a class="o-logo-s l-block l-svg js-pt-link" href="${getPermalink()}" data-theme="light">
              <span class="a11y-visually-hidden">${enumSite.title} home</span>
              ${logoSvg()}
            </a>
          </div>
          ${navs}
          <div>
            <span class="t-s">&copy; ${getYear()} ${enumSite.title}</span>
          </div>
        </div>
      </div>
    </footer>
  `
}

/* Exports */

module.exports = footer
