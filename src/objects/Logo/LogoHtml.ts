/**
 * Objects - Logo Html
 */

/* Imports */

import { getPermalink, addScriptStyle } from '@alanizcreative/static-site-formation/lib/utils/utilsMin'
import { LogoSvgHtml } from '../../svg/Logo/LogoHtml'
import { configHtml } from '../../config/configHtml'

/**
 * Function - output logo
 *
 * @param {object} args
 * @param {string} args.size
 * @param {boolean} args.link
 * @param {string} args.theme
 * @param {string} args.classes
 * @return {string} HTML - div || a
 */

interface LogoArgs {
  size?: string
  link?: boolean
  theme?: string
  classes?: string
}

const LogoHtml = (args: LogoArgs = {}): string => {
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
      <span class="a-visually-hidden">${configHtml.title}${link ? ' home' : ''}</span>
      ${LogoSvgHtml(`o-logo${size !== '' ? `-${size}` : ''}`, theme)}
    </${tag}>
  `
}

/* Exports */

export { LogoHtml }
