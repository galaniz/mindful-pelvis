/**
 * Objects - logo html
 */

/* Imports */

import getPermalink from '@alanizcreative/static-site-formation/lib/utils/get-permalink'
import addScriptStyle from '@alanizcreative/static-site-formation/lib/utils/add-script-style'
import logoSvg from '../../../svg/logo/html'
import config from '../../../config/html'

/**
 * Function - output logo
 *
 * @param {object} args
 * @return {string} HTML - div || a
 */

interface LogoArgs {
  size?: string
  link?: boolean
  classes?: string
}

const logo = (args: LogoArgs = {}): string => {
  const {
    size = '',
    link = false
  } = args

  let {
    classes = ''
  } = args

  /* Add styles */

  addScriptStyle({
    dir: 'objects/logo',
    style: true,
    priority: 3
  })

  /* Containing tag */

  const tag = link ? 'a' : 'div'

  /* Classes */

  classes = `o-logo${size !== '' ? `-${size}` : ''} l-block l-svg${classes !== '' ? ` ${classes}` : ''}`

  if (link) {
    classes += ' js-pt-link'
  }

  /* Output */

  return `
    <${tag} class="${classes}"${link ? ` href="${getPermalink()}"` : ''}>
      <span class="a11y-visually-hidden">${config.title}${link ? ' home' : ''}</span>
      ${logoSvg()}
    </${tag}>
  `
}

/* Exports */

export default logo
