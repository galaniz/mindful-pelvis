/**
 * Objects - Collapsible Html
 */

/* Imports */

import type { Collapsible } from './CollapsibleHtmlTypes'
import { v4 as uuid } from 'uuid'
import { addScriptStyle, isStringStrict } from '@alanizcreative/static-site-formation/lib/utils/utilsMin'
import { CaretSvgHtml } from '../../svg/Caret/CaretHtml'

/**
 * Function - output collapsible section
 *
 * @type {Collapsible}
 */
const CollapsibleHtml: Collapsible = async (args) => {
  const {
    attributes,
    content
  } = args // Skip check as shortcode always passes object

  /* Atributes */

  const {
    tag = 'div',
    attr = '',
    classes = '',
    label = '',
    labelClasses = 'l-my-2xs',
    headingLevel = 'h3',
    headingClasses = 't-xl t-weight-bold',
    iconClasses = 'l-ht-xs l-wd-xs',
    expanded = false
  } = attributes

  /* Label and content required */

  if (!isStringStrict(label) || !isStringStrict(content)) {
    return ''
  }

  /* Add styles */

  addScriptStyle({
    dir: 'objects/Collapsible',
    style: 'Collapsible',
    script: 'CollapsibleInit'
  })

  /* Id */

  const id = uuid()

  /* State */

  const open = expanded.toString()

  /* Container attributes */

  let attrs = `class="o-collapsible b-bottom${classes !== '' ? ` ${classes}` : ''}" data-collapsible-expanded="${open}"`

  if (attr !== '') {
    attrs += ` ${attr}`
  }

  /* Button attributes */

  let buttonClasses = 'o-collapsible__toggle l-wd-100-pc l-flex l-justify-between l-align-center'

  if (labelClasses !== '') {
    buttonClasses += ` ${labelClasses}`
  }

  const buttonAttrs = `class="${buttonClasses}" type="button" aria-controls="${id}" aria-expanded="${open}"`

  /* Output */

  return `
    <${tag} ${attrs}>
      <${headingLevel} class="l-m-0${headingClasses !== '' ? ` ${headingClasses}` : ''}">
        <button ${buttonAttrs}>
          <span class="l-flex l-pr-2xs">${label}</span>
          <span class="l-flex-shrink-0 l-flex l-justify-center l-align-center b-all b-radius-100-pc b-muted${iconClasses !== '' ? ` ${iconClasses}` : ''}">
            ${CaretSvgHtml('down', 'l-flex l-wd-3xs l-ht-3xs e-transition')}
          </span>
        </button>
      </${headingLevel}>
      <div id="${id}" class="o-collapsible__main outline-snug e-transition no-js-collapsible" data-collapsible-main>
        ${content}
      </div>
    </${tag}>
  `
}

/* Exports */

export { CollapsibleHtml }
