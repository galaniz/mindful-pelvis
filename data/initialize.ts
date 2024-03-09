/**
 * Data - Initialize
 */

/* Imports */

import type { RenderReturn } from '@alanizcreative/static-site-formation/iop/render/RenderTypes'
import * as sass from 'sass'
import postcss from 'postcss'
import purgecss from '@fullhuman/postcss-purgecss'
import autoprefixer from 'autoprefixer'
import esbuild from 'esbuild'
import { sassPlugin } from 'esbuild-sass-plugin'
// @ts-expect-error
import { AssetCache } from '@11ty/eleventy-fetch'
import safeJsonStringify from 'safe-json-stringify'
import { Render } from '@alanizcreative/static-site-formation/iop/render/Render'
import {
  getAllContentfulData,
  writeStoreFiles,
  writeServerlessFiles,
  writeRedirectsFile,
  isStringStrict,
  isObject,
  setFilters,
  setActions,
  setShortcodes
} from '@alanizcreative/static-site-formation/iop/utils/utilsAll'
import { configHtml, configHtmlVars } from '../src/config/configHtml'
import { FeedHtmlBuild } from '../src/objects/Feed/FeedHtmlBuild'
import { HttpErrorHtml } from '../src/render/HttpError/HttpErrorHtml'
import { ComingSoonHtml } from '../src/render/ComingSoon/ComingSoonHtml'

/* Eleventy init */

interface InitArgs {
  eleventy?: {
    env?: {
      runMode?: string
    }
  }
}

module.exports = async (args: InitArgs): Promise<RenderReturn[]> => {
  try {
    /* Build env */

    const mode: string = isStringStrict(args?.eleventy?.env?.runMode) ? args.eleventy.env.runMode : 'serve'

    if (mode === 'build') {
      configHtml.env.build = true
    }

    /* Reset style and script paths */

    configHtml.actions.renderStart = async (): Promise<void> => {
      configHtmlVars.css.cache = ''
    }

    /* Build styles and scripts */

    configHtml.actions.renderEnd = async (): Promise<void> => {
      const entryPoints = {
        ...configHtml.scripts.build,
        ...configHtml.styles.build
      }

      const { css, js } = configHtmlVars

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
      if (configHtmlVars.css.in === '' || configHtmlVars.css.head === '') {
        return output
      }

      let styles = ''

      if (configHtmlVars.css.cache !== '') {
        styles = configHtmlVars.css.cache
      } else {
        const sassRes = sass.compile(`./${configHtmlVars.css.in}`, {
          loadPaths: ['node_modules', './src'],
          style: 'compressed'
        })

        if (sassRes.css !== undefined) {
          styles += sassRes.css

          configHtmlVars.css.cache = styles
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
        output = output.replace(configHtmlVars.css.head, `<style>${styles}</style>`)
      }

      /* Output */

      return output
    }

    if (configHtml.env.prod) {
      return [{
        slug: '/',
        output: await ComingSoonHtml()
      }]
    }

    /* Cache data */

    if (configHtml.env.cache) {
      configHtml.filters.cacheData = async (cacheData, { key, type = 'get' }) => {
        const cacheInstance: {
          isCacheValid: Function
          getCachedValue: Function
          save: Function
        } = new AssetCache(key)

        if (type === 'get') {
          cacheData = cacheInstance.isCacheValid('1d') === true ? cacheInstance.getCachedValue() : undefined
        }

        if (type === 'set' && isObject(cacheData)) {
          await cacheInstance.save(JSON.parse(safeJsonStringify(cacheData)), 'json')
        }

        return cacheData
      }
    }

    /* Feed build */

    configHtml.shortcodes['instagram-feed'].callback = FeedHtmlBuild

    /* Render output */

    setFilters(configHtml.filters)
    setActions(configHtml.actions)
    setShortcodes(configHtml.shortcodes)

    const allData = await getAllContentfulData()

    if (allData !== undefined) {
      allData.content.page.push({
        id: '404',
        slug: '/404/',
        output: await HttpErrorHtml(404)
      })
    }

    const output = await Render({ allData })

    /* Data json, serverless and redirect files */

    if (configHtml.env.build) {
      await writeStoreFiles()
      await writeServerlessFiles()
      await writeRedirectsFile()
    }

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
