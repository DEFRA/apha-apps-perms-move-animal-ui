/**
 * @import {AnswerValidationResult} from './validation.js'
 */

import { NotImplementedError } from '../../helpers/not-implmented-error.js'

/**
 * @template Payload
 * @class AnswerModel<Payload>
 */
export class AnswerModel {
  /** @type {Payload | undefined } */
  _data

  /**
   * @param {Payload | undefined } [data]
   */
  constructor(data) {
    this._data = data
    Object.seal(this)
  }

  /**
   * @returns {unknown}
   */
  get value() {
    throw new NotImplementedError()
  }

  toState() {
    throw new NotImplementedError()
  }

  /**
   * @returns {AnswerValidationResult}
   */
  validate() {
    throw new NotImplementedError()
  }

  /** @returns {string} */
  get html() {
    throw new NotImplementedError()
  }

  /* eslint-disable @typescript-eslint/no-unused-vars */

  /**
   * @param {unknown} _data
   * @returns {unknown}
   */
  static fromState(_data) {
    throw new NotImplementedError()
  }

  /* eslint-enable @typescript-eslint/no-unused-vars */
}

/**
 * @template Payload
 * @typedef {{
 *   new (data: Payload): AnswerModel<Payload>,
 *   fromState(data: any): AnswerModel<Payload>
 * }} AnswerModelClass
 */

/**
 * @typedef {{[key:string]: string | undefined}} RawPayload
 */
