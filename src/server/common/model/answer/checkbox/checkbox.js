import Joi from 'joi'

import { NotImplementedError } from '../../../helpers/not-implemented-error.js'
import { AnswerModel } from '../answer-model.js'
import { validateAnswerAgainstSchema } from '../validation.js'

/** @import {AnswerViewModelOptions} from '../answer-model.js' */

/**
 * @param {CheckboxConfig} config
 * @returns {Joi.Schema}
 */
const createCheckboxSchema = (config) => {
  const optionSchema = Joi.string().valid(...Object.keys(config.options))

  let optionsSchema = Joi.array().required().items(optionSchema)

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
 * @param {T[] | T | undefined} value
 * @returns T[]
 */
const ensureArray = (value) => {
  value = value ?? []
  return Array.isArray(value) ? value : [value]
}

/**
 * @typedef {{ label: string }} CheckboxOption
 * @typedef {{
 *   payloadKey: string,
 *   options: Record<string, CheckboxOption>,
 *   hint?: string,
 *   isPageHeading? : boolean,
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

  /** @type {String} */
  get type() {
    const type = 'checkbox'
    return type
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

  // eslint-disable-next-line @typescript-eslint/class-literal-property-style
  get template() {
    return 'model/answer/checkbox/checkbox.njk'
  }

  get html() {
    const data = ensureArray(this._data?.[this.config.payloadKey])

    if (data.length === 0) {
      return 'None'
    }
    return Object.values(data)
      .map((item) => {
        return this.config.options[item].label
      })
      .join('<br /><br />')
  }

  /**
   * @param {AnswerViewModelOptions} options
   */
  viewModel({ question, validate }) {
    const values = this.value
    const { payloadKey, options, hint } = this.config

    const isPageHeading = this.config.isPageHeading ?? true

    const viewModel = {
      name: payloadKey,
      id: payloadKey,
      fieldset: {
        legend: {
          text: question,
          classes: isPageHeading ? 'govuk-fieldset__legend--l' : '',
          isPageHeading
        }
      },
      items: Object.entries(options).map(([value, option]) => ({
        text: option.label,
        value,
        attributes: {
          'data-testid': `${value}-checkbox`
        },
        checked: (values ?? []).includes(value)
      }))
    }

    if (hint) {
      viewModel.hint = { text: hint }
    }

    if (validate) {
      viewModel.errorMessage = this.validate().errors[this.config.payloadKey]
    }

    return viewModel
  }

  /**
   * @returns {CheckboxData | undefined}
   */
  toState() {
    return ensureArray(this._data?.[this.config.payloadKey])
  }

  validate() {
    const data = this._data?.[this.config.payloadKey]
    return validateAnswerAgainstSchema(createCheckboxSchema(this.config), {
      [this.config.payloadKey]: ensureArray(data)
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
