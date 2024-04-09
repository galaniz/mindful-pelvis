/**
 * Components - Layout Html
 */

/* Imports */

import type { LayoutArgs } from './LayoutHtmlTypes'
import {
  getPermalink,
  isStringStrict,
  isArrayStrict,
  isObjectStrict
} from '@alanizcreative/static-site-formation/iop/utils/utils'
import { configHtml, configHtmlVars } from '../../config/configHtml'
import { HeaderHtml } from '../Header/HeaderHtml'
import { FooterHtml } from '../Footer/FooterHtml'
import { HeroHtml } from '../Hero/HeroHtml'
import { ArticleHtml } from '../Article/ArticleHtml'
import { BackLinkHtml } from '../../objects/BackLink/BackLinkHtml'
import { BlobsHtml } from '../Blobs/BlobsHtml'

/**
 * Function - output html
 *
 * @param {LayoutArgs} args
 * @return {Promise<string>} HTML - html
 */
const LayoutHtml = async (args: LayoutArgs): Promise<string> => {
  /* Args must be object */

  if (!isObjectStrict(args)) {
    return ''
  }

  /* Args */

  const {
    meta,
    navigations,
    contentType = 'page',
    content = '',
    pageHeadings,
    pageData
  } = args

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
  let heroArchive = ''

  if (isStringStrict(pageData.title)) {
    heroTitle = pageData.title
  }

  if (isStringStrict(pageData.heroTitle)) {
    heroTitle = pageData.heroTitle
  }

  if (isStringStrict(pageData.archive)) {
    heroArchive = configHtmlVars.options.posts.contentType[pageData.archive]
  }

  const heroOutput = await HeroHtml({
    contentType,
    title: heroTitle,
    type: pageData.heroType,
    archive: heroArchive,
    text: pageData.heroText,
    image: pageData.heroImage,
    imageMinimal: pageData.heroImageMinimal,
    callToAction: pageData.heroCallToAction,
    pageData
  })

  /* Back link */

  let backLinkOutput = ''

  /* Content */

  let contentOutput: string = content

  /* Single post */

  if (contentType === 'post' || contentType === 'service') {
    contentOutput = await ArticleHtml({
      content,
      shareLink: url,
      navItems: isArrayStrict(pageHeadings) ? pageHeadings[0] : [],
      showNav: true,
      showSocial: true
    })

    backLinkOutput = BackLinkHtml(contentType)
  }

  /* Blobs */

  const blobsOutput = BlobsHtml()

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
  const scriptsArr = Object.keys(scriptFiles)

  let scripts = ''

  if (configHtmlVars.js.out !== '') {
    scripts += `<script type="module" src="${assetsLink}${configHtmlVars.js.out}.js"></script>`
  }

  if (scriptsArr.length > 0) {
    scriptsArr.sort((a, b) => {
      const aPriority = scriptFiles[a]
      const bPriority = scriptFiles[b]

      return aPriority - bPriority
    })

    scriptsArr.forEach((s) => {
      scripts += `<script type="module" src="${assetsLink}${s}.js"></script>`
    })
  }

  /* Styles */

  const styleFiles = configHtml.styles.item
  const stylesArr = Object.keys(styleFiles)

  let styles = ''

  if (configHtmlVars.css.out !== '') {
    configHtmlVars.css.head = `<link rel="stylesheet" href="${assetsLink}${configHtmlVars.css.out}.css" media="all">`
  }

  if (stylesArr.length > 0) {
    stylesArr.sort((a, b) => {
      const aPriority = styleFiles[a]
      const bPriority = styleFiles[b]

      return aPriority - bPriority
    })

    stylesArr.forEach((s) => {
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
        <link rel="preconnect" href="https://images.ctfassets.net">
        <link rel="dns-prefetch" href="https://images.ctfassets.net">
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
              --logo-pos: static;
              --logo-xy: 0 0;
              --flow: none;
              --grow: 0;
              --mid: 0;
            }

            .no-js-collapsible {
              --h: auto;
              --visibility: visible;
            }
          </style>
        </noscript>
        <link rel="apple-touch-icon" sizes="180x180" href="${assetsLink}favicon/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="${assetsLink}favicon/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="${assetsLink}favicon/favicon-16x16.png">
        <link rel="manifest" href="${assetsLink}favicon/site.webmanifest">
        <meta name="msapplication-TileColor" content="${theme['foreground-base']}">
        <meta name="theme-color" content="${theme['background-base']}">
        <meta name="format-detection" content="telephone=no">
      </head>
      <body class="${ns} no-js l-flex l-col">
        ${spritesOutput}
        ${headerOutput}
        <main id="main">
          ${backLinkOutput}
          ${heroOutput}
          ${blobsOutput !== '' ? '<div class="l-relative l-z-index-1">' : ''}
          ${blobsOutput}
          ${contentOutput}
          ${backLinkOutput}
          ${blobsOutput !== '' ? '</div>' : ''}
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
