/**
 * 11ty config
 */

/* Imports */

import * as dotenv from 'dotenv'
dotenv.config()
import htmlmin from 'html-minifier'
import { resolve, extname } from 'node:path'
import { getAllFilePaths, isStringStrict } from '@alanizcreative/static-site-formation/lib/utils/utilsAll'
import { configHtml } from './src/config/configHtml'

/* Config */

module.exports = (args: any) => {
  /* Set env and cms config */

  if (process) {
    const env = process.env

    configHtml.env.cache = env.USE_11TY_CACHE ? true : false
    configHtml.env.dev = env.ENVIRONMENT === 'dev'
    configHtml.env.prod = env.ENVIRONMENT === 'production'
    configHtml.env.dir = isStringStrict(env.ELEVENTY_ROOT) ? env.ELEVENTY_ROOT : ''
    configHtml.cms.name = 'contentful'
    configHtml.cms.space = isStringStrict(env.CTFL_SPACE_ID) ? env.CTFL_SPACE_ID : ''
    configHtml.cms.previewAccessToken = isStringStrict(env.CTFL_CPA_TOKEN) ? env.CTFL_CPA_TOKEN : ''
    configHtml.cms.previewHost = 'preview.contentful.com'
    configHtml.cms.deliveryAccessToken = isStringStrict(env.CTFL_CDA_TOKEN) ? env.CTFL_CDA_TOKEN : ''
    configHtml.cms.deliveryHost = 'cdn.contentful.com'
  }

  /* Ignore gitignore */

  args.setUseGitIgnore(false)

  /* Watch style assets */

  args.addWatchTarget('./src/**/*.scss')

  /* Delete files from cache on watch */

  args.on('eleventy.beforeWatch', async () => {
    const folders = [
      './src/backgrounds/',
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
    'src/assets/fonts': 'assets/fonts'
  })

  args.addPassthroughCopy({
    'src/assets/img': 'assets/img'
  })

  args.addPassthroughCopy({
    'src/assets/favicon': 'assets/favicon'
  })

  /* Folder structure */

  return {
    dir: {
      data: 'data',
      output: 'site'
    }
  }
}
