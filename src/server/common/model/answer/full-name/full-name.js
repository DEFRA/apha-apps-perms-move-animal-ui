import Joi from 'joi'
import { AnswerModel } from '../answer-model.js'
import {
  resolveValidationMessage,
  validateAnswerAgainstSchema
} from '../validation.js'
import { NotImplementedError } from '../../../helpers/not-implemented-error.js'

/** @import { AnswerViewModelOptions } from '../answer-model.js' */
/** @import {ValidationMessage} from '../validation.js' */

/**
 * @typedef {{
 *  explanation?: string,
 *  explanationI18nKey?: string,
 *  validation: {
 *    firstName: {
 *      empty?: ValidationMessage,
 *    },
 *    lastName: {
 *      empty?: ValidationMessage
 *    }
 *  }
 * }} FullNameConfig
 */

const maxLength = 50

/**
 * @param {FullNameConfig} config
 * @param {AnswerViewModelOptions['translate']} [translate]
 * @returns {Joi.Schema}
 */
const fullNamePayloadSchema = ({ validation }, translate) => {
  const emptyFirstNameMessage = validation.firstName.empty
    ? resolveValidationMessage(validation.firstName.empty, translate)
    : ''
  const emptyLastNameMessage = validation.lastName.empty
    ? resolveValidationMessage(validation.lastName.empty, translate)
    : ''
  return Joi.object({
    firstName: Joi.string()
      .trim()
      .required()
      .max(maxLength)
      .messages({
        'any.required': emptyFirstNameMessage,
        'string.empty': emptyFirstNameMessage,
        'string.max': resolveValidationMessage(
          {
            message: `First name must be no longer than ${maxLength} characters`,
            i18nKey: 'common.answer.fullName.validation.firstName.maxLength'
          },
          translate,
          { value: maxLength }
        )
      }),
    lastName: Joi.string()
      .trim()
      .required()
      .max(maxLength)
      .messages({
        'any.required': emptyLastNameMessage,
        'string.empty': emptyLastNameMessage,
        'string.max': resolveValidationMessage(
          {
            message: `Last name must be no longer than ${maxLength} characters`,
            i18nKey: 'common.answer.fullName.validation.lastName.maxLength'
          },
          translate,
          { value: maxLength }
        )
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

  get displayText() {
    return `${this._data?.firstName ?? ''} ${this._data?.lastName ?? ''}`
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

  /**
   * @param {AnswerViewModelOptions['translate']} [translate]
   */
  validate(translate) {
    return validateAnswerAgainstSchema(
      fullNamePayloadSchema(this.config, translate),
      this._data ?? {}
    )
  }

  /**
   * @param {AnswerViewModelOptions} options
   */
  async viewModel({ validate, question, translate }) {
    const viewModel = { value: this.value, question }

    if (this.config.explanation) {
      viewModel.explanation = translate(
        this.config.explanationI18nKey,
        this.config.explanation
      )
    }

    if (validate) {
      viewModel.errors = this.validate(translate).errors
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
