/**
 * Components - Article Browser
 */

/* Imports */

import type { ArticleHashArgs } from './ArticleBrowserTypes'
import { setItems } from '@alanizcreative/formation/lib/utils/utils'
import { VisibleHash } from '@alanizcreative/formation/lib/effects/Visible/VisibleHash'
import { configBrowser } from '../../config/configBrowser'

/**
 * Function - initialize article browser
 *
 * @return {void}
 */
const ArticleBrowser = (): void => {
  /* Get DOM elements */

  const a = setItems({
    end: '.c-article__end',
    hashes: [
      '.c-article__hash'
    ]
  })

  /* Offset */

  const { fontSizeMultiplier } = configBrowser
  const offset = 50 * fontSizeMultiplier

  /* Hash links */

  const { end, hashes } = a

  if (end !== null && hashes.length > 0) {
    const hashArgs: ArticleHashArgs[] = []

    /* Get visible item from hash */

    hashes.forEach((h) => {
      const id = h instanceof HTMLAnchorElement ? h.hash.replace('#', '') : ''

      if (id === '') {
        return
      }

      const item = document.getElementById(id)

      if (item === null) {
        return
      }

      hashArgs.push({
        link: h,
        item: [item],
        offset
      })
    })

    /* Check for next visible item and instantiate */

    hashArgs.forEach((args, i) => {
      const next = hashArgs[i + 1]

      if (next !== undefined) {
        args.item.push(next.item[0])
      } else {
        args.item.push(end)
      }

      return new VisibleHash(args)
    })
  }
}

ArticleBrowser()
