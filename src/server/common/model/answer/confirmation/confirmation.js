import { AnswerModel } from '../answer-model.js'
import { validateAnswerAgainstSchema } from '../validation.js'
import validationSchema from './validation.js'

/**
 * @template T
 * @param {T[] | T} value
 * @returns T[]
 */
const ensureArray = (value) => (Array.isArray(value) ? value : [value])

/**
 * export @typedef {{
 *  confirmation: string[]
 * }} ConfirmationData
 *
 * export @typedef {{ confirmation: string[] | string }} ConfirmationPayload
 */

/**
 * @augments AnswerModel<ConfirmationPayload>
 */
export class ConfirmationAnswer extends AnswerModel {
  get value() {
    const data = Array.isArray(this._data?.confirmation)
      ? this._data.confirmation
      : [this._data?.confirmation]

    const value = {
      confirm: data.includes('confirm'),
      other: data.includes('other')
    }

    return value
  }

  get html() {
    const html = 'confirmation html'
    return html
  }

  /**
   * @returns {ConfirmationData | undefined}
   */
  toState() {
    return {
      confirmation: ensureArray(this._data?.confirmation ?? [])
    }
  }

  validate() {
    return validateAnswerAgainstSchema(validationSchema, {
      confirmation: ensureArray(this._data?.confirmation ?? [])
    })
  }

  _extractFields({ confirmation }) {
    return { confirmation }
  }

  /**
   * @param {ConfirmationData | undefined} state
   * @returns {ConfirmationAnswer}
   */
  static fromState(state) {
    return new ConfirmationAnswer(state)
  }
}
