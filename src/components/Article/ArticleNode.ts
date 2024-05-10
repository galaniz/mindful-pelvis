/**
 * Components - Article Node
 */

/* Imports */

import type { ArticleArgs } from './ArticleNodeTypes'
import {
  addScriptStyle,
  isArrayStrict,
  isObjectStrict,
  isStringStrict,
  getShareLinks,
  getLink
} from '@alanizcreative/static-site-formation/iop/utils/utils'
import { CollapsibleNode } from '../../objects/Collapsible/CollapsibleNode'
import { SocialSvgNode } from '../../svg/Social/SocialNode'

/**
 * Function - output main editorial body of single content types
 *
 * @param {import('./ArticleNodeTypes').ArticleArgs} args
 * @return {Promise<string>}
 */
const ArticleNode = async (args: ArticleArgs): Promise<string> => {
  /* Args must be object */

  if (!isObjectStrict(args)) {
    return ''
  }

  /* Args */

  const {
    content = '',
    pageData,
    shareLink = '',
    shareTitle = '',
    navItems = [],
    showSocial = false,
    showNav = false
  } = args

  /* Content required */

  if (!isStringStrict(content)) {
    return ''
  }

  /* Rich text classes */

  const richTextClasses = 't-rich-text e-line-y'

  /* Nav output */

  let navOutput = ''
  let hasNav = false

  if (showNav && navItems.length > 0) { // Nav items type checked in LayoutNode
    hasNav = true

    const navItemsOutput = navItems.map((item) => {
      const {
        title = '',
        id = '',
        type = 'h2'
      } = item

      if (type !== 'h2' || title === '' || id === '') {
        return ''
      }

      return `
        <li>
          <a href="#${id}" class="c-article__hash l-pl-3xs l-inline-flex" data-rich>
            ${title}
          </a>
        </li>
      `
    })

    navOutput = `
      <aside class="l-col-10 l-col-8-m l-col-2-l">
        ${await CollapsibleNode({
          name: 'collapsible',
          replaceContent: '',
          children: [],
          attributes: {
            tag: 'nav',
            classes: 'c-article__nav b-top l-sticky',
            attr: 'aria-label="Article" data-article',
            headingLevel: 'h2',
            label: 'In This Article',
            labelClasses: 'c-article__toggle t-m t-wt-bold t-ht-snug t-sharp',
            iconClasses: 'c-article__icon no-js-none'
          },
          content: `
            <ul class="t-ls-none t-s t-ht-snug t-link-current b-left e-line-r l-mb-3xs-all" role="list">
              ${navItemsOutput.join('')}
            </ul>
          `
        })}
      </aside>
    `
  }

  /* Social output */

  let socialOutput = ''

  if (showSocial && isStringStrict(shareLink)) {
    const shareItems = getShareLinks(
      shareLink,
      [
        'Facebook',
        'X',
        'LinkedIn',
        'Email'
      ],
      shareTitle
    )

    if (shareItems.length > 0) {
      const shareItemsOutput = shareItems.map((item) => {
        const { type, link } = item

        if (link === '') {
          return ''
        }

        const socialType = type.toLowerCase()
        const size = socialType === 'email' || socialType === 'link' ? 'xs' : '2xs'

        return `
          <li>
            <a href="${link}" class="l-wd-s l-ht-s b-radius-full b-all b-muted t-sharp l-flex l-justify-center l-align-center e-color e-trans" aria-label="Share on ${type} (opens new window)" target="_blank" rel="noreferrer">
              ${SocialSvgNode(socialType, `l-wd-${size} l-ht-${size}`)}
            </a>
          </li>
        `
      })

      socialOutput = `
        <div class="l-flex l-wrap l-gap-2xs l-align-center">
          <h2 class="t-s t-ht-snug t-wt-bold">Share</h2>
          <ul class="t-ls-none l-flex l-wrap l-gap-2xs" role="list">
            ${shareItemsOutput.join('')}
          </ul>
        </div>
      `
    }
  }

  /* Term output */

  let termOutput = ''

  if (isArrayStrict(pageData.term)) {
    pageData.term.forEach((term) => {
      if (!isObjectStrict(term)) {
        return
      }

      const link = getLink(term)
      const { title } = term

      if (link === '' || !isStringStrict(title)) {
        return
      }

      termOutput += `
        <li>
          <a href='${link}' data-rich>${title}</a>
        </li>
      `
    })

    termOutput = `
      <div class="l-flex l-wrap l-align-center l-gap-2xs">
        <h2 class="t-s t-ht-snug t-wt-bold">Categories</h2>
        <ul class="t-ls-none t-s t-link-current l-flex l-wrap l-gap-3xs" role="list">
          ${termOutput}
        </ul>
      </div>
    `
  }

  /* Bottom meta output */

  let metaOutput = socialOutput + termOutput

  if (metaOutput !== '') {
    metaOutput = `
      <div class="b-top l-flex l-gap-xs l-justify-between l-wrap l-align-center l-pt-s l-mt-s">
        ${metaOutput}
      </div>
    `
  }

  /* Rich text styles */

  addScriptStyle({
    dir: 'text/RichText',
    style: 'RichText'
  })

  /* Content output */

  let contentOutput = content

  if (hasNav) {
    contentOutput = `
      <article class="c-article__body l-col-10 l-col-8-m l-col-6-l">
        <div class="c-article__main ${richTextClasses}">${content}</div>
        <div class="c-article__end"></div>
        ${metaOutput}
      </article>
    `

    /* Add styles and scripts */

    addScriptStyle({
      dir: 'components/Article',
      style: 'Article',
      script: 'ArticleBrowser'
    })
  }

  /* Output */

  const output = navOutput + contentOutput
  const classes = 'l-pb-xl l-pb-2xl-m'

  if (hasNav) {
    return `
      <section class="c-article ${classes} l-container">
        <div class="l-flex l-wrap l-justify-center l-gap-s l-gap-m-l">
          ${output}
        </div>
      </section>
    `
  }

  return `
    <article class="${classes} ${richTextClasses} l-container-s">
      ${output}
      ${metaOutput}
    </article>
  `
}

/* Exports */

export { ArticleNode }
