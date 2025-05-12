import { AnswerModel } from '../answer-model.js'
import { NotImplementedError } from '../../../helpers/not-implemented-error.js'

/** @import {AnswerViewModelOptions} from '../answer-model.js' */

/**
 * export @typedef {{
 *  payloadKey: string,
 *  value: string,
 * }} HiddenAnswerConfig
 */

/**
 * @typedef {string} TextData
 */

/**
 * @template Payload
 * @augments {AnswerModel<Payload>}
 */
export class HiddenAnswer extends AnswerModel {
  // eslint-disable-next-line jsdoc/require-returns-check
  /** @returns {HiddenAnswerConfig} */
  get config() {
    return /** @type {any} */ (this.constructor).config
  }

  // eslint-disable-next-line jsdoc/require-returns-check
  /** @returns {HiddenAnswerConfig} */
  static get config() {
    throw new NotImplementedError()
  }

  /**
   * @returns {string | undefined}
   */
  get value() {
    return this._data?.[this.config.payloadKey]
  }

  // eslint-disable-next-line @typescript-eslint/class-literal-property-style
  get template() {
    return 'model/answer/hidden/hidden.njk'
  }

  /**
   * @returns {TextData}
   */
  toState() {
    return this.value ?? ''
  }

  validate() {
    return { isValid: this.value === this.config.value, errors: {} }
  }

  /**
   * @param {AnswerViewModelOptions} options
   */
  viewModel({ question }) {
    const { payloadKey, value } = this.config

    const viewModel = {
      id: payloadKey,
      name: payloadKey,
      question,
      value
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
   * @returns {HiddenAnswer}
   */
  static fromState(state) {
    return new this(
      state !== undefined ? { [this.config.payloadKey]: state } : {}
    )
  }
}
