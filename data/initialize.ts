/**
 * Data - Initialize
 */

/* Imports */

import * as sass from 'sass'
import postcss from 'postcss'
import purgecss from '@fullhuman/postcss-purgecss'
import autoprefixer from 'autoprefixer'
import esbuild from 'esbuild'
import { sassPlugin } from 'esbuild-sass-plugin'
import render from '@alanizcreative/static-site-formation/lib/render'
import getAllContentfulData from '@alanizcreative/static-site-formation/lib/utils/get-all-contentful-data'
import writeStoreFiles from '@alanizcreative/static-site-formation/lib/utils/write-store-files'
import writeServerlessFiles from '@alanizcreative/static-site-formation/lib/utils/write-serverless-files'
import writeRedirectsFile from '@alanizcreative/static-site-formation/lib/utils/write-redirects-file'
import config from '../src/config/html'
import cache from '../src/utils/cache/html'

/* Eleventy init */

interface InitArgs {
  eleventy?: {
    env?: {
      runMode?: string
    }
  }
}

module.exports = async (args: InitArgs): Promise<FRM.RenderReturn[]> => {
  try {
    /* Build env */

    const mode: string = typeof args?.eleventy?.env?.runMode === 'string' ? args.eleventy.env.runMode : 'serve'

    if (mode === 'build') {
      config.env.build = true
    }

    /* Reset style and script paths */

    config.actions.renderStart = async (): Promise<void> => {
      config.vars.css.cache = ''
    }

    /* Build styles and scripts */

    config.actions.renderEnd = async (): Promise<void> => {
      const entryPoints = {
        ...config.scripts.build,
        ...config.styles.build
      }

      const { css, js } = config.vars

      if (css.in !== '' && css.out !== '') {
        entryPoints[css.out] = css.in
      }

      if (js.in !== '' && js.out !== '') {
        entryPoints[js.out] = js.in
      }

      await esbuild.build({
        entryPoints,
        outdir: 'site/assets',
        minify: true,
        bundle: true,
        sourcemap: false,
        splitting: true,
        format: 'esm',
        target: 'es6',
        external: ['*.woff', '*.woff2'],
        plugins: [
          sassPlugin({
            async transform (source) {
              const { css } = await postcss(
                [
                  autoprefixer
                ]
              ).process(
                source
              )

              return css
            }
          })
        ]
      })
    }

    /* Inline styles */

    config.filters.renderItem = async (output: string): Promise<string> => {
      if (config.vars.css.in === '' || config.vars.css.head === '') {
        return output
      }

      let styles = ''

      if (config.vars.css.cache !== '') {
        styles = config.vars.css.cache
      } else {
        const sassRes = sass.compile(`./${config.vars.css.in}`, {
          loadPaths: ['node_modules', './src'],
          style: 'compressed'
        })

        if (sassRes.css !== undefined) {
          styles += sassRes.css

          config.vars.css.cache = styles
        }
      }

      if (styles !== '' && config.env.build) {
        const postRes = await postcss(
          [
            autoprefixer,
            purgecss({
              content: [
                {
                  raw: output,
                  extension: 'html'
                }
              ],
              dynamicAttributes: [
                'data-no-scroll',
                'data-show'
              ]
            })
          ]
        ).process(
          styles, {
            from: undefined
          }
        )

        if (postRes.css !== undefined && postRes.css !== '') {
          styles = postRes.css
        }
      }

      if (styles !== '') {
        output = output.replace(config.vars.css.head, `<style>${styles}</style>`)
      }

      /* Output */

      return output
    }

    /* Cache data */

    if (config.env.cache) {
      config.filters.cacheData = async (cacheData: FRM.AnyObject, { key, type = 'get', data }: FRM.CacheDataFilterArgs): Promise<object> => {
        const c = await cache(key, type, data)

        if (c !== undefined) {
          cacheData = c
        }

        return cacheData
      }
    }

    /* Render output */

    const output = await render({
      allData: await getAllContentfulData()
    })

    /* Data json files */

    await writeStoreFiles()

    /* Serverless files */

    await writeServerlessFiles()

    /* Redirect file */

    await writeRedirectsFile()

    /* Output */

    if (Array.isArray(output)) {
      return output
    }

    return [{
      slug: '',
      output: ''
    }]
  } catch (error) {
    console.error(config.console.red, '[MP] Error rendering site: ', error)

    /* Output */

    return [{
      slug: '',
      output: ''
    }]
  }
}
