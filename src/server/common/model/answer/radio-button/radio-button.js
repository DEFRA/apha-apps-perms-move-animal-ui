import Joi from 'joi'
import { AnswerModel } from '../answer-model.js'
import { validateAnswerAgainstSchema } from '../validation.js'
import { NotImplementedError } from '../../../helpers/not-implemented-error.js'

/**
 * @param {RadioButtonConfig} config
 * @returns {Joi.Schema}
 */
const createRadioSchema = (config) => {
  const { emptyOptionText } = config.errors
  return Joi.object({
    [config.payloadKey]: Joi.string()
      .required()
      .valid(...Object.keys(config.options))
      .messages({
        'any.required': emptyOptionText,
        'any.valid': emptyOptionText,
        'string.empty': emptyOptionText,
        'any.only': emptyOptionText
      })
  })
}

/**
 * export @typedef {'on' | 'off'} OnOffFarmData
 * @typedef {{ onOffFarm: 'on' | 'off' }} OnOffFarmPayload
 */

/**
 * @typedef {{ label: string, hint?: string }} RadioOption
 * export @typedef {{
 *  payloadKey: string,
 *  options: Record<string, RadioOption>,
 *  errors: {
 *    emptyOptionText: string
 *  }
 * }} RadioButtonConfig
 */

/**
 * @template Payload
 * @augments AnswerModel<Payload>
 */
export class RadioButtonAnswer extends AnswerModel {
  /** @returns {RadioButtonConfig} */
  get config() {
    throw new NotImplementedError()
  }

  /** @returns {RadioButtonConfig} */
  static get config() {
    throw new NotImplementedError()
  }

  /**
   * @returns {OnOffFarmData | undefined}
   */
  toState() {
    return this._data?.[this.config.payloadKey] ?? ''
  }

  get value() {
    return this._data?.[this.config.payloadKey]
  }

  get html() {
    const originOnOffFarm = this._data?.[this.config.payloadKey]

    return this.config.options[originOnOffFarm]?.label ?? ''
  }

  /**
   * @param {string | undefined} state
   * @returns {RadioButtonAnswer}
   */
  static fromState(state) {
    return new this(
      state !== undefined ? { [this.config.payloadKey]: state } : undefined
    )
  }

  validate() {
    return validateAnswerAgainstSchema(
      createRadioSchema(this.config),
      this._data ?? {}
    )
  }

  /**
   * @param {Payload} fields
   */
  _extractFields(fields) {
    return /** @type Payload */ ({
      [this.config.payloadKey]: fields[this.config.payloadKey]
    })
  }
}
