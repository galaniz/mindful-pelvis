/**
 * Components - Blobs Html
 */

/* Imports */

import type { BlobArgs } from '../../svg/Blob/BlobHtmlTypes'
import { BlobSvgHtml } from '../../svg/Blob/BlobHtml'
import { configHtmlVars } from '../../config/configHtml'

/**
 * Blob presets
 *
 * @type {import('../../svg/Blob/BlobHtmlTypes').BlobArgs}
 */
const _blobPresets: BlobArgs[][] = [
  [
    {
      type: 'one',
      size: 'small',
      theme: 'primary'
    },
    {
      type: 'two',
      size: 'large',
      theme: 'foreground'
    },
    {
      type: 'two',
      size: 'medium',
      theme: 'secondary'
    }
  ],
  [
    {
      type: 'two',
      size: 'large',
      theme: 'secondary'
    },
    {
      type: 'two',
      size: 'medium',
      theme: 'primary'
    },
    {
      type: 'one',
      size: 'small',
      theme: 'foreground',
      flip: true
    }
  ],
  [
    {
      type: 'two',
      size: 'medium',
      theme: 'primary'
    },
    {
      type: 'two',
      size: 'large',
      theme: 'secondary'
    },
    {
      type: 'two',
      size: 'medium',
      theme: 'foreground',
      flip: true
    }
  ],
  [
    {
      type: 'one',
      size: 'small',
      theme: 'primary'
    },
    {
      type: 'two',
      size: 'medium',
      theme: 'foreground'
    },
    {
      type: 'two',
      size: 'large',
      theme: 'secondary'
    }
  ],
  [
    {
      type: 'two',
      size: 'large',
      theme: 'secondary',
      flip: true
    },
    {
      type: 'one',
      size: 'small',
      theme: 'foreground',
      flip: true
    },
    {
      type: 'two',
      size: 'large',
      theme: 'primary',
      flip: true
    }
  ]
]

/**
 * Function - output blobs
 *
 * @param {string} [preset=None]
 * @return {string}
 */
const BlobsHtml = (preset: string = 'None'): string => {
  /* Preset */

  const presetIndex = configHtmlVars.options.blobs[preset]
  const blobs = _blobPresets[presetIndex]

  if (blobs === undefined) {
    return ''
  }

  /* Output */

  let output = ''

  for (let i = 0; i < 15; i += 1) {
    const index = i % 3
    const left = i % 2 === 0
    const args = blobs[index]

    args.dir = left ? 'left' : 'right'

    if (index === 0 && !left && i > 0) {
      args.flip = true
    }

    output += BlobSvgHtml(args)
  }

  return `
    <div class="l-absolute l-z-index--1 l-all-0 l-overflow-hidden l-flex l-col">
      ${output}
    </div>
  `
}

/* Exports */

export { BlobsHtml }
