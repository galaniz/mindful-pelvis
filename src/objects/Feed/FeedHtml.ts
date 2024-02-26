/**
 * Objects - Feed Html
 */

/* Imports */

import type { Feed } from './FeedHtmlTypes'
import type { ConfigInsta } from '../../config/configHtmlTypes'
import type { ImagesStore } from '@alanizcreative/static-site-formation/lib/utils/processImages/processImagesTypes'
import { Container } from '@alanizcreative/static-site-formation/lib/layouts/Container/Container'
import { Column } from '@alanizcreative/static-site-formation/lib/layouts/Column/Column'
import { getJsonFile, getPath } from '@alanizcreative/static-site-formation/lib/utils/utilsMin'
import { SocialSvgHtml } from '../../svg/Social/SocialHtml'
import { ImageHtml } from '../Image/ImageHtml'

/**
 * Function - output instagram feed as row of clickable images
 *
 * @type {import('./FeedHtmlTypes').Feed}
 */
const FeedHtml: Feed = async (args) => {
  const { attributes } = args // Skip check as shortcode always passes object

  /* Attributes */

  const {
    handle = '',
    'show-handle': showHandle = false
  } = attributes

  /* Handle required */

  if (handle === '') {
    return ''
  }

  /* Images... */

  const imagesData: ImagesStore | undefined = await getJsonFile(getPath('image', 'data'))

  if (imagesData === undefined) {
    return ''
  }

  /* Store columns */

  const columns = []

  /* Show handle link */

  if (showHandle) {
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
          <span class="l-flex l-ht-s l-wd-s bg-foreground-base t-light b-radius-100-pc l-align-center l-justify-center l-flex-shrink-0">
            ${SocialSvgHtml('instagram', 'l-ht-2xs l-wd-2xs')}
          </span>
          <span class="t l-pl-2xs">Follow @${handle}</span>
        </a>
      ${column.end}
    `)
  }

  /* Feed posts */

  const feedData: ConfigInsta[] | undefined = await getJsonFile(getPath('instagramFeed', 'store'))

  if (feedData === undefined) {
    return ''
  }

  const feedLen = feedData.length
  const widthLarge = `1/${feedLen}`

  for (let i = 0; i < feedLen; i += 1) {
    const post = feedData[i]
    const { url, src } = post

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
