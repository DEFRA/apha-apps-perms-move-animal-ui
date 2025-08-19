import Joi from 'joi'
import { AnswerModel } from '../answer-model.js'
import { validateAnswerAgainstSchema } from '../validation.js'
import { NotImplementedError } from '../../../helpers/not-implemented-error.js'
import { escapeHtml } from '../../../helpers/escape-text.js'

/** @import { AnswerViewModelOptions } from '../answer-model.js' */

/**
 * @typedef {{
 *  explanation?: string,
 *  validation: {
 *    firstName: {
 *      empty?: { message: string },
 *    },
 *    lastName: {
 *      empty?: { message: string },
 *    }
 *  }
 * }} FullNameConfig
 */

const maxLength = 50

/**
 * @param {FullNameConfig} config
 * @returns {Joi.Schema}
 */
const fullNamePayloadSchema = ({ validation }) => {
  return Joi.object({
    firstName: Joi.string()
      .trim()
      .required()
      .max(maxLength)
      .messages({
        'any.required': validation.firstName.empty?.message ?? '',
        'string.empty': validation.firstName.empty?.message ?? '',
        'string.max': `First name must be no longer than ${maxLength} characters`
      }),
    lastName: Joi.string()
      .trim()
      .required()
      .max(maxLength)
      .messages({
        'any.required': validation.lastName.empty?.message ?? '',
        'string.empty': validation.lastName.empty?.message ?? '',
        'string.max': `Last name must be no longer than ${maxLength} characters`
      })
  })
}

/**
 * export @typedef {{ firstName: string; lastName: string;}} FullNameData
 *  @typedef {FullNameData} FullNamePayload
 */

/**
 * @augments AnswerModel<FullNamePayload>
 */
export class FullNameAnswer extends AnswerModel {
  get type() {
    const type = 'name'
    return type
  }

  // eslint-disable-next-line jsdoc/require-returns-check
  /** @returns {FullNameConfig} */
  get config() {
    return /** @type {any} */ (this.constructor).config
  }

  // eslint-disable-next-line jsdoc/require-returns-check
  /** @returns {FullNameConfig} */
  static get config() {
    throw new NotImplementedError()
  }

  get value() {
    if (!this._data?.firstName && !this._data?.lastName) {
      return undefined
    }

    return {
      firstName: this._data?.firstName,
      lastName: this._data?.lastName
    }
  }

  get html() {
    return escapeHtml(
      `${this._data?.firstName ?? ''} ${this._data?.lastName ?? ''}`
    )
  }

  get template() {
    return 'model/answer/full-name/full-name.njk'
  }

  /**
   * @returns { FullNameData }
   */
  toState() {
    return {
      firstName: this._data?.firstName.trim() ?? '',
      lastName: this._data?.lastName.trim() ?? ''
    }
  }

  validate() {
    return validateAnswerAgainstSchema(
      fullNamePayloadSchema(this.config),
      this._data ?? {}
    )
  }

  /**
   * @param {AnswerViewModelOptions} options
   */
  async viewModel({ validate, question }) {
    const viewModel = { value: this.value, question }

    if (this.config.explanation) {
      viewModel.explanation = this.config.explanation
    }

    if (validate) {
      viewModel.errors = this.validate().errors
    }

    return Promise.resolve(viewModel)
  }

  _extractFields({ firstName, lastName }) {
    return { firstName, lastName }
  }

  /**
   * @param { FullNameData | undefined} state
   * @returns { FullNameAnswer}
   */
  static fromState(state) {
    return new this(
      state !== undefined
        ? { firstName: state.firstName, lastName: state.lastName }
        : undefined
    )
  }
}
