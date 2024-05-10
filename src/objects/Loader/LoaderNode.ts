/**
 * Objects - Loader Node
 */

/* Imports */

import type { LoaderArgs } from './LoaderNodeTypes'
import {
  addScriptStyle,
  isObjectStrict,
  isStringStrict
} from '@alanizcreative/static-site-formation/iop/utils/utils'

/**
 * Function - output loader
 *
 * @param {import('./LoaderNodeTypes').LoaderArgs} args
 * @return {string}
 */
const LoaderNode = (args?: LoaderArgs): string => {
  /* Args */

  let {
    show = false,
    classes = '',
    ariaHidden = true,
    a11yHideText = ''
  } = isObjectStrict(args) ? args : {}

  /* Attributes */

  let attrs = ''

  if (show) {
    attrs += ' data-loader-show'
  }

  if (ariaHidden) {
    attrs += ' aria-hidden="true"'
  }

  if (isStringStrict(a11yHideText)) {
    a11yHideText = `<span class="a-hide-vis no-motion-hide">${a11yHideText}</span>`
  }

  /* Classes */

  let containerClasses = 'o-loader l-absolute l-all-0 l-flex l-justify-center l-align-center'

  if (isStringStrict(classes)) {
    containerClasses += ` ${classes}`
  }

  /* Add styles */

  addScriptStyle({
    dir: 'objects/Loader',
    style: 'Loader'
  })

  /* Output */

  return `
    <span class="${containerClasses}"${attrs}>
      <span class="l-flex l-justify-center l-align-center l-gap-4xs no-motion-hide">
        <span class="o-loader__dot b-radius-full"></span>
        <span class="o-loader__dot b-radius-full"></span>
        <span class="o-loader__dot b-radius-full"></span>
      </span>
      <span class="t-s t-wt-bold l-none no-motion-show">Loading</span>
      ${a11yHideText}
    </span>
  `
}

/* Exports */

export { LoaderNode }
