import Joi from 'joi'
import { AnswerModel } from '../answer-model.js'
import { validateAnswerAgainstSchema } from '../validation.js'
import { NotImplementedError } from '../../../helpers/not-implemented-error.js'

/** @import {AnswerViewModelOptions} from '../answer-model.js' */

/**
 * @param {TextConfig} config
 * @returns {Joi.Schema}
 */
const textSchema = ({ payloadKey, validation, stripWhitespace }) => {
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

  if (stripWhitespace) {
    stringValidation = stringValidation.replace(whitespaceRegex, '')
  }

  return Joi.object({
    [payloadKey]: stringValidation.messages(messages)
  })
}

const whitespaceRegex = /\s+/g

/**
 * export @typedef {{
 *  payloadKey: string,
 *  stripWhitespace?: boolean,
 *  type?: 'email',               // the default is text, so no need to specify
 *  spellcheck?: false,
 *  characterWidth?: 10 | 20,
 *  isPageHeading? : boolean,
 *  autocomplete?: string,
 *  hint?: string,
 *  validation: {
 *    maxLength: { value: number, message: string },
 *    empty: { message: string },
 *    pattern?: { regex: RegExp, message: string }
 *  }
 * }} TextConfig
 */

/**
 * @typedef {string} TextData
 */

/**
 * @template Payload
 * @augments {AnswerModel<Payload>}
 */
export class TextAnswer extends AnswerModel {
  // eslint-disable-next-line jsdoc/require-returns-check
  /** @returns {TextConfig} */
  get config() {
    return /** @type {any} */ (this.constructor).config
  }

  // eslint-disable-next-line jsdoc/require-returns-check
  /** @returns {TextConfig} */
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
    return this._data?.[this.config.payloadKey] ?? ''
  }

  // eslint-disable-next-line @typescript-eslint/class-literal-property-style
  get template() {
    return 'model/answer/text/text.njk'
  }

  /**
   * @returns {TextData}
   */
  toState() {
    let v = this.value?.trim() ?? ''

    if (this.config.stripWhitespace) {
      v = v.replace(whitespaceRegex, '')
    }
    return v
  }

  validate() {
    return validateAnswerAgainstSchema(
      textSchema(this.config),
      this._data ?? {}
    )
  }

  /**
   * @param {AnswerViewModelOptions} options
   */
  viewModel({ validate, question }) {
    const { payloadKey, type, spellcheck, autocomplete, characterWidth, hint } =
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

    if (characterWidth) {
      viewModel.classes = `govuk-input--width-${characterWidth}`
    }

    if (autocomplete) {
      viewModel.autocomplete = autocomplete
    }

    if (type) {
      viewModel.type = type
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
   * @param {TextData | undefined} state
   * @returns {TextAnswer}
   */
  static fromState(state) {
    return new this(
      state !== undefined ? { [this.config.payloadKey]: state } : {}
    )
  }
}
