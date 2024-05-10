/**
 * Objects - Logo Node
 */

/* Imports */

import type { LogoArgs } from './LogoNodeTypes'
import { getPermalink, addScriptStyle, isObjectStrict } from '@alanizcreative/static-site-formation/iop/utils/utils'
import { LogoSvgNode } from '../../svg/Logo/LogoNode'
import { configNode } from '../../config/configNode'

/**
 * Function - output logo
 *
 * @param {import('./LogoNodeTypes').LogoArgs} args
 * @return {string} HTML - div || a
 */
const LogoNode = (args?: LogoArgs): string => {
  /* Args must be object */

  args = isObjectStrict(args) ? args : {}

  /* Args */

  const {
    size = '',
    link = false,
    theme = 'default'
  } = args

  let {
    classes = ''
  } = args

  /* Add styles */

  addScriptStyle({
    dir: 'objects/Logo',
    style: 'Logo',
    priority: 3
  })

  /* Containing tag */

  const tag = link ? 'a' : 'div'

  /* Classes */

  classes = `l-inline-flex l-relative${classes !== '' ? ` ${classes}` : ''}`

  if (link) {
    classes += ' js-pt-link'
  }

  /* Output */

  return `
    <${tag} class="${classes}"${link ? ` href="${getPermalink()}"` : ''}>
      <span class="a-hide-vis">${configNode.title}${link ? ' home' : ''}</span>
      ${LogoSvgNode(`o-logo${size !== '' ? `-${size}` : ''}`, theme)}
    </${tag}>
  `
}

/* Exports */

export { LogoNode }
