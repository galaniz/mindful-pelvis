/**
 * Objects - Image Color Init
 */

/* Imports */

import { setItems, assetLoaded, onResize } from '@alanizcreative/formation/lib/utils/utils'

/**
 * Function - initialize
 *
 * @return {void}
 */
const init = (): void => {
  /* Get DOM elements */

  const pictures = setItems([
    {
      context: '.o-image-color',
      image: 'img'
    }
  ])

  /* Instantiate */

  if (pictures.length > 0) {
    pictures.forEach(p => {
      const { context, image } = p

      if (!(context instanceof HTMLElement) || !(image instanceof HTMLImageElement)) {
        return
      }

      assetLoaded(image)
        .then(() => {
          context.style.setProperty('--src', `url(${image.currentSrc})`)
          context.setAttribute('data-loaded', 'true')
        })
        .catch(() => {
          context.setAttribute('data-loaded', 'error')
        })

      onResize(() => {
        context.style.setProperty('--src', `url(${image.currentSrc})`)
      })
    })
  }
}

init()
