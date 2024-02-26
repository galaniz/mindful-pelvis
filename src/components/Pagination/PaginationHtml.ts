/**
 * Components - Pagination Html
 */

/* Imports */

import type { PaginationArgs } from './PaginationHtmlTypes'
import { addScriptStyle, isObjectStrict } from '@alanizcreative/static-site-formation/lib/utils/utilsMin'
import { Pagination } from '@alanizcreative/static-site-formation/lib/components/Pagination/Pagination'
import { CaretSvgHtml } from '../../svg/Caret/CaretHtml'

/**
 * Function - output pagination for posts
 *
 * @param {import('./PaginationHtmlTypes').PaginationArgs} args
 * @return {string} HTML - nav
 */
const PaginationHtml = (args: PaginationArgs): string => {
  /* Args must be object */

  if (!isObjectStrict(args)) {
    return ''
  }

  /* Args */

  const {
    total = 0,
    current = 1,
    filters = '',
    pageData
  } = args

  /* Classes */

  const commonClasses = 'l-wd-2xs l-ht-xs l-flex l-align-center l-justify-center t-xl'
  const spanClasses = 'l-flex l-align-center'
  const linkClasses = `c-pag__link b-bottom b-width-thick b-current e-transition e-color ${commonClasses} js-pt-link`

  /* Output and data */

  let output = ''

  const pagination = Pagination({
    current,
    total,
    filters,
    basePermaLink: pageData.basePermalink,
    ellipsis: `<span class='${commonClasses}'>&hellip;</span>`,
    prev: CaretSvgHtml('left', 'l-flex l-wd-2xs l-ht-2xs'),
    next: CaretSvgHtml('right', 'l-flex l-wd-2xs l-ht-2xs'),
    args: {
      listClass: 't-list-style-none l-flex l-justify-center l-gm-2xs l-gm-xs-s',
      listAttr: 'role="list"',
      itemClass: 'l-flex l-relative',
      itemMaxWidth: true,
      linkClass: linkClasses,
      currentClass: `c-pag__current ${commonClasses} t-background-base l-before l-relative l-z-index-1`,
      prevLinkClass: linkClasses,
      prevSpanClass: spanClasses,
      nextSpanClass: spanClasses,
      nextLinkClass: linkClasses
    }
  })

  if (pagination.output !== '') {
    output = `
      <nav class='c-pag l-pt-m l-pt-xl-m t-link-current' aria-label='Pagination'>
        ${pagination.output}
      </nav>
    `

    pageData.pagination = pagination.data

    addScriptStyle({
      dir: 'components/Pagination',
      style: 'Pagination'
    })
  }

  return output
}

/* Exports */

export { PaginationHtml }
