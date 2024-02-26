/**
 * Objects - Feed Html Build
 */

/* Imports */

import type { Feed } from './FeedHtmlTypes'
import puppeteer from 'puppeteer'
import { FeedHtml } from './FeedHtml'
import { configHtml, configHtmlVars } from '../../config/configHtml'
import { processImages, remoteImages } from '@alanizcreative/static-site-formation/lib/utils/utilsAll'
import { ConfigInsta } from '../../config/configHtmlTypes'

/**
 * Function - on build output instagram feed as row of clickable images
 *
 * @type {import('./FeedHtmlTypes').Feed}
 */
const FeedHtmlBuild: Feed = async (args) => {
  const { attributes } = args // Skip check as shortcode always passes object

  /* Attributes */

  const {
    display = 5,
    handle = ''
  } = attributes

  /* Handle required */

  if (handle === '') {
    return ''
  }

  /* Fetch and download feed */

  if (configHtml.env.build) {
    try {
      /* Scrape profile page */

      const link = `https://www.instagram.com/${handle}/`
      const selector = 'article'
      const browser = await puppeteer.launch()
      const page = await browser.newPage()

      let data: ConfigInsta[] = []

      await page.goto(link)
      await page.setViewport({ width: 1280, height: 1080 })
      await page.waitForSelector(selector)

      const linksHandle = await page.$(selector)

      if (linksHandle !== null) {
        data = await linksHandle.$$eval('a', (nodes) => {
          return nodes.flatMap((node) => {
            const url = node.href
            const img = node.querySelector('img')
            const src = img !== null ? img.src : ''
            const alt = img !== null ? img.alt : ''

            if (url === '' || src === '') {
              return []
            }

            return [{
              url,
              src,
              alt
            }]
          })
        })

        if (data.length > display) {
          data = data.splice(0, display)
        }

        await linksHandle.dispose()
      }

      await browser.close()

      /* Download images */

      const res = await remoteImages(data.map((d, i) => {
        const { src } = d

        const localSrc = `instagram-feed/post-${i + 1}`
        data[i].src = localSrc

        return {
          path: localSrc,
          url: src
        }
      }))

      const fail = res.length === 0 || res.some(({ status }: { status: string }) => status !== 'fulfilled')
      const fallback = configHtmlVars.instagramFeed

      configHtmlVars.instagramFeed = fail ? fallback : data
      configHtml.store.files.instagramFeed.data = JSON.stringify(fail ? fallback : data)

      await processImages()
    } catch (error) {
      console.error(configHtml.console.red, '[MP] Error fetching instagram feed: ', error)
    }
  }

  /* Output */

  return await FeedHtml(args)
}

/* Exports */

export { FeedHtmlBuild }
