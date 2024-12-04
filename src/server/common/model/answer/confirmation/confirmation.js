import { AnswerModel } from '../answer-model.js'
import { validateAgainstSchema } from '../../../helpers/validation/validation.js'
import validationSchema from './validation.js'

/**
 * export @typedef {{
 *  confirmation: (undefined | string)[] | string
 * }} ConfirmationData
 */

/**
 * @extends AnswerModel<ConfirmationData>
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
      confirmation: this._data?.confirmation ?? []
    }
  }

  validate() {
    let state = this._data?.confirmation
    if (!Array.isArray(state)) {
      state = [state]
    }

    return validateAgainstSchema(validationSchema, state ?? [])
  }

  /**
   * @param {ConfirmationData | undefined} state
   * @returns {Confirmation}
   */
  static fromState(state) {
    return new Confirmation(state)
  }
}
