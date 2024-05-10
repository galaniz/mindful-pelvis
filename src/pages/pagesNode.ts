/**
 * Pages - Node
 */

/* Imports */

import type { RenderItem } from '@alanizcreative/static-site-formation/iop/render/renderTypes'
import { isObject } from '@alanizcreative/static-site-formation/iop/utils/utils'
import { configNode } from '../config/configNode'
import { HttpErrorNode } from './HttpError/HttpErrorNode'
import { ComingSoonNode } from './ComingSoon/ComingSoonNode'

/**
 * Function - pages to build
 *
 * @return {Promise<import('./renderTypes').RenderItem[]>}
 */
const pagesNode = async (): Promise<RenderItem[]> => {
  const pages = []
  const notFound = await HttpErrorNode(404, true)

  if (isObject(notFound)) {
    pages.push(notFound)
  }

  if (configNode.env.prod) {
    pages.push(ComingSoonNode())
  }

  return pages
}

/* Exports */

export { pagesNode }
