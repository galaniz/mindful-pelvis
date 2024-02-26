/**
 * Components - Article Html
 */

/* Imports */

import type { ArticleArgs } from './ArticleHtmlTypes'
import { Container } from '@alanizcreative/static-site-formation/lib/layouts/Container/Container'
import { Column } from '@alanizcreative/static-site-formation/lib/layouts/Column/Column'
import {
  addScriptStyle,
  isObjectStrict,
  isStringStrict,
  getShareLinks
} from '@alanizcreative/static-site-formation/lib/utils/utilsMin'
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

  const richTextClasses = 't-rich-text e-underline-y'

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
          <a href="#${id}" class="c-article__hash l-pl-3xs l-inline-flex" data-rich>${title}</a>
        </li>
      `
    })

    const navColumn = await Column({
      args: {
        widthMedium: '4/5',
        widthLarge: '1/5'
      }
    })

    const navContent = await CollapsibleHtml({
      name: 'collapsible',
      replaceContent: '',
      children: [],
      attributes: {
        tag: 'nav',
        classes: 'c-article__nav b-top l-sticky',
        attr: 'aria-label="Article" data-article',
        headingLevel: 'h2',
        label: 'In This Article',
        labelClasses: 'c-article__toggle t-m t-weight-bold t-height-snug t-sharp',
        iconClasses: 'c-article__icon no-js-none'
      },
      content: `
        <ul class="t-list-style-none t-s t-height-snug t-link-current b-left e-underline-reverse l-mb-xs l-mb-3xs-all" role="list">
          ${navItemsOutput.join('')}
        </ul>
      `
    })

    navOutput = `
      ${navColumn.start}
      ${navContent}
      ${navColumn.end} 
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
      ['Facebook', 'X', 'LinkedIn', 'Email'],
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
            <a href="${link}" class="l-wd-s l-ht-s b-radius-100-pc b-all b-muted t-sharp l-flex l-justify-center l-align-center e-color e-transition" aria-label="Share on ${type} (opens new window)" target="_blank" rel="noreferrer">
              ${SocialSvgHtml(type.toLowerCase(), 'l-wd-2xs l-ht-2xs')}
            </a>
          </li>
        `
      })

      socialOutput = `
        <div class="b-top l-pt-s l-mt-s">
          <h2 class="t-s t-height-snug t-weight-bold l-mb-2xs">Share</h2>
          <ul class="t-list-style-none l-flex l-flex-wrap l-gm-2xs" role="list">
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
    const column = await Column({
      args: {
        tag: 'Article',
        widthMedium: '4/5',
        widthLarge: '3/5',
        classes: 'c-article__body'
      }
    })

    contentOutput = (
      column.start +
      `<div class="${richTextClasses}">${content}</div>` +
      '<div class="c-article__end"></div>' +
      socialOutput +
      column.end
    )
  }

  const container = await Container({
    args: {
      tag: hasNav ? 'Section' : 'Article',
      maxWidth: hasNav ? '1300px' : '800px',
      justify: hasNav ? 'Center' : 'Default',
      layout: hasNav ? 'Row' : 'Default',
      gap: hasNav ? '45px' : '',
      gapLarge: hasNav ? '60px' : '',
      paddingTop: '45px',
      paddingTopLarge: '60px',
      paddingBottom: '90px',
      paddingBottomLarge: '120px',
      classes: `c-article${!hasNav ? ` ${richTextClasses}` : ''}`,
      nest: true
    }
  })

  /* Output */

  return (
    container.start +
    navOutput +
    contentOutput +
    container.end
  )
}

/* Exports */

export { ArticleHtml }
