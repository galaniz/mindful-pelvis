/**
 * Pages - Html
 */

/* Imports */

import type { RenderReturn } from '@alanizcreative/static-site-formation/iop/render/renderTypes'
import { render } from '@alanizcreative/static-site-formation/iop/render/render'
import { configHtml } from '../config/configHtml'
import { HttpErrorHtml } from './HttpError/HttpErrorHtml'
import { ComingSoonHtml } from './ComingSoon/ComingSoonHtml'
import { isObject } from '@alanizcreative/static-site-formation/iop/utils/utilsAll'

/**
 * Function - pages to build
 *
 * @return {Promise<import('./renderTypes').RenderReturn|import('./renderTypes').RenderReturn[]>}
 */
const pagesHtml = async (): Promise<RenderReturn | RenderReturn[]> => {
  const page = []
  const notFound = await HttpErrorHtml(404, true)

  if (isObject(notFound)) {
    page.push(notFound)
  }

  if (configHtml.env.prod) {
    page.push(ComingSoonHtml())
  }

  return await render({
    allData: {
      content: {
        page
      }
    }
  })
}

/* Exports */

export { pagesHtml }
