/**
 * Objects - Form Browser
 */

/* Imports */

import type { FormMessages } from '@alanizcreative/static-site-formation/iop/objects/Form/FormTypes'
import { isStringStrict, setItems } from '@alanizcreative/formation/lib/utils/utils'
import { SendForm } from '@alanizcreative/formation/lib/objects/SendForm/SendForm'
import { configBrowserVars } from '../../config/configBrowser'

/**
 * @typedef {import('@alanizcreative/static-site-formation/iop/objects/Form/FormTypes').FormMessages} Messages
 */

/**
 * Function - get success and error messages for form
 *
 * @private
 * @param {string} id
 * @param {Object.<string, Messages>} [forms]
 * @return {Messages}
 */
const _getMessages = (id: string, forms?: Record<string, FormMessages>): FormMessages => {
  const messages = {
    errorMessage: {
      primary: 'Sorry, there is a problem with the service.',
      secondary: 'Try again later.'
    },
    successMessage: {
      primary: 'Success!',
      secondary: ''
    }
  }

  if (forms === undefined) {
    return messages
  }

  const customMessages = forms[id]

  if (customMessages === undefined) {
    return messages
  }

  const {
    errorMessage,
    successMessage
  } = customMessages

  if (successMessage !== undefined) {
    messages.successMessage = successMessage
  }

  if (errorMessage !== undefined) {
    messages.successMessage = errorMessage
  }

  return messages
}

/**
 * Function - initialize form browser
 *
 * @return {void}
 */
const FormBrowser = (): void => {
  /* Url required */

  let url = ''

  if (isStringStrict(configBrowserVars.data.sendUrl)) {
    url = configBrowserVars.data.sendUrl
  } else {
    return
  }

  /* Get DOM elements */

  const f = setItems([
    {
      context: '.js-form',
      inputs: [
        '.js-input'
      ],
      submit: '.js-submit',
      loaders: [
        '.o-loader'
      ],
      errorSummary: {
        context: '.js-error-summary',
        list: 'ul'
      },
      errorResult: {
        context: '.js-error-result',
        primary: 'h2',
        secondary: 'p'
      },
      successResult: {
        context: '.js-success-result',
        primary: 'h2',
        secondary: 'p'
      }
    }
  ])

  /* Form meta */

  const forms = configBrowserVars.data.forms

  /* Instantiate */

  if (f.length > 0) {
    f.forEach(form => {
      const {
        context,
        inputs,
        submit,
        loaders,
        errorSummary,
        errorResult,
        successResult
      } = form

      /* Id required */

      const id = context !== null ? context.id : ''

      if (!isStringStrict(id)) {
        return
      }

      /* Messages */

      const messages = _getMessages(id, forms)

      /* Instance */

      return new SendForm({
        id,
        form: context,
        url,
        inputs,
        submit,
        loaders,
        encode: 'json',
        groupClass: 'js-group',
        fieldClass: 'js-field',
        labelClass: 'js-label',
        data: {
          action: 'sendForm'
        },
        errorTemplate: `
          <span class="l-flex l-gap-5xs l-relative" id="%id" data-error-text>
            <svg width="20" height="20" aria-hidden="true" focusable="false" role="img" class="l-wd-2xs l-ht-2xs">
              <use xlink:href="#info-icon"></use>
            </svg>
            <span class="a-hide-vis">Error </span>
            <span class="t-s t-ht-snug" id="%id-text">%message</span>
          </span>
        `,
        result: {
          error: {
            summary: {
              container: errorSummary.context,
              list: errorSummary.list
            },
            container: errorResult.context,
            primary: errorResult.primary,
            secondary: errorResult.secondary,
            message: messages.errorMessage
          },
          success: {
            container: successResult.context,
            primary: successResult.primary,
            secondary: successResult.secondary,
            message: messages.successMessage
          }
        }
      })
    })
  }
}

FormBrowser()
