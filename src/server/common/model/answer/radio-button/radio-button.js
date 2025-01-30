import Joi from 'joi'
import { AnswerModel } from '../answer-model.js'
import { validateAnswerAgainstSchema } from '../validation.js'
import { NotImplementedError } from '../../../helpers/not-implemented-error.js'

/** @import {AnswerViewModelOptions} from '../answer-model.js' */

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
  // eslint-disable-next-line jsdoc/require-returns-check
  /** @returns {RadioButtonConfig} */
  get config() {
    return /** @type {any} */ (this.constructor).config
  }

  // eslint-disable-next-line jsdoc/require-returns-check
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

  /**
   * @param {AnswerViewModelOptions} options
   */
  viewModel({ validate }) {
    const items = Object.entries(this.config.options).map(([key, value]) => ({
      id: key,
      value: key,
      text: value.label,
      hint: {
        text: value.hint
      }
    }))
    items[0].id = this.config.payloadKey

    const model = {
      name: this.config.payloadKey,
      id: this.config.payloadKey,
      fieldset: {},
      value: this.value,
      items,
      classes: this.config.layout === 'inline' ? 'govuk-radios--inline' : ''
    }

    if (validate) {
      model.errorMessage = this.validate().errors[this.config.payloadKey]
    }
    return model
  }
}
