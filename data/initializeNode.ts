/**
 * Data - Initialize Node
 */

/* Imports */

import type { RenderAllData, RenderReturn } from '@alanizcreative/static-site-formation/iop/render/renderTypes'
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
  isArray,
  setFilters,
  setActions,
  setShortcodes,
  setConfigFilter
} from '@alanizcreative/static-site-formation/iop/utils/utilsAll'
import { configNode, configNodeVars } from '../src/config/configNode'
import { FeedNodeBuild } from '../src/objects/Feed/FeedNodeBuild'
import { pagesNode } from '../src/pages/pagesNode'

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
      configNode.env.build = true
    }

    /* Reset style and script paths */

    configNode.actions.renderStart = async () => {
      configNodeVars.css.cache = ''
    }

    /* Build styles and scripts */

    configNode.actions.renderEnd = async () => {
      const entryPoints = {
        ...configNode.scripts.build,
        ...configNode.styles.build,
        ...configNodeVars.css.static
      }

      const { css, js } = configNodeVars

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
        // sourcemap: true,
        splitting: true,
        format: 'esm',
        target: 'es6',
        external: ['*.woff', '*.woff2'],
        resolveExtensions: ['.js', '.scss'],
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

    configNode.filters.renderItem = async (output) => {
      if (configNodeVars.css.in === '' || configNodeVars.css.head === '') {
        return output
      }

      let styles = ''

      if (configNodeVars.css.cache !== '') {
        styles = configNodeVars.css.cache
      } else {
        const sassRes = sass.compile(`./${configNodeVars.css.in}.scss`, {
          loadPaths: ['node_modules', './src'],
          style: 'compressed'
        })

        if (sassRes.css !== undefined) {
          styles += sassRes.css

          configNodeVars.css.cache = styles
        }
      }

      if (styles !== '' && configNode.env.build) {
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
              safelist: [
                ':focus',
                ':focus-visible'
              ],
              dynamicAttributes: [
                'data-stop-scroll'
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
        output = output.replace(configNodeVars.css.head, `<style>${styles}</style>`)
      }

      /* Output */

      return output
    }

    /* Cache data */

    if (configNode.env.cache && !isBuild) {
      configNode.filters.cacheData = async (cacheData, { key, type = 'get' }) => {
        const cacheInstance: {
          isCacheValid: Function
          getCachedValue: Function
          save: Function
        } = new AssetCache(key)

        if (type === 'get') {
          cacheData = cacheInstance.isCacheValid('1d') === true ? await cacheInstance.getCachedValue() : undefined
        }

        if (type === 'set' && isObject(cacheData)) {
          await cacheInstance.save(JSON.parse(safeJsonStringify(cacheData)), 'json')
        }

        return cacheData
      }
    }

    /* Feed build */

    if (isBuild) {
      configNode.shortcodes['instagram-feed'].callback = FeedNodeBuild
    }

    /* Render output */

    setFilters(configNode.filters)
    setActions(configNode.actions)
    setShortcodes(configNode.shortcodes)

    const staticData = await pagesNode()

    let data: RenderAllData = {
      content: {
        page: staticData
      }
    }

    if (!configNode.env.prod) {
      const cmsData = await getAllContentfulData()

      if (cmsData !== undefined) {
        data = cmsData
        data.content.page = [
          ...data.content.page,
          ...staticData
        ]
      }
    }

    const output = await render({ allData: data })

    /* Data json, serverless and redirect files */

    if (isBuild) {
      await writeStoreFiles()
      await writeRedirectsFile()
      await writeServerlessFiles({
        packageDir: 'iop',
        configName: 'configNode',
        configFile: 'src/config/configNode.js'
      })
    }

    /* Output */

    if (isArray(output)) {
      return output
    }

    return [{
      slug: '',
      output: ''
    }]
  } catch (error) {
    console.error(configNode.console.red, '[MP] Error rendering site: ', error)

    /* Output */

    return [{
      slug: '',
      output: ''
    }]
  }
}
