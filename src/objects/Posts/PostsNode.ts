/**
 * Objects - Posts Node
 */

/* Imports */

import type { PostsProps, PostsQueryArgs } from './PostsNodeTypes'
import {
  isArrayStrict,
  isStringStrict,
  isObjectStrict,
  escape,
  isNumber,
  normalizeContentType,
  getTaxonomyInfo
} from '@alanizcreative/static-site-formation/iop/utils/utils'
import {
  getContentfulData
} from '@alanizcreative/static-site-formation/iop/utils/getContentfulData/getContentfulData'
import { configNode, configNodeVars } from '../../config/configNode'
import { PaginationNode } from '../../components/Pagination/PaginationNode'
import { CardsNode } from '../Cards/CardsNode'
import { MediaTextNode } from '../MediaText/MediaTextNode'
import { InfoNode } from '../Info/InfoNode'

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
const PostsNode = async (props: PostsProps): Promise<string> => {
  /* Props must be object */

  if (!isObjectStrict(props)) {
    return ''
  }

  /* Props */

  const { serverlessData } = props

  let {
    pageData,
    args
  } = props

  args = isObjectStrict(args) ? args : {}
  pageData = isObjectStrict(pageData) ? pageData : {}

  /* Args */

  const {
    pagination = false,
    order = 'date',
    filters = []
  } = args

  let {
    display = 1,
    contentType = 'Post',
    headingLevel = 'Heading Three'
  } = args

  /* Normalize options */

  contentType = normalizeContentType(contentType)
  headingLevel = configNodeVars.options.tag[headingLevel]

  /* Type required */

  if (contentType === '') {
    return ''
  }

  /* Content type to query */

  let queryContentType = contentType

  /* Id */

  const id = isStringStrict(pageData.id) ? pageData.id : ''

  /* Archive check */

  const archive = isStringStrict(pageData.archive) ? pageData.archive : ''
  const archiveType = normalizeContentType(archive)

  /* Taxonomy/term check */

  const isTaxonomy = contentType === 'taxonomy'
  const isTerm = contentType === 'term'

  let taxonomyType = ''

  if (isTerm || isTaxonomy) {
    const taxonomyInfo = getTaxonomyInfo(contentType, pageData)
    const { contentType: type } = taxonomyInfo

    taxonomyType = type
  }

  if (isTaxonomy) {
    queryContentType = 'term'

    filters.push(`fields.taxonomy.sys.id:${id}`)
  }

  if (isTerm) {
    queryContentType = taxonomyType

    filters.push(`fields.term.sys.id:${id}`)
  }

  /* Archive defaults */

  const defaultsType = isTaxonomy ? taxonomyType : queryContentType
  const defaults = configNode.archiveMeta[defaultsType]
  const defaultOrder = isStringStrict(defaults?.order) ? defaults.order : ''
  const defaultDisplay = isNumber(defaults?.display) ? defaults.display : 1

  let layout = isStringStrict(defaults?.layout) ? defaults.layout : ''

  if (archiveType === 'service' && contentType === 'service') {
    layout = 'mediaText'
  }

  if (isTerm || isTaxonomy) {
    display = defaultDisplay
  }

  /* Pagination variables */

  let current = 1
  let paginationFilters = ''

  /* Query prep */

  let key = `posts_${id}_${queryContentType}_${display}`

  const queryArgs: PostsQueryArgs = {
    content_type: queryContentType,
    include: 5
  }

  if (display > 0) {
    queryArgs.limit = display
  }

  if (defaultOrder === 'date' && order === 'date') {
    queryArgs.order = '-fields.date'
  }

  if (defaultOrder === 'order' || isTaxonomy) {
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
        console.error(configNode.console.red, '[MP] Error setting serverless filters: ', error)
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

      const bg = configNodeVars.backgrounds
      const backgrounds =
        Array(items.length)
          .fill(pagination || isTaxonomy ? _shuffle([...bg]) : [...bg])
          .flat()

      for (let i = 0; i < items.length; i += 1) {
        const item = items[i]

        let itemOutput = ''

        if (layout === 'card') {
          itemOutput = await CardsNode.renderCard({
            item,
            headingLevel,
            contentType,
            background: backgrounds[i],
            showExcerpt: queryContentType === 'post'
          })
        }

        if (layout === 'mediaText') {
          itemOutput = await MediaTextNode.renderItem({
            item,
            headingLevel,
            contentType
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
      paginationOutput = PaginationNode({
        total: Math.ceil(total / display),
        filters: paginationFilters,
        current,
        pageData
      })
    }

    /* Output */

    let output = outputArr.length > 0 ? outputArr.join('') : ''

    if (output !== '') {
      let layoutOutput = output

      if (layout === 'card') {
        layoutOutput = await CardsNode.render(output)
      }

      if (layout === 'mediaText') {
        layoutOutput = await MediaTextNode.render(output)
      }

      output = layoutOutput + paginationOutput
    }

    if (output === '' && pagination) {
      const plural = configNode.archiveMeta[queryContentType].plural
      const label = isStringStrict(plural) ? plural : 'Posts'

      return InfoNode({
        text: `Looks like no ${label.toLowerCase()} were found.`,
        type: 'warning'
      })
    }

    return output
  } catch (error) {
    console.error(configNode.console.red, '[MP] Error querying and/or outputting posts: ', error)

    return ''
  }
}

/* Exports */

export { PostsNode }
