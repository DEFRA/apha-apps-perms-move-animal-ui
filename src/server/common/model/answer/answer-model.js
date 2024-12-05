/**
 * @import {AnswerValidationResult} from './validation.js'
 */

class NotImplementedError extends Error {
  constructor() {
    super('Not implemented')
  }
}

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
    this._data = data === undefined ? undefined : this.extractFields(data)
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
   * @param {Payload} data
   * @returns {Payload}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  extractFields(data) {
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
 * @typedef {{[key:string]: string | undefined}} RawPayload
 */
