/**
 * Objects - Feed Node
 */

/* Imports */

import type { Feed } from './FeedNodeTypes'
import type { ImagesStore } from '@alanizcreative/static-site-formation/iop/utils/processImages/processImagesTypes'
import { getJsonFile, getPath } from '@alanizcreative/static-site-formation/iop/utils/utils'
import { configNodeVars } from '../../config/configNode'
import { SocialSvgNode } from '../../svg/Social/SocialNode'
import { ImageNode } from '../Image/ImageNode'

/**
 * Function - output instagram feed as row of clickable images
 *
 * @type {import('./FeedNodeTypes').Feed}
 */
const FeedNode: Feed = async (args, data) => {
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
    const handle = configNodeVars.instagram
    const link = `https://www.instagram.com/${handle}/`

    columns.push(`
      <li class="l-col-12 e-line-r">
        <a href="${link}" class="l-inline-flex l-align-center t-link-current" rel="noreferrer" data-rich>
          <span class="l-flex l-ht-s l-wd-s bg-foreground-base t-light t-sharp b-radius-full l-align-center l-justify-center l-shrink-0">
            ${SocialSvgNode('instagram', 'l-flex l-ht-2xs l-wd-2xs')}
          </span>
          <span class="t l-pl-2xs">Follow @${handle}</span>
        </a>
      </li>
    `)
  }

  /* Feed posts */

  data = data === undefined ? await getJsonFile(getPath('instagramFeed', 'store')) : data

  if (data === undefined) {
    return ''
  }

  const dataLen = data.length

  for (let i = 0; i < dataLen; i += 1) {
    const { url, src } = data[i]

    columns.push(`
      <li class="l-col-6 l-col-4-s l-col-3-m l-col-${12 / dataLen}-l">
        <a href="${url}" rel="noreferrer" class="l-block e-trans e-fade">
          ${await ImageNode({
            args: {
              image: imagesData[src],
              aspectRatio: '1:1',
              source: 'static'
            }
          })}
        </a>
      </li>
    `)
  }

  /* Output */

  return `
    <ul class="l-flex l-wrap l-gap-xs t-ls-none" role="list">
      ${columns.join('')}
    </ul>
  `
}

/* Exports */

export { FeedNode }
