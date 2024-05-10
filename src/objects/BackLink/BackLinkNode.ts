/**
 * Objects - Back Link Node
 */

/* Imports */

import type { Item } from '../../global/globalNodeTypes'
import {
  isStringStrict,
  getArchiveLink,
  addScriptStyle
} from '@alanizcreative/static-site-formation/iop/utils/utils'
import { CaretSvgNode } from '../../svg/Caret/CaretNode'

/**
 * Function - output archive link in container
 *
 * @param {string} contentType
 * @param {import('../../global/globalNodeTypes').Item} [pageData]
 * @return {string} HTML - div
 */
const BackLinkNode = (contentType: string = 'post', pageData?: Item): string => {
  if (!isStringStrict(contentType)) {
    return ''
  }

  /* Link and title */

  const archiveLink = getArchiveLink(contentType, pageData)

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
      <div class="l-container e-line-r">
        <a href="${link}" class="t-s t-ht-snug t-link-current l-inline-flex l-align-center" data-rich>
          ${CaretSvgNode('left', 'l-wd-3xs l-ht-3xs l-flex')}
          All ${title}
        </a>
      </div>
    </div>
  `
}

/* Exports */

export { BackLinkNode }
