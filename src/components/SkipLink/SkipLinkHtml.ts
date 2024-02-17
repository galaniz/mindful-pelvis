/**
 * Components - Skip Link Html
 */

/* Imports */

import { addScriptStyle } from '@alanizcreative/static-site-formation/lib/utils/utilsMin'

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
    <a href="#main" class="c-skip-link t-m t-height-snug t-weight-bold bg-background-light l-block l-absolute l-left-0 l-right-0 l-top-0 l-pr-2xs l-pl-2xs l-pt-2xs l-pb-2xs t-align-center outline-snug">
      Skip to main content
    </a>
  `
}

/* Exports */

export { SkipLinkHtml }
