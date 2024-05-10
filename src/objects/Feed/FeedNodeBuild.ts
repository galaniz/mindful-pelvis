/**
 * Objects - Feed Node Build
 */

/* Imports */

import type { Feed, FeedRemoteData, FeedData } from './FeedNodeTypes'
import { writeFile } from 'node:fs'
import { mkdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import { processImages, isStringStrict } from '@alanizcreative/static-site-formation/iop/utils/utilsAll'
import { configNode, configNodeVars } from '../../config/configNode'
import { FeedNode } from './FeedNode'

/**
 * Extensions by image mime type
 *
 * @private
 * @type {Object.<string, string>}
 */
const _mimeToExt: Record<string, string> = {
  'image/apng': 'apng',
  'image/avif': 'avif',
  'image/bmp': 'bmp',
  'image/gif': 'gif',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/tiff': 'tif',
  'image/webp': 'webp'
}

/**
 * Function - promisify write function
 *
 * @private
 * @param {string} path
 * @param {string} data
 * @return {Promise<void>}
 */
const _writeBase64 = async (path: string, data: string): Promise<void> => {
  return await new Promise((resolve, reject) => {
    writeFile(path, data, { encoding: 'base64' }, (error) => {
      if (error !== null && error !== undefined) {
        reject(error)
      } else {
        resolve()
      }
    })
  })
}

/**
 * Function - on build output instagram feed as row of clickable images
 *
 * @type {import('./FeedNodeTypes').Feed}
 */
const FeedNodeBuild: Feed = async (args) => {
  /* Store feed data */

  const feedData: FeedData[] = []

  try {
    /* Fetch data from Cloudflare KV */

    const {
      namespaceId,
      accountId,
      token,
      apiEmail,
      apiKey
    } = configNodeVars.cloudflare

    const emptyCredentials =
      !isStringStrict(namespaceId) || !isStringStrict(accountId) || !isStringStrict(token) ||
      !isStringStrict(apiEmail) || !isStringStrict(apiKey)

    if (emptyCredentials) {
      throw new Error('No Cloudflare credentials')
    }

    const cfUrl =
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/storage/kv/namespaces/${namespaceId}/values/instagramFeed`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'X-Auth-Email': apiEmail,
        'X-Auth-Key': apiKey,
        'Content-Type': 'application/json'
      }
    }

    const res = await fetch(cfUrl, options)

    if (!res.ok) {
      throw new Error('Cloudflare fetch failed')
    }

    const data: FeedRemoteData[] = await res.json()

    /* Add instagram folder to img folder */

    const inputDir = configNode.static.image.inputDir
    const folder = 'instagram-feed'

    await mkdir(resolve(`${inputDir}/${folder}`), { recursive: true })

    /* Add base64 images to instagram folder and data to store */

    await Promise.allSettled(
      data.map(async (d, i) => {
        const { url, alt, base64 } = d
        const { mime, data } = base64

        const ext = _mimeToExt[mime]
        const path = `${folder}/post-${i + 1}`

        feedData[i] = {
          url,
          alt,
          src: path
        }

        return await _writeBase64(`${inputDir}/${path}.${ext}`, data)
      })
    )

    configNode.store.files.instagramFeed.data = JSON.stringify(feedData)

    await processImages()
  } catch (error) {
    console.error(configNode.console.red, '[MP] Error fetching instagram feed data: ', error)
  }

  /* Output */

  return await FeedNode(args, feedData)
}

/* Exports */

export { FeedNodeBuild }
