/**
 * Components - Skip Link Html
 */

/* Imports */

import { addScriptStyle } from '@alanizcreative/static-site-formation/iop/utils/utils'

/**
 * Function - output link to main landmark
 *
 * @return {string} HTML - a
 */
const SkipLinkHtml = (): string => {
  /* Add styles */

  addScriptStyle({
    dir: 'components/SkipLink',
    style: 'SkipLink',
    priority: 2
  })

  /* Output */

  return `
    <a href="#main" class="c-skip-link t-s t-height-snug t-weight-bold bg-background-base l-block l-absolute l-left-0 l-top-0 l-px-2xs l-py-4xs t-align-center outline-inset">
      Skip to main content
    </a>
  `
}

/* Exports */

export { SkipLinkHtml }
