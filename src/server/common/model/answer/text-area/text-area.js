import Joi from 'joi'
import { AnswerModel } from '../answer-model.js'
import {
  resolveValidationMessage,
  validateAnswerAgainstSchema
} from '../validation.js'
import { NotImplementedError } from '../../../helpers/not-implemented-error.js'

/** @import {AnswerViewModelOptions} from '../answer-model.js' */
/** @import {ValidationMessage} from '../validation.js' */

/**
 * @param {TextAreaConfig} config
 * @param {AnswerViewModelOptions['translate']} [translate]
 * @returns {Joi.Schema}
 */
const textAreaSchema = ({ payloadKey, validation }, translate) => {
  let stringValidation = Joi.string()
    .required()
    .trim()
    .max(validation.maxLength.value)

  const messages = {
    'string.max': resolveValidationMessage(validation.maxLength, translate),
    'any.required': '',
    'string.empty': ''
  }

  if (validation.empty) {
    const emptyMessage = resolveValidationMessage(validation.empty, translate)
    messages['any.required'] = emptyMessage
    messages['string.empty'] = emptyMessage
  } else {
    stringValidation = stringValidation.allow('')
  }

  if (validation.pattern) {
    stringValidation = stringValidation.pattern(validation.pattern.regex)
    messages['string.pattern.base'] = resolveValidationMessage(
      validation.pattern,
      translate
    )
  }

  return Joi.object({
    [payloadKey]: stringValidation.messages(messages)
  })
}

/**
 * export @typedef {{
 *  payloadKey: string,
 *  spellcheck?: boolean,
 *  rows?: number,
 *  autocomplete?: string,
 *  hint?: string,
 *  hintI18nKey?: string,
 *  isPageHeading?: boolean,
 *  validation: {
 *    maxLength: ValidationMessage & { value: number },
 *    empty?:ValidationMessage,
 *    pattern?: ValidationMessage & { regex: RegExp }
 *  }
 * }} TextAreaConfig
 */

/**
 * @typedef {string} TextAreaData
 */

/**
 * @template Payload
 * @augments {AnswerModel<Payload>}
 */
export class TextAreaAnswer extends AnswerModel {
  // eslint-disable-next-line jsdoc/require-returns-check
  /** @returns {TextAreaConfig} */
  get config() {
    return /** @type {any} */ (this.constructor).config
  }

  // eslint-disable-next-line jsdoc/require-returns-check
  /** @returns {TextAreaConfig} */
  static get config() {
    throw new NotImplementedError()
  }

  /**
   * @returns {string | undefined}
   */
  get value() {
    return this._data?.[this.config.payloadKey]
  }

  get displayText() {
    return this.value ?? ''
  }

  get template() {
    return 'model/answer/text-area/text-area.njk'
  }

  /**
   * @returns {TextAreaData}
   */
  toState() {
    return this.value?.trim() ?? ''
  }

  /**
   *
   * @param {AnswerViewModelOptions['translate']} [translate]
   */
  validate(translate) {
    return validateAnswerAgainstSchema(
      textAreaSchema(this.config, translate),
      this._data ?? {}
    )
  }

  /**
   * @param {AnswerViewModelOptions} options
   */
  async viewModel({ validate, question, translate }) {
    const { payloadKey, spellcheck, autocomplete, rows, hint, hintI18nKey } =
      this.config
    const isPageHeading = this.config.isPageHeading ?? true

    const viewModel = {
      label: {
        text: question,
        classes: isPageHeading ? 'govuk-label--l' : 'govuk-label--m',
        isPageHeading
      },
      id: payloadKey,
      name: payloadKey,
      value: this.value
    }

    if (rows) {
      viewModel.rows = rows
    }

    if (autocomplete) {
      viewModel.autocomplete = autocomplete
    }

    if (hint) {
      viewModel.hint = {
        text: translate(hintI18nKey, hint)
      }
    }

    if (spellcheck === false) {
      viewModel.spellcheck = false
    }

    if (validate) {
      viewModel.errorMessage = this.validate(translate).errors[payloadKey]
    }

    return Promise.resolve(viewModel)
  }

  /**
   * @param {Payload} fields
   */
  _extractFields(fields) {
    return /** @type {Payload} */ ({
      [this.config.payloadKey]: fields[this.config.payloadKey]
    })
  }

  /**
   * @param {TextAreaData | undefined} state
   * @returns {TextAreaAnswer}
   */
  static fromState(state) {
    return new this(
      state !== undefined ? { [this.config.payloadKey]: state } : {}
    )
  }
}
