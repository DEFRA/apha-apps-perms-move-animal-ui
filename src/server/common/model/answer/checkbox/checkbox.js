import Joi from 'joi'

import { NotImplementedError } from '../../../helpers/not-implemented-error.js'
import { AnswerModel } from '../answer-model.js'
import { validateAnswerAgainstSchema } from '../validation.js'

/**
 * @param {CheckboxConfig} config
 * @returns {Joi.Schema}
 */
const createCheckboxSchema = (config) => {
  const optionSchema = Joi.string().valid(...Object.keys(config.options))

  let optionsSchema = Joi.array().items(optionSchema)

  if (config.validation.empty) {
    const emptyOptionText = config.validation.empty.message
    optionsSchema = optionsSchema.min(1).messages({
      'array.min': emptyOptionText
    })
  }

  return Joi.object({ [config.payloadKey]: optionsSchema })
}

/**
 * @template T
 * @param {T[] | T} value
 * @returns T[]
 */
const ensureArray = (value) => (Array.isArray(value) ? value : [value])

/**
 * @typedef {{ label: string }} CheckboxOption
 * @typedef {{
 *   payloadKey: string,
 *   options: Record<string, CheckboxOption>,
 *   validation: {
 *     empty?: { message: string }
 *   }
 * }} CheckboxConfig
 */

/**
 * @typedef {string[]} CheckboxData
 */

/**
 * @template Payload
 * @augments AnswerModel<Payload>
 */
export class CheckboxAnswer extends AnswerModel {
  // eslint-disable-next-line jsdoc/require-returns-check
  /** @returns {CheckboxConfig} */
  get config() {
    return /** @type {any} */ (this.constructor).config
  }

  // eslint-disable-next-line jsdoc/require-returns-check
  /** @returns {CheckboxConfig} */
  static get config() {
    throw new NotImplementedError()
  }

  get value() {
    return this._data !== undefined
      ? ensureArray(this._data?.[this.config.payloadKey])
      : undefined
  }

  // get value() {
  //   const data = Array.isArray(this._data?.confirmation)
  //     ? this._data.confirmation
  //     : [this._data?.confirmation]
  //
  //   const value = {
  //     confirm: data.includes('confirm'),
  //     other: data.includes('other')
  //   }
  //
  //   return value
  // }
  //
  // get html() {
  //   const html = 'confirmation html'
  //   return html
  // }
  //
  // eslint-disable-next-line @typescript-eslint/class-literal-property-style
  get template() {
    return 'model/answer/checkbox/checkbox.njk'
  }

  /**
   * @returns {CheckboxData | undefined}
   */
  toState() {
    return ensureArray(this._data?.[this.config.payloadKey] ?? [])
  }

  validate() {
    return validateAnswerAgainstSchema(createCheckboxSchema(this.config), {
      [this.config.payloadKey]: ensureArray(
        this._data?.[this.config.payloadKey] ?? []
      )
    })
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
   * @param {string[] | undefined} state
   * @returns {CheckboxAnswer}
   */
  static fromState(state) {
    return new this(
      state !== undefined ? { [this.config.payloadKey]: state } : undefined
    )
  }
}
