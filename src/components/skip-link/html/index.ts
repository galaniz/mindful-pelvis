/**
 * Components - skip link html
 */

/* Imports */

import addScriptStyle from '@alanizcreative/static-site-formation/lib/utils/add-script-style'

/**
 * Function - output link to main landmark
 *
 * @return {string} HTML - a
 */

const skipLink = (): string => {
  /* Add styles */

  addScriptStyle({
    dir: 'components/skip-link',
    style: true,
    priority: 2
  })

  /* Output */

  return `
    <a href="#main" class="c-skip-link t-m t-height-130-pc t-weight-bold bg-background-light l-block l-absolute l-left-0 l-right-0 l-top-0 l-padding-right-2xs l-padding-left-2xs l-padding-top-2xs l-padding-bottom-2xs t-align-center outline-snug">
      Skip to main content
    </a>
  `
}

/* Exports */

export default skipLink
