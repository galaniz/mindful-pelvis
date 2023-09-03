/**
 * 11ty config
 */

/* Imports */

import * as dotenv from 'dotenv'
dotenv.config()
import htmlmin from 'html-minifier'
import { resolve, extname } from 'node:path'
import { getAllFilePaths } from '@alanizcreative/static-site-formation/lib'
import config from './src/config/html'

/* Config */

module.exports = (args: any) => {
  /* Set env and cms config */

  if (process) {
    const env = process.env

    config.env.cache = env?.USE_11TY_CACHE ? true : false
    config.env.dev = env.ENVIRONMENT === 'dev'
    config.env.prod = env.ENVIRONMENT === 'production'
    config.cms.name = 'contentful'
    config.cms.space = env.CTFL_SPACE_ID !== undefined ? env.CTFL_SPACE_ID : ''
    config.cms.previewAccessToken = env.CTFL_CPA_TOKEN !== undefined ? env.CTFL_CPA_TOKEN : ''
    config.cms.previewHost = 'preview.contentful.com'
    config.cms.deliveryAccessToken = env.CTFL_CDA_TOKEN !== undefined ? env.CTFL_CDA_TOKEN : ''
    config.cms.deliveryHost = 'cdn.contentful.com'
  }

  /* Ignore gitignore */

  args.setUseGitIgnore(false)

  /* Delete render from cache on watch */

  args.on('eleventy.beforeWatch', async () => {
    const folders = [
      './src/base/',
      './src/components/',
      './src/config/',
      './src/effects/',
      './src/global/',
      './src/layouts/',
      './src/objects/',
      './src/render/',
      './src/svg/',
      './src/text/',
      './src/utils/',
    ]

    for (let i = 0; i < folders.length; i += 1) {
      for await (const path of getAllFilePaths(folders[i])) {
        const ext = extname(path)

        if (ext === '.js') {
          delete require.cache[resolve(path)]
        }
      }
    }
  })

  /* Minify HTML */

  args.addTransform('htmlmin', (content: string, outputPath: string) => {
    if (outputPath.endsWith('.html')) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true
      })

      return minified
    }

    return content
  })

  /* Copy static asset folders */

  args.addPassthroughCopy({
    'src/fonts': 'assets/fonts'
  })

  args.addPassthroughCopy({
    'src/img': 'assets/img'
  })

  args.addPassthroughCopy({
    'src/favicon': 'assets/favicon'
  })

  /* Folder structure */

  return {
    dir: {
      data: 'data',
      output: 'site'
    }
  }
}
