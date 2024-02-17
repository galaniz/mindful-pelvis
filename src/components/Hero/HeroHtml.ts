/**
 * Components - Hero Html
 */

/* Imports */

import type { HeroArgs } from './HeroHtmlTypes'
import {
  getImage,
  addScriptStyle,
  isStringStrict,
  isString
} from '@alanizcreative/static-site-formation/lib/utils/utilsMin'
import { ButtonHtml } from '../../objects/Button/ButtonHtml'
import { configHtmlVars } from '../../config/configHtml'

/**
 * Function - output hero
 *
 * @param {HeroArgs} args
 * @return {string} HTML - section
 */
const HeroHtml = ({
  contentType = 'page',
  type = 'Minimal',
  title = '',
  text = '',
  image,
  callToAction
}: HeroArgs): string => {
  /* Normalize options */

  type = configHtmlVars.options.hero.type[type]

  const overlap = type.includes('overlap')
  const overlapBg = overlap ? configHtmlVars.options.hero.background[type] : ''

  /* Image */

  let imageOutput = ''

  if (image !== undefined) {
    const maxWidth = overlap ? 1600 : 2000
    const imageRes = getImage({
      data: image,
      classes: 'l-absolute l-top-0 l-left-0 l-width-100-pc l-height-100-pc l-object-cover',
      returnAspectRatio: true,
      lazy: false,
      picture: true,
      maxWidth
    })

    let imageResAspectRatio = 0
    let imageResOutput = ''

    if (isString(imageRes)) {
      imageResOutput = imageRes
    } else {
      imageResAspectRatio = imageRes.aspectRatio
      imageResOutput = imageRes.output
    }

    let pictureClasses = 'l-relative l-block l-overflow-hidden'
    let pictureStyle = ''

    if (overlap) {
      pictureClasses += ' l-height-100-pc'
      pictureStyle = ` style="padding-top:${imageResAspectRatio * 100}%"`
    } else {
      pictureClasses += ' c-hero-min'
    }

    imageOutput = `
      <picture class="${pictureClasses}"${pictureStyle}>
        ${imageResOutput}
      </picture>
    `

    if (type === 'minimal') {
      imageOutput = `
        <div class="l-pt-s l-pt-m-l">
          ${imageOutput}
        </div>
      `
    }
  }

  /* Call to Action */

  let callToActionOutput = ''

  if (overlap && callToAction !== undefined) {
    callToActionOutput = ButtonHtml({
      args: {
        theme: 'light',
        ...callToAction.fields
      }
    })
  }

  /* Text */

  let textOutput = `<h1>${title}</h1>`

  if (isStringStrict(text)) {
    let textClasses = 't-l'

    if (callToActionOutput !== '') {
      textClasses += ' l-pb-2xs l-pb-xs-m'
    }

    if (type === 'minimal') {
      textClasses += ' l-pt-2xs'
    }

    textOutput += `<p class="${textClasses}">${text}</p>`

    if (overlap) {
      textOutput = `
        <div class="l-mb-3xs-all l-mb-2xs-all-m">
          ${textOutput}
        </div>
        ${callToActionOutput}
      `
    }
  }

  /* Add styles */

  addScriptStyle({
    dir: 'components/Hero',
    style: 'Hero'
  })

  /* Overlap  */

  if (overlap) {
    return `
      <section class="c-hero-overlap l-container l-flex l-flex-column l-flex-row-l l-pb-m-l">
        <div class="c-hero-overlap__text bg-${overlapBg} t-light l-flex-shrink-0 l-relative l-z-index-1 l-width-4-5-m l-width-3-5-l l-pt-2xs l-px-xs l-pb-xs l-pt-s-m l-px-m-m l-pb-m-m">
          ${textOutput}
        </div>
        <div class="c-hero-overlap__media l-width-1-1 l-order-first l-relative l-overflow-hidden">
          ${imageOutput}
        </div>
      </section>
    `
  }

  /* Minimal */

  return `
    <section class="l-pt-m l-pt-xl-l">
      <div class="l-container">
        ${textOutput}
      </div>
      ${imageOutput}
    </section>
  `
}

/* Exports */

export { HeroHtml }
