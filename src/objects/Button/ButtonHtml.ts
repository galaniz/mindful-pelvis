/**
 * Objects - Button Html
 */

/* Imports */

import type { ButtonProps } from './ButtonHtmlTypes'
import { getLink, addScriptStyle } from '@alanizcreative/static-site-formation/lib/utils/utilsMin'
import { configHtmlVars } from '../../config/configHtml'

/**
 * Function - output link button
 *
 * @param {ButtonProps} props
 * @return {string} HTML - a || div
 */
const ButtonHtml = (props: ButtonProps = { args: {} }): string => {
  const { args = {} } = props

  const {
    title = '',
    internalLink,
    externalLink = ''
  } = args

  let {
    link = '',
    type = 'Main',
    size = 'Default',
    justify = 'None',
    paddingTop = 'None',
    paddingBottom = 'None',
    theme = 'default'
  } = args

  /* Link and title required */

  link = link === '' ? getLink(internalLink, externalLink) : link

  if (link === '' || title === '') {
    return ''
  }

  /* Check if external */

  const external = externalLink !== ''

  /* Normalize options */

  type = configHtmlVars.options.button.type[type]
  size = configHtmlVars.options.button.size[size]
  justify = configHtmlVars.options.justify[justify]
  paddingTop = configHtmlVars.options.padding[paddingTop]
  paddingBottom = configHtmlVars.options.padding[paddingBottom]

  /* Classes */

  let linkClasses = 'o-button b-radius-l l-overflow-hidden l-relative l-z-index-1 l-before l-inline-flex l-justify-center'

  if (type === 'main') {
    linkClasses += ` o-button-main ${theme === 'default' ? 'bg-primary-base t-background-base' : 'bg-background-base t-foreground-dark'}`
  }

  if (type === 'secondary') {
    linkClasses += ` o-button-secondary b-all b-current ${theme === 'default' ? 't-primary-base' : 't-background-base'}`
  }

  if (size === 'large') {
    linkClasses += ' o-button-large'
  }

  if (!external) {
    linkClasses += ' js-pt-link'
  }

  /* Attributes */

  const linkAttrs = ` data-theme="${theme}" data-button`

  /* Add styles */

  addScriptStyle({
    dir: 'objects/Button',
    style: 'Button',
    priority: 4
  })

  /* Output */

  let output = `<a class="${linkClasses}" href="${link}"${linkAttrs}>${title}</a>`

  if (justify !== '' || paddingTop !== '' || paddingBottom !== '') {
    const classes: string[] = []

    if (paddingTop !== '') {
      classes.push(`l-pt-${paddingTop}`)
    }

    if (paddingBottom !== '') {
      classes.push(`l-pt-${paddingBottom}`)
    }

    if (justify !== '') {
      classes.push(`l-flex l-justify-${justify}`)
    }

    output = `<div class="${classes.join(' ')}">${output}</div>`
  }

  return output
}

/* Exports */

export { ButtonHtml }
