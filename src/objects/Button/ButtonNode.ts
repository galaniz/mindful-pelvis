/**
 * Objects - Button Node
 */

/* Imports */

import type { ButtonProps } from './ButtonNodeTypes'
import {
  getLink,
  addScriptStyle,
  isObjectStrict,
  isStringStrict
} from '@alanizcreative/static-site-formation/iop/utils/utils'
import { configNodeVars } from '../../config/configNode'

/**
 * Function - output link button
 *
 * @param {ButtonProps} props
 * @return {string} HTML - a || div
 */
const ButtonNode = (props: ButtonProps): string => {
  /* Props and args must be object */

  if (!isObjectStrict(props)) {
    return ''
  }

  const { args, pageData } = props

  if (!isObjectStrict(args)) {
    return ''
  }

  /* Args */

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
    color = 'Default'
  } = args

  if (isStringStrict(pageData?.theme)) {
    color = pageData?.theme
  }

  /* Link and title required */

  link = link === '' ? getLink(internalLink, externalLink) : link

  if (link === '' || title === '') {
    return ''
  }

  /* Check if external */

  const external = externalLink !== ''

  /* Normalize options */

  type = configNodeVars.options.buttonType[type]
  size = configNodeVars.options.buttonSize[size]
  justify = configNodeVars.options.justify[justify]
  paddingTop = configNodeVars.options.padding[paddingTop]
  paddingBottom = configNodeVars.options.padding[paddingBottom]
  color = configNodeVars.options.buttonColor[color]

  /* Theme */

  const theme = color === undefined ? 'primary' : color

  /* Classes */

  let linkClasses = 'o-button b-radius-l l-overflow-hidden l-relative l-z-index-1 l-before l-inline-flex l-justify-center'

  if (type === 'main') {
    linkClasses += ` o-button-main ${theme === 'light' ? 't-foreground-base' : 't-background-base'}`

    if (theme === 'primary') {
      linkClasses += ' bg-primary-base'
    }

    if (theme === 'secondary') {
      linkClasses += ' bg-secondary-base'
    }

    if (theme === 'tertiary') {
      linkClasses += ' bg-foreground-light'
    }

    if (theme === 'dark') {
      linkClasses += ' bg-foreground-base'
    }

    if (theme === 'light') {
      linkClasses += ' bg-background-base'
    }
  }

  if (type === 'secondary') {
    linkClasses += ' o-button-secondary b-all b-current e-trans'

    if (theme === 'primary') {
      linkClasses += ' t-primary-base'
    }

    if (theme === 'secondary') {
      linkClasses += ' t-secondary-base'
    }

    if (theme === 'tertiary') {
      linkClasses += ' t-foreground-light'
    }

    if (theme === 'dark') {
      linkClasses += ' t-foreground-base'
    }

    if (theme === 'light') {
      linkClasses += ' t-background-base'
    }
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

export { ButtonNode }
