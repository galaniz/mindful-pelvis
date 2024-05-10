/**
 * Components - Similar Node
 */

/* Imports */

import type { SimilarArgs } from './SimilarNodeTypes'
import {
  isObjectStrict,
  isArrayStrict,
  isStringStrict,
  normalizeContentType
} from '@alanizcreative/static-site-formation/iop/utils/utils'
import { CardsNode } from '../../objects/Cards/CardsNode'
import { configNode, configNodeVars } from '../../config/configNode'
import { PostsNode } from '../../objects/Posts/PostsNode'

/**
 * Function - output similar posts on single post
 *
 * @prop {import('./SimilarNodeTypes').SimilarArgs} args
 * @return {Promise<string>}
 */
const SimilarNode = async (args: SimilarArgs): Promise<string> => {
  /* Args must be object */

  if (!isObjectStrict(args)) {
    return ''
  }

  /* Args */

  const {
    pageData,
    titleAdjective = 'More',
    display = 3
  } = args

  /* Item required */

  if (!isObjectStrict(pageData)) {
    return ''
  }

  /* Id */

  const id = isStringStrict(pageData.id) ? pageData.id : ''

  /* Content type required */

  const contentType = normalizeContentType(args.contentType)

  if (contentType === '') {
    return ''
  }

  /* Title */

  const titleType = configNode.archiveMeta[contentType].plural

  let title = ''

  if (isStringStrict(titleType)) {
    title = titleType

    if (isStringStrict(titleAdjective)) {
      title = `${titleAdjective} ${titleType}`
    }
  }

  /* Output */

  let output = ''

  /* Curated */

  const curated = pageData.similar
  const isCurated = isArrayStrict(curated)

  if (isCurated) {
    const curatedOutput = curated.map(async (item, i) => {
      let background

      if (contentType === 'post') {
        background = configNodeVars.backgrounds[i]
      }

      return await CardsNode.renderCard({
        item,
        contentType,
        background,
        showExcerpt: contentType === 'post'
      })
    })

    output = await CardsNode.render(curatedOutput.join(''))
  }

  if (!isCurated && id !== '') {
    const filters = [`sys.id[ne]:${id}`]
    const terms = pageData.term

    if (isArrayStrict(terms)) {
      const termIds: string[] = []

      terms.forEach((term) => {
        if (!isObjectStrict(term)) {
          return
        }

        const { id } = term

        if (isStringStrict(id)) {
          termIds.push(id)
        }
      })

      if (termIds.length > 0) {
        filters.push(`fields.term.fields.sys.id[in]:${termIds.join(',')}`)
      }
    }

    output = await PostsNode({
      args: {
        contentType,
        display,
        filters
      },
      pageData
    })
  }

  /* Output */

  if (output === '') {
    return ''
  }

  return `
    <section class="l-container-m l-pb-xl l-pb-2xl-m">
      <h2 class="l-pb-xs l-pb-s-m ">${title}</h2>
      ${output}
    </section>
  `
}

/* Exports */

export { SimilarNode }
