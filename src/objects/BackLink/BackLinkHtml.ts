/**
 * Objects - Back Link Html
 */

/* Imports */

import { isStringStrict, getArchiveLink, addScriptStyle } from '@alanizcreative/static-site-formation/iop/utils/utils'
import { CaretSvgHtml } from '../../svg/Caret/CaretHtml'

/**
 * Function - output archive link in container
 *
 * @param {string} contentType
 * @return {string} HTML - div
 */
const BackLinkHtml = (contentType: string = 'post'): string => {
  if (!isStringStrict(contentType)) {
    return ''
  }

  /* Link and title */

  const archiveLink = getArchiveLink(contentType)

  const { title, link } = archiveLink

  if (!isStringStrict(title) || !isStringStrict(link)) {
    return ''
  }

  /* Add styles */

  addScriptStyle({
    dir: 'objects/BackLink',
    style: 'BackLink'
  })

  /* Output */

  return `
    <div class="o-back-link l-py-4xs">
      <div class="l-container e-line-rev">
        <a href="${link}" class="t-s t-ht-snug t-link-current l-inline-flex l-align-center" data-rich>
          ${CaretSvgHtml('left', 'l-wd-3xs l-ht-3xs l-flex')}
          ${title}
        </a>
      </div>
    </div>
  `
}

/* Exports */

export { BackLinkHtml }
