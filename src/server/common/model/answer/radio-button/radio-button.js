import Joi from 'joi'
import { AnswerModel } from '../answer-model.js'
import { validateAnswerAgainstSchema } from '../validation.js'
import { NotImplementedError } from '../../../helpers/not-implemented-error.js'

/* eslint-disable jsdoc/require-returns-check */

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
 * @typedef {{ label: string, hint?: string }} RadioOption
 * @typedef {'inline' | 'stacked'} RadioButtonLayout
 * export @typedef {{
 *  payloadKey: string,
 *  options: Record<string, RadioOption>,
 *  errors: {
 *    emptyOptionText: string
 *  }
 * layout?: RadioButtonLayout
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
   * @returns {Payload | undefined}
   */
  toState() {
    return this._data?.[this.config.payloadKey] ?? ''
  }

  get value() {
    return this._data?.[this.config.payloadKey]
  }

  get html() {
    const value = this._data?.[this.config.payloadKey]

    return this.config.options[value]?.label ?? ''
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
    return /** @type {Payload} */ ({
      [this.config.payloadKey]: fields[this.config.payloadKey]
    })
  }

  get viewModel() {
    const items = Object.entries(this.config.options).map(([key, value]) => ({
      id: key,
      value: key,
      text: value.label,
      hint: {
        text: value.hint
      }
    }))
    items[0].id = this.config.payloadKey
    return {
      name: this.config.payloadKey,
      id: this.config.payloadKey,
      fieldset: {},
      value: this.value,
      items,
      classes: this.config.layout === 'inline' ? 'govuk-radios--inline' : ''
    }
  }
}
