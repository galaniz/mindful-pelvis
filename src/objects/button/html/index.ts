/**
 * Objects - button html
 */

/* Imports */

import getLink from '@alanizcreative/static-site-formation/lib/utils/get-link'
import addScriptStyle from '@alanizcreative/static-site-formation/lib/utils/add-script-style'
import config from '../../../config/html'

/**
 * Function - output link button
 *
 * @param {object} props
 * @param {object} props.args
 * @param {string} props.args.title
 * @param {string} props.args.link - Back end option
 * @param {object} props.args.internalLink
 * @param {string} props.args.externalLink
 * @param {string} props.args.type
 * @param {string} props.args.size
 * @param {string} props.args.justify
 * @param {string} props.args.paddingTop
 * @param {string} props.args.paddingBottom
 * @param {string} props.args.theme - Back end option
 * @return {string} HTML - a || div
 */

interface ButtonProps {
  args: {
    title?: string
    link?: string
    internalLink?: MP.InternalLink
    externalLink?: string
    type?: string
    size?: string
    justify?: string
    paddingTop?: string
    paddingBottom?: string
    theme?: string
  }
}

const button = (props: ButtonProps = { args: {} }): string => {
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

  type = config.vars.options.button.type[type]
  size = config.vars.options.button.size[size]
  justify = config.vars.options.justify[justify]
  paddingTop = config.vars.options.padding[paddingTop]
  paddingBottom = config.vars.options.padding[paddingBottom]

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
    dir: 'objects/button',
    style: true,
    priority: 4
  })

  /* Output */

  let output = `<a class="${linkClasses}" href="${link}"${linkAttrs}>${title}</a>`

  if (justify !== '' || paddingTop !== '' || paddingBottom !== '') {
    const classes: string[] = []

    if (paddingTop !== '') {
      classes.push(`l-padding-top-${paddingTop}`)
    }

    if (paddingBottom !== '') {
      classes.push(`l-padding-top-${paddingBottom}`)
    }

    if (justify !== '') {
      classes.push(`l-flex l-justify-${justify}`)
    }

    output = `<div class="${classes.join(' ')}">${output}</div>`
  }

  return output
}

/* Exports */

export default button
