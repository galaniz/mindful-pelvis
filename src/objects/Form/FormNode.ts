/**
 * Objects - Form Node
 */

/* Imports */

import type { FormPropsFilter } from '@alanizcreative/static-site-formation/iop/objects/Form/FormTypes'
import type { FieldPropsFilter } from '@alanizcreative/static-site-formation/iop/objects/Field/FieldTypes'
import {
  isObjectStrict,
  isStringStrict,
  addScriptStyle
} from '@alanizcreative/static-site-formation/iop/utils/utils'
import { configNodeVars } from '../../config/configNode'
import { CheckMarkSvgNode } from '../../svg/CheckMark/CheckMarkNode'
import { CaretSvgNode } from '../../svg/Caret/CaretNode'
import { InfoNode } from '../Info/InfoNode'
import { LoaderNode } from '../Loader/LoaderNode'

/**
 * Function - callback to filter formation form props
 *
 * @type {FormPropsFilter}
 */
const FormNode: FormPropsFilter = async (props) => {
  /* Props */

  const { args } = props // Skip check as filter always passes object

  /* Error summary */

  const errorSummary = `
    <div class="l-col-12 l-none outline-none js-error-summary" tabindex="-1">
      ${InfoNode({
        text: `
          <div>
            <h2 class="t-r t-wt-bold t-current">There is a problem</h2>
            <ul class="l-flex l-col l-mb-5xs-all t-s t-ht-snug t-ls-none t-link-current" role="list"></ul>
          </div>
        `,
        textType: 'custom',
        type: 'error'
      })}
    </div>
  `

  /* Error result */

  const errorResult = `
    <div class="l-col-12 l-none outline-none js-error-result" role="alert" tabindex="-1">
      ${InfoNode({
        text: `
          <div>
            <h2 class="t-r t-wt-bold t-current l-m-0"></h2>
            <p class="t-s t-current"></p>
          </div>
        `,
        textType: 'custom',
        type: 'error'
      })}
    </div>
  `

  /* Success result */

  const successResult = `
    <div class="l-col-12 l-none outline-none js-success-result" role="alert" tabindex="-1">
      ${InfoNode({
        text: `
          <div>
            <h2 class="t-r t-wt-bold t-current l-m-0"></h2>
            <p class="t-s t-current"></p>
          </div>
        `,
        textType: 'custom',
        type: 'success'
      })}
    </div>
  `

  /* Add styles and scripts */

  addScriptStyle({
    dir: 'objects/Form',
    style: 'Form',
    script: 'FormBrowser'
  })

  /* Output */

  args.errorSummary = errorSummary
  args.errorResult = errorResult
  args.successResult = successResult
  args.formClasses = 'o-form js-form'
  args.fieldsClasses = 'l-flex l-wrap l-gap-xs l-align-end'
  args.honeypotClasses = 'js-input'
  args.honeypotFieldClasses = 'l-col-12 js-field'
  args.honeypotLabelClasses = 't-wt-bold l-mb-5xs'
  args.submitFieldClasses = 'l-col-12'
  args.submitLoader = LoaderNode()
  args.submitClasses =
    't-r t-ht-snug t-wt-bold t-background-base bg-foreground-base b-radius-l e-trans l-overflow-hidden l-relative l-inline-flex l-justify-center l-px-xs l-py-2xs js-submit'

  return props
}

/**
 * Function - callback to filter formation field props
 *
 * @type {FieldPropsFilter}
 */
const FormFieldNode: FieldPropsFilter = async (props) => {
  /* Props */

  const { args } = props // Skip check as filter always passes object

  /* Args */

  let {
    type = 'Text',
    width = '1/1'
  } = isObjectStrict(args) ? args : {}

  /* Normalize options */

  type = type.toLowerCase()
  width = configNodeVars.options.dimension[width]

  /* Checkbox or radio check */

  const isCheckboxRadio = type === 'radio' || type === 'checkbox'

  /* Classes and add styles */

  let fieldClasses = 'js-field'
  let labelClasses = 'js-label'
  let classes = 'js-input'

  if (isCheckboxRadio) {
    fieldClasses += ' o-form__options'
    labelClasses += ' o-label__text'
    classes += ' a-hide-input'

    addScriptStyle({
      dir: 'objects/Form',
      style: 'FormOptions'
    })
  } else {
    labelClasses += ' o-label__overlap l-flex l-col l-align-start'
  }

  if (type === 'select') {
    fieldClasses += ' o-form__select l-relative'

    addScriptStyle({
      dir: 'objects/Form',
      style: 'FormSelect'
    })
  }

  /* Output */

  args.type = type
  args.width = isStringStrict(width) ? `l-col-12 l-col-${width}-l` : 'l-col-12'
  args.visuallyHiddenClass = 'a-hide-vis'
  args.classes = classes
  args.labelClasses = labelClasses
  args.fieldClasses = fieldClasses
  args.fieldsetClasses = 'js-group'
  args.checkboxIcon = CheckMarkSvgNode('l-wd-xs l-ht-xs l-m-auto')
  args.selectIcon = CaretSvgNode('down', 'l-wd-2xs l-ht-2xs')

  return props
}

/* Exports */

export { FormNode, FormFieldNode }
