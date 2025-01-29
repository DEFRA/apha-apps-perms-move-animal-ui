import Joi from 'joi'
import { AnswerModel } from '../answer-model.js'
import { validateAnswerAgainstSchema } from '../validation.js'
import { NotImplementedError } from '../../../helpers/not-implemented-error.js'

/**
 * @param {TextConfig} config
 * @returns {Joi.Schema}
 */
const textSchema = ({ payloadKey, validation }) => {
  let stringValidation = Joi.string().required().max(validation.maxLength.value)

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
 * @typedef {{ label: string, hint?: string }} RadioOption
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
 * export @typedef {string} TextData
 * export @typedef {{ emailAddress: string }} EmailAddressAnswer
 * @import {RawPayload} from '../answer-model.js'
 */

/**
 * @template Payload
 * @class TextAnswer<Payload>
 */
export class TextAnswer extends AnswerModel {
  /** @returns {TextConfig} */
  // eslint-disable-next-line jsdoc/require-returns-check
  get config() {
    throw new NotImplementedError()
  }

  /** @returns {TextConfig} */
  // eslint-disable-next-line jsdoc/require-returns-check
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
    let value = this.value?.trim() ?? ''

    if (this.config.stripWhitespace) {
      value = value.replace(/\s+/g, '')
    }
    return value
  }

  validate() {
    return validateAnswerAgainstSchema(textSchema(this.config), this._data)
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

/**
 * @param {TextConfig} config
 * @returns TextAnswer
 */
export const textAnswerFactory = (config) =>
  class extends TextAnswer {
    get config() {
      return config
    }

    static get config() {
      return config
    }
  }
