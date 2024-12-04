import { AnswerModel } from '../answer-model.js'
import { validateAgainstSchema } from '../../../helpers/validation/validation.js'
import validationSchema from './validation.js'

/**
 * @template T
 * @param {T[] | T} value
 * @returns T[]
 */
const ensureArray = (value) => Array.isArray(value) ? value : [value]

/**
 * export @typedef {{
 *  confirmation: string[]
 * }} ConfirmationData
 *
 * @typedef {{ confirmation: string[] | string }} ConfirmationPayload
 */

/**
 * @extends AnswerModel<ConfirmationPayload>
 */
export class Confirmation extends AnswerModel {
  get value() {
    return {
      confirm: this._data?.confirmation.includes('confirm'),
      other: this._data?.confirmation.includes('other')
    }
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
    return validateAgainstSchema(validationSchema, {
      confirmation: ensureArray(this._data?.confirmation ?? [])
    })
  }

  /**
   * @param {ConfirmationData | undefined} state
   * @returns {Confirmation}
   */
  static fromState(state) {
    return new Confirmation(state)
  }
}
