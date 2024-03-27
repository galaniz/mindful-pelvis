/**
 * Components - Article Html
 */

/* Imports */

import type { ArticleArgs } from './ArticleHtmlTypes'
import {
  addScriptStyle,
  isObjectStrict,
  isStringStrict,
  getShareLinks
} from '@alanizcreative/static-site-formation/iop/utils/utils'
import { CollapsibleHtml } from '../../objects/Collapsible/CollapsibleHtml'
import { SocialSvgHtml } from '../../svg/Social/SocialHtml'

/**
 * Function - output main editorial body of single content types
 *
 * @param {import('./ArticleHtmlTypes').ArticleArgs} args
 * @return {string}
 */
const ArticleHtml = async (args: ArticleArgs): Promise<string> => {
  /* Args must be object */

  if (!isObjectStrict(args)) {
    return ''
  }

  /* Args */

  const {
    content = '',
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

  if (showNav && navItems.length > 0) { // Nav items type checked in LayoutHtml
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
      <aside class="l-wd-1-1 l-wd-4-5-m l-wd-1-5-l">
        ${await CollapsibleHtml({
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
            <ul class="t-ls-none t-s t-ht-snug t-link-current b-left e-line-rev l-mb-xs l-mb-3xs-all" role="list">
              ${navItemsOutput.join('')}
            </ul>
          `
        })}
      </aside>
    `

    addScriptStyle({
      dir: 'components/Article',
      style: 'Article',
      script: 'ArticleInit'
    })
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

        return `
          <li>
            <a href="${link}" class="l-wd-s l-ht-s b-radius-full b-all b-muted t-sharp l-flex l-justify-center l-align-center e-color e-trans" aria-label="Share on ${type} (opens new window)" target="_blank" rel="noreferrer">
              ${SocialSvgHtml(type.toLowerCase(), 'l-wd-2xs l-ht-2xs')}
            </a>
          </li>
        `
      })

      socialOutput = `
        <div class="b-top l-pt-s l-mt-s">
          <h2 class="t-s t-ht-snug t-wt-bold l-mb-2xs">Share</h2>
          <ul class="t-ls-none l-flex l-flex-wrap l-gm-2xs" role="list">
            ${shareItemsOutput.join('')}
          </ul>
        </div>
      `
    }
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
      <article class="c-article__body l-wd-1-1 l-wd-4-5-m l-wd-3-5-l">
        <div class="${richTextClasses}">${content}</div>
        <div class="c-article__end"></div>
        ${socialOutput}
      </article>
    `
  }

  /* Output */

  const output = navOutput + contentOutput
  const classes = 'c-article l-pt-s l-pt-m-m l-pb-xl l-pb-2xl-m'

  if (hasNav) {
    return `
      <section class="${classes} l-container">
        <div class="l-flex l-flex-wrap l-justify-center l-gm-s l-gm-m-l">
          ${output}
        </div>
      </section>
    `
  }

  return `
    <article class="${classes} ${richTextClasses} l-container-s">
      ${output}
    </article>
  `
}

/* Exports */

export { ArticleHtml }
