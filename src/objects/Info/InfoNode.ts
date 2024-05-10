/**
 * Objects - Info Node
 */

/* Imports */

import type { InfoArgs } from './InfoNodeTypes'
import {
  isStringStrict,
  addScriptStyle,
  isObjectStrict
} from '@alanizcreative/static-site-formation/iop/utils/utils'
import { InfoSvgNode } from '../../svg/Info/InfoNode'
import { CheckMarkSvgNode } from '../../svg/CheckMark/CheckMarkNode'

/**
 * Function - output info block
 *
 * @param {import('./InfoNodeTypes').InfoArgs} args
 * @return {string} HTML - div
 */
const InfoNode = (args: InfoArgs): string => {
  /* Args */

  const {
    text = '',
    textType = 'plain',
    type = 'neutral',
    classes = ''
  } = isObjectStrict(args) ? args : {}

  /* Text required */

  if (!isStringStrict(text)) {
    return ''
  }

  /* Icon */

  const icon = type === 'success' ? CheckMarkSvgNode : InfoSvgNode

  /* Color theme */

  let color = 'primary-dark'

  if (type === 'warning') {
    color = 'secondary-dark'
  }

  if (type === 'error') {
    color = 'negative-base'
  }

  if (type === 'success') {
    color = 'positive-base'
  }

  /* Text output */

  let textOutput = text

  if (textType === 'plain') {
    textOutput = `<p class="t-r t-wt-bold t-current">${text}</p>`
  }

  /* Classes */

  let containerClasses = 'o-info l-flex l-gap-4xs l-py-3xs l-pl-3xs l-pr-2xs b-left b-current'

  if (isStringStrict(classes)) {
    containerClasses += ` ${classes}`
  }

  /* Add styles */

  addScriptStyle({
    dir: 'objects/Info',
    style: 'Info'
  })

  /* Output */

  return `
    <div class="${containerClasses}" style="--theme:var(--${color}-hsl)">
      ${icon('l-flex l-wd-xs l-ht-xs')}
      ${textOutput}
    </div>
  `
}

/* Exports */

export { InfoNode }
