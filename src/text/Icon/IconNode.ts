/**
 * Text - Icon Node
 */

/* Imports */

import type { Icon } from './IconNodeTypes'
import type { GenericStrings } from '@alanizcreative/static-site-formation/iop/global/globalTypes'
import { isStringStrict } from '@alanizcreative/static-site-formation/iop/utils/utils'
import { configNodeVars } from '../../config/configNode'
import { MarkerSvgNode } from '../../svg/Marker/MarkerNode'
import { ClockSvgNode } from '../../svg/Clock/ClockNode'
import { SocialSvgNode } from '../../svg/Social/SocialNode'

/**
 * Gap to text gap conversion
 *
 * @type {GenericStrings}
 */
const _textGaps: GenericStrings = {
  '5xs': '',
  '4xs': '',
  '3xs': '5xs',
  '2xs': '5xs',
  xs: '4xs',
  s: '3xs',
  m: '3xs'
}

/**
 * Function - output icon with text
 *
 * @type {Icon}
 */
const IconNode: Icon = async (args) => {
  /* Args */

  const { attributes, content } = args // Skip check as shortcode always passes object

  let {
    type = 'location',
    gap = '15px',
    size = '30px'
  } = attributes

  /* Normalize */

  gap = configNodeVars.options.gap[gap]
  size = configNodeVars.options.dimension[size]

  /* Gap and size required */

  if (!isStringStrict(gap)) {
    return content
  }

  if (!isStringStrict(size)) {
    return content
  }

  /* Tag */

  const tag = type === 'location' ? 'address' : 'div'

  /* Icon */

  const iconClasses = `l-flex l-shrink-0 l-wd-${size} l-ht-${size}`

  let iconOutput = ''

  if (type === 'location') {
    iconOutput = MarkerSvgNode(iconClasses)
  }

  if (type === 'hours') {
    iconOutput = ClockSvgNode(iconClasses)
  }

  if (type === 'mail') {
    iconOutput = SocialSvgNode('email', iconClasses)
  }

  /* Output */

  return `
    <${tag} class="l-flex l-gap-${gap}">
      ${iconOutput}
      <div class="l-mb-${_textGaps[gap]}-all">
        ${content}
      </div>
    </${tag}>
  `
}

/* Exports */

export { IconNode }
