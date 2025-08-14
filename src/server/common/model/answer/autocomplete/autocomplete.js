import Joi from 'joi'
import { AnswerModel } from '../answer-model.js'
import { validateAnswerAgainstSchema } from '../validation.js'
import { NotImplementedError } from '../../../helpers/not-implemented-error.js'
import { escapeHtml } from '../../../helpers/escape-text.js'

/** @import {AnswerViewModelOptions} from '../answer-model.js' */

/**
 * @param {AutocompleteConfig} config
 * @returns {Joi.Schema}
 */
const textSchema = ({ payloadKey, validation }) => {
  const stringValidation = Joi.string().trim().required()

  const messages = {
    'any.required': validation.empty?.message ?? '',
    'string.empty': validation.empty?.message ?? ''
  }

  return Joi.object({
    [payloadKey]: stringValidation.messages(messages)
  })
}


/**
 * export @typedef {{ value: string, text: string }[]} ItemsConfig
 * export @typedef {{
 *  payloadKey: string,
 *  characterWidth?: 2 | 4 | 10 | 20,
 *  isPageHeading? : boolean,
 *  hint?: string,
 *  validation: {
 *    empty?: { message: string },
 *  }
 *  items: () => Promise<ItemsConfig>
 * }} AutocompleteConfig
 */

/**
 * @typedef {string} TextData
 */

/**
 * @template Payload
 * @augments {AnswerModel<Payload>}
 */
export class AutocompleteAnswer extends AnswerModel {
  // eslint-disable-next-line jsdoc/require-returns-check
  /** @returns {AutocompleteConfig} */
  get config() {
    return /** @type {any} */ (this.constructor).config
  }

  // eslint-disable-next-line jsdoc/require-returns-check
  /** @returns {AutocompleteConfig} */
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
    return escapeHtml(this._data?.[this.config.payloadKey] ?? '')
  }

  get template() {
    return 'model/answer/autocomplete/autocomplete.njk'
  }

  /**
   * @returns {TextData}
   */
  toState() {
    const v = this.value?.trim() ?? ''

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
  async viewModel({ validate, question }) {
    const { payloadKey, characterWidth, hint } = this.config

    const isPageHeading = this.config.isPageHeading ?? true

    const viewModel = {
      label: {
        text: question,
        classes: isPageHeading ? 'govuk-label--l' : 'govuk-label--m',
        isPageHeading
      },
      classes: 'autocomplete',
      id: payloadKey,
      name: payloadKey,
      value: this.value,
      items: await this.config.items()
    }

    if (characterWidth) {
      viewModel.classes = `govuk-input--width-${characterWidth}`
    }

    if (hint) {
      viewModel.hint = { text: hint }
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
   * @returns {AutocompleteAnswer}
   */
  static fromState(state) {
    return new this(
      state !== undefined ? { [this.config.payloadKey]: state } : {}
    )
  }
}
