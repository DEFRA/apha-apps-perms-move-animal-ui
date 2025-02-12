import Joi from 'joi'
import { AnswerModel } from '../answer-model.js'
import { validateAnswerAgainstSchema } from '../validation.js'
import { NotImplementedError } from '../../../helpers/not-implemented-error.js'

/** @import {AnswerViewModelOptions} from '../answer-model.js' */

/**
 * @param {TextAreaConfig} config
 * @returns {Joi.Schema}
 */
const textAreaSchema = ({ payloadKey, validation }) => {
  let stringValidation = Joi.string()
    .trim()
    .required()
    .max(validation.maxLength.value)

  const messages = {
    'any.required': validation.empty.message,
    'string.empty': validation.empty.message,
    'string.max': validation.maxLength.message
  }

  if (validation.pattern) {
    stringValidation = stringValidation.pattern(validation.pattern.regex)
    messages['string.pattern.base'] = validation.pattern.message
  }

  return Joi.object({
    [payloadKey]: stringValidation.messages(messages)
  })
}

/**
 * export @typedef {{
 *  payloadKey: string,
 *  spellcheck?: false,
 *  rows?: number,
 *  autocomplete?: string,
 *  hint?: string,
 *  validation: {
 *    maxLength: { value: number, message: string },
 *    empty: { message: string },
 *    pattern?: { regex: RegExp, message: string }
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

  get html() {
    return this._data?.[this.config.payloadKey]?.replace(/\n/g, '<br />') ?? ''
  }

  // eslint-disable-next-line @typescript-eslint/class-literal-property-style
  get template() {
    return 'model/answer/text-area/text-area.njk'
  }

  /**
   * @returns {TextAreaData}
   */
  toState() {
    return this.value?.trim() ?? ''
  }

  validate() {
    return validateAnswerAgainstSchema(
      textAreaSchema(this.config),
      this._data ?? {}
    )
  }

  /**
   * @param {AnswerViewModelOptions} options
   */
  viewModel({ validate, question }) {
    const { payloadKey, spellcheck, autocomplete, rows, hint } = this.config
    const viewModel = {
      label: {
        text: question,
        classes: 'govuk-label--l',
        isPageHeading: true
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
      viewModel.hint = { text: hint }
    }

    if (spellcheck === false) {
      viewModel.spellcheck = false
    }

    if (validate) {
      viewModel.errorMessage = this.validate().errors[payloadKey]
    }

    return viewModel
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
