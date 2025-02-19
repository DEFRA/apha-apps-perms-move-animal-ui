import Joi from 'joi'
import { AnswerModel } from '../answer-model.js'
import { validateAnswerAgainstSchema } from '../validation.js'
import { NotImplementedError } from '../../../helpers/not-implemented-error.js'

/** @import {AnswerViewModelOptions} from '../answer-model.js' */
/** @import {RawApplicationState} from '~/src/server/common/model/state/state-manager.js' */

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
 * @param {RadioButtonConfig} config
 * @param {RawApplicationState | undefined} context
 * @returns {RadioButtonConfig}
 */
const filterOptions = (config, context) => ({
  ...config,
  options: Object.fromEntries(
    Object.entries(config.options).filter(
      (kv) => kv[1]?.predicate?.(context ?? {}) ?? true
    )
  )
})

/**
 * @typedef {{ label: string, hint?: string, predicate?: (app: RawApplicationState) => boolean }} RadioOption
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

  // eslint-disable-next-line @typescript-eslint/class-literal-property-style
  get template() {
    return 'model/answer/radio-button/radio-button.njk'
  }

  /**
   * @param {string | undefined} state
   * @param {RawApplicationState} [context]
   * @returns {RadioButtonAnswer}
   */
  static fromState(state, context) {
    return new this(
      state !== undefined ? { [this.config.payloadKey]: state } : undefined,
      context
    )
  }

  validate() {
    return validateAnswerAgainstSchema(
      createRadioSchema(filterOptions(this.config, this._context)),
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
  viewModel({ validate, question }) {
    const { options, payloadKey, layout } = filterOptions(
      this.config,
      this._context
    )
    const items = Object.entries(options).map(([key, value]) => ({
      id: key,
      value: key,
      text: value.label,
      hint: {
        text: value.hint
      }
    }))
    items[0].id = payloadKey

    const model = {
      fieldset: {
        legend: {
          text: question,
          isPageHeading: true,
          classes: 'govuk-fieldset__legend--l'
        }
      },
      name: payloadKey,
      id: payloadKey,
      value: this.value,
      items,
      classes: layout === 'inline' ? 'govuk-radios--inline' : ''
    }

    if (validate) {
      model.errorMessage = this.validate().errors[payloadKey]
    }
    return model
  }
}
