/**
 * 11ty config
 */

/* Imports */

import * as dotenv from 'dotenv'
dotenv.config()
import htmlmin from 'html-minifier'
import { resolve, extname } from 'node:path'
import { getAllFilePaths } from '@alanizcreative/static-site-formation/iop/utils/utilsAll'

/* Config */

module.exports = (args: any) => {
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
      './src/pages/',
      './src/svg/',
      './src/text/'
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
