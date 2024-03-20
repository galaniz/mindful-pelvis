/**
 * Objects - Logo Html
 */

/* Imports */

import type { LogoArgs } from './LogoHtmlTypes'
import { getPermalink, addScriptStyle, isObjectStrict } from '@alanizcreative/static-site-formation/iop/utils/utils'
import { LogoSvgHtml } from '../../svg/Logo/LogoHtml'
import { configHtml } from '../../config/configHtml'

/**
 * Function - output logo
 *
 * @param {import('./LogoHtmlTypes').LogoArgs} args
 * @return {string} HTML - div || a
 */
const LogoHtml = (args: LogoArgs = {}): string => {
  /* Args */

  const {
    size = '',
    link = false,
    theme = 'default'
  } = isObjectStrict(args) ? args : {}

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
      <span class="a-hide-vis">${configHtml.title}${link ? ' home' : ''}</span>
      ${LogoSvgHtml(`o-logo${size !== '' ? `-${size}` : ''}`, theme)}
    </${tag}>
  `
}

/* Exports */

export { LogoHtml }
