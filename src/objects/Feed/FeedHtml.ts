/**
 * Objects - Feed Html
 */

/* Imports */

import type { Feed } from './FeedHtmlTypes'
import type { ImagesStore } from '@alanizcreative/static-site-formation/iop/utils/processImages/processImagesTypes'
import { Container } from '@alanizcreative/static-site-formation/iop/layouts/Container/Container'
import { Column } from '@alanizcreative/static-site-formation/iop/layouts/Column/Column'
import { getJsonFile, getPath } from '@alanizcreative/static-site-formation/iop/utils/utils'
import { SocialSvgHtml } from '../../svg/Social/SocialHtml'
import { configHtmlVars } from '../../config/configHtml'
import { ImageHtml } from '../Image/ImageHtml'

/**
 * Function - output instagram feed as row of clickable images
 *
 * @type {import('./FeedHtmlTypes').Feed}
 */
const FeedHtml: Feed = async (args, data) => {
  const { attributes } = args // Skip check as shortcode always passes object

  /* Attributes */

  const {
    'show-handle': showHandle = false
  } = attributes

  /* Images data */

  const imagesData: ImagesStore | undefined = await getJsonFile(getPath('image', 'data'))

  if (imagesData === undefined) {
    return ''
  }

  /* Store columns */

  const columns = []

  /* Show handle link */

  if (showHandle) {
    const handle = configHtmlVars.instagram
    const link = `https://www.instagram.com/${handle}/`

    const column = await Column({
      args: {
        width: '1/1',
        tag: 'li'
      }
    })

    columns.push(`
      ${column.start}
        <a href="${link}" class="l-inline-flex l-align-center t-link-current" rel="noreferrer">
          <span class="l-flex l-ht-s l-wd-s bg-foreground-base t-light b-radius-full l-align-center l-justify-center l-shrink-0">
            ${SocialSvgHtml('instagram', 'l-ht-2xs l-wd-2xs')}
          </span>
          <span class="t l-pl-2xs">Follow @${handle}</span>
        </a>
      ${column.end}
    `)
  }

  /* Feed posts */

  data = data === undefined ? await getJsonFile(getPath('instagramFeed', 'store')) : data

  if (data === undefined) {
    return ''
  }

  const dataLen = data.length
  const widthLarge = `1/${dataLen}`

  for (let i = 0; i < dataLen; i += 1) {
    const { url, src } = data[i]

    const column = await Column({
      args: {
        width: '1/2',
        widthSmall: '1/3',
        widthMedium: '1/4',
        widthLarge,
        tag: 'li'
      }
    })

    const imageOutput = await ImageHtml({
      args: {
        image: imagesData[src],
        aspectRatio: '1:1',
        source: 'static'
      }
    })

    columns.push(`
      ${column.start}
        <a href="${url}" rel="noreferrer" class="l-block">${imageOutput}</a>
      ${column.end}
    `)
  }

  /* Output */

  const container = await Container({
    args: {
      tag: 'ul',
      layout: 'Row',
      gap: '30px'
    }
  })

  return `
    ${container.start}
      ${columns.join('')}
    ${container.end}
  `
}

/* Exports */

export { FeedHtml }
