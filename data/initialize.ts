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
import { Render } from '@alanizcreative/static-site-formation/lib/render/Render'
import {
  getAllContentfulData,
  writeStoreFiles,
  writeServerlessFiles,
  writeRedirectsFile
} from '@alanizcreative/static-site-formation/lib/utils'
import { configHtml } from '../src/config/configHtml'
import { cacheHtml } from '../src/utils/cache/cacheHtml'

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
      configHtml.env.build = true
    }

    /* Reset style and script paths */

    configHtml.actions.renderStart = async (): Promise<void> => {
      configHtml.vars.css.cache = ''
    }

    /* Build styles and scripts */

    configHtml.actions.renderEnd = async (): Promise<void> => {
      const entryPoints = {
        ...configHtml.scripts.build,
        ...configHtml.styles.build
      }

      const { css, js } = configHtml.vars

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

    configHtml.filters.renderItem = async (output: string): Promise<string> => {
      if (configHtml.vars.css.in === '' || configHtml.vars.css.head === '') {
        return output
      }

      let styles = ''

      if (configHtml.vars.css.cache !== '') {
        styles = configHtml.vars.css.cache
      } else {
        const sassRes = sass.compile(`./${configHtml.vars.css.in}`, {
          loadPaths: ['node_modules', './src'],
          style: 'compressed'
        })

        if (sassRes.css !== undefined) {
          styles += sassRes.css

          configHtml.vars.css.cache = styles
        }
      }

      if (styles !== '' && configHtml.env.build) {
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
                'data-stop-scroll',
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
        output = output.replace(configHtml.vars.css.head, `<style>${styles}</style>`)
      }

      /* Output */

      return output
    }

    /* Cache data */

    if (configHtml.env.cache) {
      configHtml.filters.cacheData = async (cacheData: FRM.AnyObject, { key, type = 'get', data }: FRM.CacheDataFilterArgs): Promise<object> => {
        const c = await cacheHtml(key, type, data)

        if (c !== undefined) {
          cacheData = c
        }

        return cacheData
      }
    }

    /* Render output */

    const output = await Render({
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
    console.error(configHtml.console.red, '[MP] Error rendering site: ', error)

    /* Output */

    return [{
      slug: '',
      output: ''
    }]
  }
}
