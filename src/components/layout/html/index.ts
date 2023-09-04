/**
 * Layouts - html
 */

/* Imports */

import getProp from '@alanizcreative/static-site-formation/lib/utils/get-prop'
import getPermalink from '@alanizcreative/static-site-formation/lib/utils/get-permalink'
import config from '../../../config/html'
import header from '../../header/html'
import footer from '../../footer/html'
import hero from '../../hero/html'

/**
 * Function - output html
 *
 * @param {object} args
 * @param {string} args.id
 * @param {object} args.meta
 * @param {object} args.navigations
 * @param {string} args.contentType
 * @param {string} args.content
 * @param {string[]} args.pageContains
 * @param {object} args.pageData
 * @param {object} args.serverlessData
 * @return {string} HTML - html
 */

const layout = async ({
  id = '',
  meta,
  navigations,
  contentType = 'page',
  content = '',
  pageData
}: MP.LayoutArgs): Promise<string> => {
  /* Assets link */

  const assetsLink = `${getPermalink()}assets/`

  /* Namespace */

  const ns = config.namespace

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

  /* Page data */

  const p: FRM.RenderItem = Object.assign({
    title: '',
    heroTitle: '',
    heroText: ''
  }, pageData)

  /* Title */

  if (title === '') {
    title = config.title
  } else {
    title = `${title}${paginationTitle !== '' ? ` | ${paginationTitle}` : ''} | ${config.title}`
  }

  /* Description */

  if (description === '') {
    description = config.meta.description
  }

  /* Image */

  let imageLink = ''

  if (typeof image === 'object') {
    const imageData: FRM.ImageData = getProp(image, '', {})
    const imageUrl = typeof imageData?.file?.url === 'string' ? imageData?.file?.url : ''

    imageLink = `https:${imageUrl}`
  } else {
    imageLink = `${assetsLink}${config.meta.image}`
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

  if (config.env.dev) {
    noIndex = true
  }

  /* Preload font links */

  const preloadFonts = `
    <link rel="preload" href="${assetsLink}fonts/celine-regular.woff2" as="font" type="font/woff2" crossorigin>
    <link rel="preload" href="${assetsLink}fonts/karla-regular.woff2" as="font" type="font/woff2" crossorigin>
  `

  /* Theme color */

  const theme = config.vars.theme

  /* Header, breadcrumbs and footer */

  let headerOutput = ''
  let footerOutput = ''

  if (navigations !== undefined) {
    headerOutput = header(navigations)
    footerOutput = footer(navigations)
  }

  /* Hero */

  const heroOutput = hero({
    contentType,
    type: p.heroType,
    title: p.heroTitle !== '' ? p.heroTitle : p.title,
    text: p.heroText,
    image: p.heroImage,
    callToAction: p.heroCallToAction,
    pageData
  })

  /* Content */

  const contentOutput: string = content

  /* Script data */

  let scriptMeta = ''

  if (Object.keys(config.scriptMeta).length > 0) {
    const scriptJSON = JSON.stringify(config.scriptMeta)

    scriptMeta = `
      <script>
        var namespace = '${ns}';
        var ${ns} = ${scriptJSON};
      </script>
    `
  }

  /* Clear script data */

  config.scriptMeta = {}

  /* Scripts */

  const scriptFiles = config.scripts.item
  const scriptsArray = Object.keys(scriptFiles)

  let scripts = ''

  if (config.vars.js.out !== '') {
    scripts += `<script type="module" src="${assetsLink}${config.vars.js.out}.js"></script>`
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

  const styleFiles = config.styles.item
  const stylesArray = Object.keys(styleFiles)

  let styles = ''

  if (config.vars.css.out !== '') {
    config.vars.css.head = `<link rel="stylesheet" href="${assetsLink}${config.vars.css.out}.css" media="all">`
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

  const svgIds = Object.keys(config.vars.svg)

  let spritesOutput = ''

  if (svgIds.length > 0) {
    svgIds.forEach((id) => {
      const svgData = config.vars.svg[id]
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
        ${config.vars.head}
        ${config.vars.css.head}
        ${styles}
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

export default layout
