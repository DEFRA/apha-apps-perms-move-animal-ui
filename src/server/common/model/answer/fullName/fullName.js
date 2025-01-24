import Joi from 'joi'
import { AnswerModel } from '../answer-model.js'
import { validateAnswerAgainstSchema } from '../validation.js'

const maxLength = 50

export const fullNamePayloadSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .trim()
    .max(maxLength)
    .messages({
      'string.empty':
        'Enter the first name of the County Parish Holding (CPH) owner',
      'string.max': `First name must be no longer than ${maxLength} characters`
    }),
  lastName: Joi.string()
    .required()
    .trim()
    .max(maxLength)
    .messages({
      'string.empty':
        'Enter the last name of the County Parish Holding (CPH) owner',
      'string.max': `Last name must be no longer than ${maxLength} characters`
    })
})

/**
 * export @typedef {{ firstName: string; lastName: string;}} FullNameData
 * @typedef {{ firstName: string; lastName: string }} FullNamePayload
 */

/**
 * @augments AnswerModel<FullNamePayload>
 */
export class FullNameAnswer extends AnswerModel {
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
    return validateAnswerAgainstSchema(fullNamePayloadSchema, this._data ?? {})
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
