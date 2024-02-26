/**
 * Components - Article Init
 */

/* Imports */

import { isArray, setItems } from '@alanizcreative/formation/src/utils'
import { Visible } from '@alanizcreative/formation/src/effects/Visible/Visible'

/**
 * Function - initialize
 *
 * @return {void}
 */
const init = () => {
  /* Get DOM elements */

  const a = setItems({
    end: '.c-article__end',
    hashes: ['.c-article__hash']
  })

  /* Instantiate */

  const vis = (args) => {
    return new Visible(args)
  }

  /* Hash links */

  const { end, hashes } = a

  if (end && isArray(hashes)) {
    const items = []

    hashes.forEach((h) => {
      const id = h.hash.replace('#', '')
      const item = document.getElementById(id)

      if (item !== null) {
        items.push({
          item: h,
          visibleItem: [item],
          allowUnset: true
        })
      }
    })

    items.forEach((item, i) => {
      const next = items[i + 1]

      if (next !== undefined) {
        item.visibleItem.push(next.visibleItem[0])
      } else {
        item.visibleItem.push(end)
      }

      vis(item)
    })
  }
}

init()
