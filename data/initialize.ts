/**
 * Data - Initialize
 */

/* Imports */

import type { RenderReturn } from '@alanizcreative/static-site-formation/iop/render/renderTypes'
import * as sass from 'sass'
import postcss from 'postcss'
import purgecss from '@fullhuman/postcss-purgecss'
import autoprefixer from 'autoprefixer'
import esbuild from 'esbuild'
import { sassPlugin } from 'esbuild-sass-plugin'
// @ts-expect-error
import { AssetCache } from '@11ty/eleventy-fetch'
import safeJsonStringify from 'safe-json-stringify'
import { render } from '@alanizcreative/static-site-formation/iop/render/render'
import {
  getAllContentfulData,
  writeStoreFiles,
  writeServerlessFiles,
  writeRedirectsFile,
  isStringStrict,
  isObject,
  setFilters,
  setActions,
  setShortcodes,
  setConfigFilter
} from '@alanizcreative/static-site-formation/iop/utils/utilsAll'
import { configHtml, configHtmlVars } from '../src/config/configHtml'
import { FeedHtmlBuild } from '../src/objects/Feed/FeedHtmlBuild'
import { HttpErrorHtml } from '../src/pages/HttpError/HttpErrorHtml'
import { ComingSoonHtml } from '../src/pages/ComingSoon/ComingSoonHtml'

/* Eleventy init */

module.exports = async (args: any): Promise<RenderReturn[]> => {
  try {
    /* Set config env */

    if (process !== undefined) {
      await setConfigFilter(process.env)
    }

    const mode: string = isStringStrict(args?.eleventy?.env?.runMode) ? args.eleventy.env.runMode : 'serve'
    const isBuild = mode === 'build'

    if (isBuild) {
      configHtml.env.build = true
    }

    /* Reset style and script paths */

    configHtml.actions.renderStart = async () => {
      configHtmlVars.css.cache = ''
    }

    /* Build styles and scripts */

    configHtml.actions.renderEnd = async () => {
      const entryPoints = {
        ...configHtml.scripts.build,
        ...configHtml.styles.build
      }

      const { css, js } = configHtmlVars

      if (css.in !== '' && css.out !== '') {
        entryPoints[css.out] = `${css.in}.scss`
      }

      if (js.in !== '' && js.out !== '') {
        entryPoints[js.out] = `${js.in}.js`
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

    configHtml.filters.renderItem = async (output) => {
      if (configHtmlVars.css.in === '' || configHtmlVars.css.head === '') {
        return output
      }

      let styles = ''

      if (configHtmlVars.css.cache !== '') {
        styles = configHtmlVars.css.cache
      } else {
        const sassRes = sass.compile(`./${configHtmlVars.css.in}.scss`, {
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

    /* Cache data */

    if (configHtml.env.cache && !isBuild) {
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

    if (isBuild) {
      configHtml.shortcodes['instagram-feed'].callback = FeedHtmlBuild
    }

    /* Render output */

    setFilters(configHtml.filters)
    setActions(configHtml.actions)
    setShortcodes(configHtml.shortcodes)

    const allData = await getAllContentfulData()
    const output = configHtml.env.prod ? [{ slug: '/', output: await ComingSoonHtml() }] : await render({ allData })

    /* Data json, serverless and redirect files */

    if (isBuild) {
      await writeStoreFiles()
      await writeRedirectsFile()
      await writeServerlessFiles({
        packageDir: 'iop',
        configName: 'configHtml',
        configFile: 'src/config/configHtml.js'
      })
    }

    /* Output */

    if (Array.isArray(output)) {
      if (isBuild) {
        output.push({
          slug: '404.html',
          output: await HttpErrorHtml(404)
        })
      }

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
