/**
 * Objects - Posts Html
 */

/* Imports */

import type { PostsProps, PostsQueryArgs } from './PostsHtmlTypes'
import {
  isArrayStrict,
  isStringStrict,
  isObjectStrict,
  escape,
  isNumber
} from '@alanizcreative/static-site-formation/iop/utils/utils'
import {
  getContentfulData
} from '@alanizcreative/static-site-formation/iop/utils/getContentfulData/getContentfulData'
import { configHtml, configHtmlVars } from '../../config/configHtml'
import { PaginationHtml } from '../../components/Pagination/PaginationHtml'
import { CardsHtml } from '../Cards/CardsHtml'

/**
 * Function - randomize array contents
 *
 * Source: https://javascript.info/task/shuffle
 *
 * @private
 * @param {*[]} arr
 * @return {*[]}
 */
const _shuffle = (arr: unknown[]): unknown[] => {
  for (let i = arr.length - 1; i > 0; i -= 1) {
    /* Random index from 0 to i */

    const j = Math.floor(Math.random() * (i + 1));

    /* Swap elements arr[i] and arr[j] */

    [arr[i], arr[j]] = [arr[j], arr[i]]
  }

  return arr
}

/**
 * Function - output posts
 *
 * @param {PostsProps} props
 * @return {Promise<string>}
 */
const PostsHtml = async (props: PostsProps): Promise<string> => {
  /* Props must be object */

  if (!isObjectStrict(props)) {
    return ''
  }

  /* Props */

  const {
    pageData,
    serverlessData
  } = props

  let { args } = props

  args = isObjectStrict(args) ? args : {}

  /* Args */

  const {
    display = 1,
    pagination = false,
    filters = [],
    linkContentType = '',
    nothingFoundText = true,
    order = 'date',
    termId = ''
  } = args

  let {
    contentType = 'Post',
    headingLevel = 'Heading Three'
  } = args

  /* Normalize options */

  contentType = configHtmlVars.options.posts.contentType[contentType]
  headingLevel = configHtmlVars.options.posts.headingLevel[headingLevel]

  /* Type required */

  if (contentType === '') {
    return ''
  }

  /* Content type to query */

  let queryContentType = contentType

  /* Taxonomy check */

  // const isTaxonomy = configHtml.contentTypes.taxonomy?.[contentType] !== undefined && termId === ''

  /* Term check */

  const isTerm = configHtml.contentTypes.taxonomy[contentType] !== undefined && termId !== ''

  if (isTerm && linkContentType === '') {
    return ''
  }

  if (isTerm) {
    queryContentType = linkContentType
    filters.push(`fields.${contentType}.sys.id:${termId}`)
  }

  /* Archive defaults */

  const defaults = configHtml.contentTypes.archive[queryContentType]
  const layout = defaults.layout
  const defaultOrder = defaults.order

  /* Pagination variables */

  let current = 1
  let paginationFilters = ''

  /* Query prep */

  const id: string = isStringStrict(pageData.id) ? pageData.id : ''

  let key = `posts_${id}_${queryContentType}_${display}`

  if (isTerm) {
    filters.push(`fields.${contentType}.sys.id:${termId}`)
  }

  const queryArgs: PostsQueryArgs = {
    content_type: queryContentType,
    include: 10
  }

  if (display > 0) {
    queryArgs.limit = display
  }

  if (defaultOrder === 'date' && order === 'date') {
    queryArgs.order = '-fields.date'
  }

  if (defaultOrder === 'order') {
    queryArgs.order = '-fields.order'
  }

  if (filters.length > 0) {
    filters.forEach(filter => {
      const f = filter.split(':')

      if (f.length === 2) {
        queryArgs[f[0]] = f[1]
      }
    })
  }

  if (serverlessData !== undefined) {
    if (isStringStrict(serverlessData?.query?.page)) {
      current = parseInt(escape(serverlessData.query.page))

      if (current > 0) {
        key += `_${current}`
        queryArgs.skip = display * (current - 1)
      }
    }

    if (isStringStrict(serverlessData?.query?.filters)) {
      const queryFilters = serverlessData.query.filters

      paginationFilters = `filters=${queryFilters}`
      key += `_${paginationFilters}`

      try {
        const urlFilters = decodeURI(queryFilters).split('|')

        if (urlFilters.length > 0) {
          urlFilters.forEach(filter => {
            const filterArr = filter.split(',')

            if (filterArr.length > 0) {
              const prop = filterArr[0]
              const value = filterArr[1]

              queryArgs[prop] = escape(value)
            }
          })
        }
      } catch (error) {
        console.error(configHtml.console.red, '[MP] Error setting serverless filters: ', error)
      }
    }
  }

  /* Query and output */

  try {
    const p = await getContentfulData(key, queryArgs)
    const outputArr = []

    if (!isObjectStrict(p)) {
      throw new Error('Posts not an object')
    }

    if (isArrayStrict(p.items)) {
      const items = p.items

      /* Cards */

      const bg = configHtmlVars.backgrounds
      const backgrounds =
        Array(items.length)
          .fill(pagination ? _shuffle([...bg]) : [...bg])
          .flat()

      for (let i = 0; i < items.length; i += 1) {
        const item = items[i]

        let itemOutput = ''

        if (layout === 'card') {
          itemOutput = await CardsHtml.renderCard({
            item,
            headingLevel,
            contentType,
            background: backgrounds[i],
            showExcerpt: contentType === 'post'
          })
        }

        if (itemOutput !== '') {
          outputArr.push(itemOutput)
        }
      }
    }

    /* Pagination data and output */

    const total = isNumber(p.total) ? p.total : 0

    let paginationOutput = ''

    if (pagination && total > 0) {
      paginationOutput = PaginationHtml({
        total: Math.ceil(total / display),
        filters: paginationFilters,
        current,
        pageData
      })
    }

    /* Output */

    let output = outputArr.length > 0 ? outputArr.join('') : ''

    if (output !== '' && layout === 'card') {
      const cardsOutput: string = await CardsHtml.render(output)

      output = cardsOutput + paginationOutput
    }

    if (output === '' && nothingFoundText) {
      // return info(`Looks like no ${plural} were found.`)
    }

    return output
  } catch (error) {
    console.error(configHtml.console.red, '[MP] Error querying and/or outputting posts: ', error)

    return ''
  }
}

/* Exports */

export { PostsHtml }
