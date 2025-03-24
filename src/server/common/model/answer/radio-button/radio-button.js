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
 * @param {RawApplicationState | undefined} context
 * @param {RadioButtonConfig | RadioButtonConfigFactory} config
 * @returns {RadioButtonConfig}
 */
const handleConfig = (context, config) => {
  if (typeof config === 'function') {
    return config(
      context ?? /** @type {RawApplicationState} */ ({ application: {} })
    )
  } else {
    return config
  }
}

/**
 * @typedef {{ label: string, hint?: string }} RadioOption
 * @typedef {'inline' | 'stacked'} RadioButtonLayout
 * export @typedef {{
 *  payloadKey: string,
 *  hint?: string,
 *  options: Record<string, RadioOption>,
 *  errors: {
 *    emptyOptionText: string
 *  }
 * layout?: RadioButtonLayout
 * }} RadioButtonConfig
 */

/**
 * @typedef {(app: RawApplicationState) => RadioButtonConfig} RadioButtonConfigFactory
 */

/**
 * @template Payload
 * @augments AnswerModel<Payload>
 */
export class RadioButtonAnswer extends AnswerModel {
  // eslint-disable-next-line jsdoc/require-returns-check
  /** @returns {RadioButtonConfig} */
  get config() {
    return handleConfig(
      this._context,
      /** @type {any} */ (this.constructor).config
    )
  }

  // eslint-disable-next-line jsdoc/require-returns-check
  /** @returns {RadioButtonConfig | RadioButtonConfigFactory} */
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
      state !== undefined
        ? { [handleConfig(context, this.config).payloadKey]: state }
        : undefined,
      context
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
  viewModel({ validate, question }) {
    const { options, payloadKey, layout, hint } = this.config
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

    if (hint) {
      model.hint = { text: hint }
    }

    if (validate) {
      model.errorMessage = this.validate().errors[payloadKey]
    }
    return model
  }
}
