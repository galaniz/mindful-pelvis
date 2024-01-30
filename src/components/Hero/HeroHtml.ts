/**
 * Components - Hero Html
 */

/* Imports */

import type { HeroArgs } from './HeroHtmlTypes'
import {
  getImage,
  addScriptStyle,
  isString
} from '@alanizcreative/static-site-formation/lib/utils'
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
      source: true,
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

    imageOutput = `
      <picture class="l-relative l-block l-overflow-hidden l-height-100-pc" style="padding-top:${imageResAspectRatio * 100}%">
        ${imageResOutput}
      </picture>
    `
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

  if (text !== '') {
    let textClasses = 't-l'

    if (callToActionOutput !== '') {
      textClasses += ' l-padding-bottom-2xs l-padding-bottom-xs-m'
    }

    textOutput += `<p class="${textClasses}">${text}</p>`

    if (overlap) {
      textOutput = `
        <div class="l-margin-bottom-3xs-all l-margin-bottom-2xs-all-m">
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
      <section class="c-hero l-container l-flex l-flex-column l-flex-row-l l-padding-bottom-m-l">
        <div class="c-hero__text bg-${overlapBg} t-light l-flex-shrink-0 l-relative l-z-index-1 l-width-4-5-m l-width-3-5-l l-padding-top-2xs l-padding-left-xs l-padding-right-xs l-padding-bottom-xs l-padding-top-s-m l-padding-left-m-m l-padding-right-m-m l-padding-bottom-m-m">
          ${textOutput}
        </div>
        <div class="c-hero__media l-width-1-1 l-order-first l-relative l-overflow-hidden">
          ${imageOutput}
        </div>
      </section>
    `
  }

  /* Minimal */

  return ''
}

/* Exports */

export { HeroHtml }
