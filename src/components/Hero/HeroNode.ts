/**
 * Components - Hero Node
 */

/* Imports */

import type { HeroArgs } from './HeroNodeTypes'
import { isStringStrict, isObjectStrict, getTaxonomyInfo } from '@alanizcreative/static-site-formation/iop/utils/utils'
import { ButtonNode } from '../../objects/Button/ButtonNode'
import { configNodeVars } from '../../config/configNode'
import { ImageNode } from '../../objects/Image/ImageNode'
import { ImageMinimalNode } from '../../objects/Image/ImageMinimalNode'

/**
 * Function - output hero
 *
 * @param {HeroArgs} args
 * @return {string} HTML - section
 */
const HeroNode = async (args: HeroArgs): Promise<string> => {
  /* Args must be object */

  if (!isObjectStrict(args)) {
    return ''
  }

  /* Args */

  const {
    contentType = 'page',
    archive = '',
    title = '',
    text = '',
    image,
    imageMinimal,
    callToAction,
    pageData
  } = args

  let {
    type = 'Minimal'
  } = args

  /* Normalize options */

  const initType = type

  type = configNodeVars.options.heroType[type]

  const overlap = initType.includes('Overlap')
  const overlapBg = overlap ? configNodeVars.options.color[type] : ''

  /* Image */

  let imageOutput = ''
  let imageMinOutput = ''
  let isImageMin = false

  if (imageMinimal !== undefined) {
    isImageMin = true

    imageMinOutput = await ImageMinimalNode({
      image: imageMinimal,
      assetClasses: 'l-m-auto',
      assetContainerClasses: 'l-pb-xs l-pb-s-m',
      imageContainerClasses: 'c-hero-figure l-pb-s l-pb-m-m l-m-auto',
      includeTheme: true,
      maxWidth: 720
    })
  }

  if (image !== undefined && imageMinOutput === '') {
    imageOutput = await ImageNode({
      args: {
        image,
        lazy: false,
        maxWidth: 1600,
        classes: overlap ? 'l-ht-full' : 'c-hero-minimal'
      }
    })

    if (type === 'minimal') {
      imageOutput = imageOutput !== '' ? `<div class="l-pt-s l-pt-m-l">${imageOutput}</div>` : ''
    }
  }

  /* Call to Action */

  let callToActionOutput = ''

  if (overlap && callToAction !== undefined) {
    callToActionOutput = ButtonNode({
      args: {
        color: 'Beige',
        ...callToAction
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

  if (contentType === 'post') {
    const date = pageData.date
    const dateMod = pageData.dateModified
    const dateArgs = {
      month: 'short' as const, // Workaround no overload matches this call error
      year: 'numeric' as const,
      day: '2-digit' as const
    }

    let dateOutput = ''

    if (isStringStrict(date)) {
      const pubDate = new Date(date)
      const formattedDate = pubDate.toLocaleString('en', dateArgs)

      dateOutput += `<time datetime="${date}">${formattedDate}</time>`
    }

    if (isStringStrict(dateMod)) {
      const modDate = new Date(dateMod)
      const formattedDate = modDate.toLocaleString('en', dateArgs)

      dateOutput += '<span class="t-wt-bold l-none l-block-s" aria-hidden="true">&middot;</span>'
      dateOutput += `<span>Updated <time class="l-inline-block" datetime="${dateMod}">${formattedDate}</time></span>`
    }

    if (dateOutput !== '') {
      textOutput += `
        <p class="t-s t-ht-snug l-pt-xs l-pt-s-m l-flex l-col l-row-s l-justify-center l-gap-4xs">
          ${dateOutput}
        </p>`
    }
  }

  /* Overlap and styles */

  if (overlap) {
    return `
      <section class="c-hero-overlap l-container l-flex l-col l-row-l l-pb-m-l l-mb-m l-mb-l-l">
        <div class="c-hero-overlap__text bg-${overlapBg} t-light l-shrink-0 l-relative l-z-index-1 l-col-12 l-col-10-m l-col-7-l l-pt-2xs l-px-xs l-pb-xs l-pt-s-m l-px-m-m l-pb-m-m">
          ${textOutput}
        </div>
        <div class="c-hero-overlap__media l-col-12 l-order-first l-relative l-overflow-hidden">
          ${imageOutput}
        </div>
      </section>
    `
  }

  /* Minimal */

  let center = contentType === 'post' || contentType === 'service' || archive === 'post'

  if (contentType === 'term' || contentType === 'taxonomy') {
    const taxonomyInfo = getTaxonomyInfo(contentType, pageData)
    const { contentType: taxonomyType } = taxonomyInfo

    if (taxonomyType === 'post') {
      center = true
    }
  }

  return `
    <section class="l-py-m l-pb-l-l${!isImageMin ? ' l-pt-xl-l' : ''}">
      <div class="l-container${center ? ' t-align-center' : ''}">
        ${imageMinOutput}
        ${textOutput}
      </div>
      ${imageOutput}
    </section>
  `
}

/* Exports */

export { HeroNode }
