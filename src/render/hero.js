/**
 * Render - hero
 */

/* Imports */

const { getImage } = require('../utils')
const { enumOptions } = require('../vars/enums')
const button = require('./button')

/**
 * Function - output hero
 *
 * @param {object} args {
 *  @prop {string} contentType
 *  @prop {string} type
 *  @prop {string} title
 *  @prop {string} text
 *  @prop {object} image
 *  @prop {object} callToAction
 * }
 * @return {string} HTML - section
 */

const hero = (args = {}) => {
  let {
    contentType = 'page',
    type = 'Minimal',
    title = '',
    text = '',
    image = {},
    callToAction
  } = args

  /* Normalize options */

  type = enumOptions.hero.type[type]
  overlay = type.includes('overlay')
  overlayBg = overlay ? enumOptions.hero.background[type] : ''

  /* Image */

  let imageOutput = ''

  if (image?.fields) {
    imageOutput = getImage({
      data: image?.fields,
      classes: 'l-absolute l-top-0 l-left-0 l-width-100-pc l-height-100-pc l-object-cover',
      lazy: false,
      max: 1600
    })
  }

  /* Call to Action */

  let callToActionOutput = ''

  if (overlay && callToAction) {
    callToActionOutput = button({
      args: {
        theme: 'light',
        ...callToAction.fields
      }
    })
  }

  /* Text */

  let textOutput = `<h1>${title}</h1>`

  if (text) {
    let textClasses = 't-l'

    if (callToActionOutput) {
      textClasses += ' l-padding-bottom-2xs l-padding-bottom-xs-m'
    }

    textOutput += `<p class="${textClasses}">${text}</p>`

    if (overlay) {
      textOutput = `
        <div class="l-margin-bottom-3xs-all l-margin-bottom-2xs-all-m">
          ${textOutput}
        </div>
        ${callToActionOutput}
      `
    }
  }

  /* Overlay */

  if (overlay) {
    return `
      <section class="c-overlay l-container l-flex l-flex-column l-flex-row-l l-padding-bottom-m-l">
        <div class="c-overlay__text bg-${overlayBg} t-light l-flex-shrink-0 l-relative l-z-index-1 l-width-4-5-m l-width-3-5-l l-padding-top-2xs l-padding-left-xs l-padding-right-xs l-padding-bottom-xs l-padding-top-s-m l-padding-left-m-m l-padding-right-m-m l-padding-bottom-m-m">
          ${textOutput}
        </div>
        <div class="c-overlay__media l-width-1-1 l-order-first l-relative l-overflow-hidden">
          ${imageOutput}
        </div>
      </section>
    `
  }

  /* Minimal */

  return ''
}

/* Exports */

module.exports = hero
