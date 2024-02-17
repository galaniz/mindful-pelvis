/**
 * Components - Layout Html
 */

/* Imports */

import type { LayoutArgs } from './LayoutHtmlTypes'
import { getPermalink, isStringStrict } from '@alanizcreative/static-site-formation/lib/utils/utilsMin'
import { configHtml, configHtmlVars } from '../../config/configHtml'
import { HeaderHtml } from '../Header/HeaderHtml'
import { FooterHtml } from '../Footer/FooterHtml'
import { HeroHtml } from '../Hero/HeroHtml'

/**
 * Function - output html
 *
 * @param {LayoutArgs} args
 * @return {Promise<string>} HTML - html
 */
const LayoutHtml = async ({
  id = '',
  meta,
  navigations,
  contentType = 'page',
  content = '',
  pageData
}: LayoutArgs): Promise<string> => {
  /* Assets link */

  const assetsLink = `${getPermalink()}assets/`

  /* Namespace */

  const ns = configHtml.namespace

  /* Meta */

  let {
    title = '',
    paginationTitle = '',
    description = '',
    url = '',
    image,
    canonical = '',
    prev = '',
    next = '',
    noIndex = false
  } = meta

  /* Title */

  if (title === '') {
    title = configHtml.title
  } else {
    title = `${title}${paginationTitle !== '' ? ` | ${paginationTitle}` : ''} | ${configHtml.title}`
  }

  /* Description */

  if (description === '') {
    description = configHtml.meta.description
  }

  /* Image */

  let imageLink = `${assetsLink}${configHtml.meta.image}`

  if (isStringStrict(image)) {
    imageLink = image
  }

  /* Canonical */

  if (canonical !== '') {
    canonical = `<link rel="canonical" href="${canonical}">`
  }

  /* Prev */

  if (prev !== '') {
    prev = `<link rel="prev" href="${prev}">`
  }

  /* Next */

  if (next !== '') {
    next = `<link rel="next" href="${next}">`
  }

  /* No index */

  if (configHtml.env.dev) {
    noIndex = true
  }

  /* Preload font links */

  const preloadFonts = `
    <link rel="preload" href="${assetsLink}fonts/celine-regular.woff2" as="font" type="font/woff2" crossorigin>
    <link rel="preload" href="${assetsLink}fonts/karla-regular.woff2" as="font" type="font/woff2" crossorigin>
  `

  /* Theme color */

  const theme = configHtmlVars.theme

  /* Header, breadcrumbs and footer */

  let headerOutput = ''
  let footerOutput = ''

  if (navigations !== undefined) {
    headerOutput = HeaderHtml(navigations)
    footerOutput = FooterHtml(navigations)
  }

  /* Hero */

  let heroTitle = ''

  if (isStringStrict(pageData.pageTitle)) {
    heroTitle = pageData.pageTitle
  }

  if (isStringStrict(pageData.heroTitle)) {
    heroTitle = pageData.heroTitle
  }

  const heroOutput = HeroHtml({
    contentType,
    title: heroTitle,
    type: pageData.heroType,
    text: pageData.heroText,
    image: pageData.heroImage,
    callToAction: pageData.heroCallToAction,
    pageData
  })

  /* Content */

  const contentOutput: string = content

  /* Script data */

  let scriptMeta = ''

  if (Object.keys(configHtml.scriptMeta).length > 0) {
    const scriptJSON = JSON.stringify(configHtml.scriptMeta)

    scriptMeta = `
      <script>
        var namespace = '${ns}';
        var ${ns} = ${scriptJSON};
      </script>
    `
  }

  /* Clear script data */

  configHtml.scriptMeta = {}

  /* Scripts */

  const scriptFiles = configHtml.scripts.item
  const scriptsArray = Object.keys(scriptFiles)

  let scripts = ''

  if (configHtmlVars.js.out !== '') {
    scripts += `<script type="module" src="${assetsLink}${configHtmlVars.js.out}.js"></script>`
  }

  if (scriptsArray.length > 0) {
    scriptsArray.sort((a, b) => {
      const aPriority = scriptFiles[a]
      const bPriority = scriptFiles[b]

      return aPriority - bPriority
    })

    scriptsArray.forEach((s) => {
      scripts += `<script type="module" src="${assetsLink}${s}.js"></script>`
    })
  }

  /* Styles */

  const styleFiles = configHtml.styles.item
  const stylesArray = Object.keys(styleFiles)

  let styles = ''

  if (configHtmlVars.css.out !== '') {
    configHtmlVars.css.head = `<link rel="stylesheet" href="${assetsLink}${configHtmlVars.css.out}.css" media="all">`
  }

  if (stylesArray.length > 0) {
    stylesArray.sort((a, b) => {
      const aPriority = styleFiles[a]
      const bPriority = styleFiles[b]

      return aPriority - bPriority
    })

    stylesArray.forEach((s) => {
      styles += `<link rel="stylesheet" href="${assetsLink}${s}.css" media="all">`
    })
  }

  /* Svg sprites */

  const svgIds = Object.keys(configHtmlVars.svg)

  let spritesOutput = ''

  if (svgIds.length > 0) {
    svgIds.forEach((id) => {
      const svgData = configHtmlVars.svg[id]
      const { viewBox = '', output = '' } = svgData

      spritesOutput += `<symbol id="${id}" viewBox="${viewBox}">${output}</symbol>`
    })

    spritesOutput = `
      <svg xmlns="http://www.w3.org/2000/svg" class="l-none">
        ${spritesOutput}
      </svg>
    `
  }

  /* Output */

  return `
    <!DOCTYPE html>
    <html lang="en" id="${ns}" data-root>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>${title}</title>
        ${preloadFonts}
        ${noIndex ? '<meta name="robots" content="noindex, nofollow">' : ''}
        <meta name="description" content="${description}">
        ${canonical}
        ${prev}
        ${next}
        <meta name="image" content="${imageLink}">
        <meta property="og:url" content="${url}">
        <meta property="og:title" content="${title}">
        <meta property="og:description" content="${description}">
        <meta property="og:image" content="${imageLink}">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="${title}">
        <meta name="twitter:description" content="${description}">
        <meta name="twitter:image" content="${imageLink}">
        <meta content="summary_large_image" property="twitter:card">
        ${configHtmlVars.head}
        ${configHtmlVars.css.head}
        ${styles}
        <noscript>
          <style>
            .no-js-none {
              display: none;
            }

            .no-js-nav {
              flex-wrap: wrap;
              overflow: hidden;
            }
          </style>
        </noscript>
        <link rel="apple-touch-icon" sizes="180x180" href="${assetsLink}favicon/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="${assetsLink}favicon/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="${assetsLink}favicon/favicon-16x16.png">
        <link rel="manifest" href="${assetsLink}favicon/site.webmanifest">
        <meta name="msapplication-TileColor" content="${theme['foreground-dark']}">
        <meta name="theme-color" content="${theme['background-dark']}">
        <meta name="format-detection" content="telephone=no">
      </head>
      <body class="${ns} no-js l-flex l-flex-column">
        ${spritesOutput}
        ${headerOutput}
        <main id="main">
          ${heroOutput}
          ${contentOutput}
        </main>
        ${footerOutput}
        ${scriptMeta}
        ${scripts}
      </body>
    </html>
  `
}

/* Exports */

export { LayoutHtml }
