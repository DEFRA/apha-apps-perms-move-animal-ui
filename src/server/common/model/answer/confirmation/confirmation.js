import { CheckboxAnswer } from '../checkbox/checkbox.js'
/** @import {CheckboxConfig, CheckboxData} from '../checkbox/checkbox.js' */
const checkboxEmptyError = 'You need to tick a declaration box'

/** @typedef {{ confirmation: CheckboxData }} ConfirmationPayload */

/** @type {CheckboxConfig} */
const config = {
  payloadKey: 'confirmation',
  isPageHeading: false,
  options: {
    confirm: {
      exclusive: true,
      label:
        'I confirm all the information given about my farm or premises is correct to the best of my knowledge'
    },
    divider: {
      label: 'or'
    },
    other: {
      exclusive: true,
      label:
        'I am submitting this form on behalf of someone else and confirm all the information given is correct to the best of my knowledge'
    }
  },
  validation: {
    empty: { message: checkboxEmptyError }
  }
}

export class ConfirmationAnswer extends CheckboxAnswer {
  static config = config
}
