/**
 * @import {AnswerErrors, AnswerValidationResult} from './validation.js'
 */

import { NotImplementedError } from '../../helpers/not-implemented-error.js'

/**
 * @typedef {{ href: string, text: string }} ViewErrorMessage
 */

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
    this._data = data === undefined ? undefined : this._extractFields(data)
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
   * @param {Payload} _data
   * @returns {Payload}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _extractFields(_data) {
    throw new NotImplementedError()
  }

  /**
   * @returns {AnswerValidationResult}
   */
  validate() {
    throw new NotImplementedError()
  }

  /*
   * @param {AnswerErrors} errors
   * @returns {ViewErrorMessage[]}
   */
  static errorMessages(errors) {
    return Object.entries(errors).map(([key, value]) => ({
      text: value.text,
      href: `#${key}`
    }))
  }

  /** @returns {string} */
  get html() {
    throw new NotImplementedError()
  }

  /**
   * @param {unknown} _data
   * @returns {unknown}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static fromState(_data) {
    throw new NotImplementedError()
  }
}

/**
 * @template Payload
 * @typedef {{
 *   new (data: Payload): AnswerModel<Payload>,
 *   fromState(data: any): AnswerModel<Payload>
 *   errorMessages(errors: AnswerErrors): ViewErrorMessage[]
 * }} AnswerModelClass
 */

/**
 * @typedef {{[key:string]: string | undefined}} RawPayload
 */
