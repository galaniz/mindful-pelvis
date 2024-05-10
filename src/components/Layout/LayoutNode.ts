/**
 * Components - Layout Node
 */

/* Imports */

import type { LayoutArgs } from './LayoutNodeTypes'
import {
  getPermalink,
  isStringStrict,
  isArrayStrict,
  isObjectStrict,
  normalizeContentType
} from '@alanizcreative/static-site-formation/iop/utils/utils'
import { configNode, configNodeVars } from '../../config/configNode'
import { HeaderNode } from '../Header/HeaderNode'
import { FooterNode } from '../Footer/FooterNode'
import { HeroNode } from '../Hero/HeroNode'
import { ArticleNode } from '../Article/ArticleNode'
import { BackLinkNode } from '../../objects/BackLink/BackLinkNode'
import { BlobsNode } from '../Blobs/BlobsNode'
import { SimilarNode } from '../Similar/SimilarNode'
import { PostsNode } from '../../objects/Posts/PostsNode'

/**
 * Function - output html
 *
 * @param {import('./LayoutNodeTypes').LayoutArgs} args
 * @return {Promise<string>} HTML - html
 */
const LayoutNode = async (args: LayoutArgs): Promise<string> => {
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
    pageData,
    pageContains
  } = args

  /* Page data */

  const {
    showHeader = true,
    showFooter = true,
    showHero = true,
    blobs,
    heroType,
    heroText,
    heroImage,
    heroImageMinimal,
    heroCallToAction
  } = pageData

  /* Assets link */

  const assetsLink = `${getPermalink()}assets/`

  /* Namespace */

  const ns = configNode.namespace

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
    title = configNode.title
  } else {
    title = `${title}${paginationTitle !== '' ? ` | ${paginationTitle}` : ''} | ${configNode.title}`
  }

  /* Description */

  if (description === '') {
    description = configNode.meta.description
  }

  /* Image */

  let imageLink = `${assetsLink}${configNode.meta.image}`

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

  if (configNode.env.dev) {
    noIndex = true
  }

  /* Preload font links */

  const preloadFonts = `
    <link rel="preload" href="${assetsLink}fonts/celine-regular.woff2" as="font" type="font/woff2" crossorigin>
    <link rel="preload" href="${assetsLink}fonts/karla-regular.woff2" as="font" type="font/woff2" crossorigin>
  `

  /* Theme color */

  const theme = configNodeVars.theme

  /* Header, breadcrumbs and footer */

  let headerOutput = ''
  let footerOutput = ''

  if (navigations !== undefined) {
    headerOutput = showHeader ? HeaderNode(navigations) : ''
    footerOutput = showFooter ? FooterNode(navigations) : ''
  }

  /* Hero */

  let heroTitle = ''
  let heroArchive = ''
  let heroOutput = ''

  if (isStringStrict(pageData.title)) {
    heroTitle = pageData.title
  }

  if (isStringStrict(pageData.heroTitle)) {
    heroTitle = pageData.heroTitle
  }

  if (isStringStrict(pageData.archive)) {
    heroArchive = normalizeContentType(pageData.archive)
  }

  if (showHero) {
    heroOutput = await HeroNode({
      contentType,
      title: heroTitle,
      type: heroType,
      archive: heroArchive,
      text: heroText,
      image: heroImage,
      imageMinimal: heroImageMinimal,
      callToAction: heroCallToAction,
      pageData
    })
  }

  /* Back link */

  let backLinkOutput = ''

  /* Content */

  let contentOutput: string = content

  /* Similar */

  let similarOutput = ''

  /* Single post */

  if (contentType === 'post' || contentType === 'service') {
    contentOutput = await ArticleNode({
      content,
      pageData,
      shareLink: contentType === 'post' ? url : '',
      navItems: isArrayStrict(pageHeadings) ? pageHeadings[0] : [],
      showNav: true,
      showSocial: true
    })

    similarOutput = await SimilarNode({
      pageData,
      contentType
    })
  }

  if (contentType === 'term' || contentType === 'taxonomy') {
    const postsOutput = await PostsNode({
      args: {
        contentType,
        pagination: true
      },
      pageData,
      pageContains
    })

    contentOutput = `
      <div class="l-container-m l-pb-xl l-pb-2xl-m l-flex l-col">
        ${postsOutput}
      </div>
    `
  }

  if (contentType === 'post' || contentType === 'service' || contentType === 'term' || contentType === 'taxonomy') {
    backLinkOutput = BackLinkNode(contentType, pageData)
  }

  /* Blobs */

  const blobsOutput = BlobsNode(blobs)

  /* Script data */

  let scriptMeta = ''

  if (Object.keys(configNode.scriptMeta).length > 0) {
    const scriptJSON = JSON.stringify(configNode.scriptMeta)

    scriptMeta = `
      <script>
        var namespace = '${ns}';
        var ${ns} = ${scriptJSON};
      </script>
    `
  }

  /* Clear script data */

  configNode.scriptMeta = {}

  /* Scripts */

  const scriptFiles = configNode.scripts.item
  const scriptsArr = Object.keys(scriptFiles)

  let scripts = ''

  if (configNodeVars.js.out !== '') {
    scripts += `<script type="module" src="${assetsLink}${configNodeVars.js.out}.js"></script>`
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

  const styleFiles = configNode.styles.item
  const stylesArr = Object.keys(styleFiles)

  let styles = ''

  if (configNodeVars.css.out !== '') {
    configNodeVars.css.head = `<link rel="stylesheet" href="${assetsLink}${configNodeVars.css.out}.css" media="all">`
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

  const svgIds = Object.keys(configNodeVars.svg)

  let spritesOutput = ''

  if (svgIds.length > 0) {
    svgIds.forEach((id) => {
      const svgData = configNodeVars.svg[id]
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
        ${configNodeVars.head}
        <style>
          @media (prefers-reduced-motion: reduce) {
            .no-motion-show {
              display: block;
            }
            .no-motion-hide {
              display: none;
            }
          }
        </style>
        ${configNodeVars.css.head}
        ${styles}
        <noscript>
          <link rel="stylesheet" href="${assetsLink}css/global/globalNoJs.css" media="all">
        </noscript>
        <link rel="apple-touch-icon" sizes="180x180" href="${assetsLink}favicon/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="${assetsLink}favicon/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="${assetsLink}favicon/favicon-16x16.png">
        <link rel="manifest" href="${assetsLink}favicon/site.webmanifest">
        <meta name="msapplication-TileColor" content="${theme['foreground-base']}">
        <meta name="theme-color" content="${theme['background-base']}">
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
          ${similarOutput}
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

export { LayoutNode }
