import Joi from 'joi'
import { AnswerModel } from '../answer-model.js'
import { validateAnswerAgainstSchema } from '../validation.js'
import { NotImplementedError } from '../../../helpers/not-implemented-error.js'

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
