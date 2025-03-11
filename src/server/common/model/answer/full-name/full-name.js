import Joi from 'joi'
import { AnswerModel } from '../answer-model.js'
import { validateAnswerAgainstSchema } from '../validation.js'

/** @import { AnswerViewModelOptions } from '../answer-model.js' */

/**
 * export @typedef {{
 *  validation: {
 *    firstName: {
 *      maxLength?: { value: number, message: string },
 *      empty?: { message: string },
 *    },
 *    lastName: {
 *      maxLength?: { value: number, message: string },
 *      empty?: { message: string },
 *    }
 *  }
 * }} FullNameConfig
 */

const defaultMaxLength = 50

const buildNameValidationSchema = (validation) => {
  let stringValidation = Joi.string().trim().required()

  const messages = {
    'any.required': validation.empty?.message ?? '',
    'string.empty': validation.empty?.message ?? '',
    'string.max': validation.maxLength?.message ?? ''
  }

  if (validation.maxLength) {
    stringValidation = stringValidation.max(validation.maxLength.value)
  }

  return stringValidation.messages(messages)
}

/**
 * @param {FullNameConfig} config
 * @returns {Joi.Schema}
 */
const fullNamePayloadSchema = ({ validation }) => {
  return Joi.object({
    firstName: buildNameValidationSchema(validation.firstName),
    lastName: buildNameValidationSchema(validation.lastName)
  })
}

/**
 * export @typedef {{ firstName: string; lastName: string;}} FullNameData
 * export @typedef {{ firstName: string; lastName: string }} FullNamePayload
 */

/**
 * @augments AnswerModel<FullNamePayload>
 */
export class FullNameAnswer extends AnswerModel {
  // eslint-disable-next-line jsdoc/require-returns-check
  /** @returns {FullNameConfig} */
  get config() {
    return /** @type {any} */ (this.constructor).config
  }

  // eslint-disable-next-line jsdoc/require-returns-check
  /** @returns {FullNameConfig} */
  static get config() {
    return {
      validation: {
        firstName: {
          maxLength: {
            value: defaultMaxLength,
            message: `First name must be no longer than ${defaultMaxLength} characters`
          },
          empty: {
            message:
              'Enter the first name of the County Parish Holding (CPH) owner'
          }
        },
        lastName: {
          maxLength: {
            value: defaultMaxLength,
            message: `Last name must be no longer than ${defaultMaxLength} characters`
          },
          empty: {
            message:
              'Enter the last name of the County Parish Holding (CPH) owner'
          }
        }
      }
    }
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
    return `${this._data?.firstName ?? ''} ${this._data?.lastName ?? ''}`
  }

  // eslint-disable-next-line @typescript-eslint/class-literal-property-style
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
  viewModel({ validate, question }) {
    const viewModel = { value: this.value, question }

    if (validate) {
      viewModel.errors = this.validate().errors
    }

    return viewModel
  }

  _extractFields({ firstName, lastName }) {
    return { firstName, lastName }
  }

  /**
   * @param { FullNameData | undefined} state
   * @returns { FullNameAnswer}
   */
  static fromState(state) {
    return new FullNameAnswer(
      state !== undefined
        ? { firstName: state.firstName, lastName: state.lastName }
        : undefined
    )
  }
}
