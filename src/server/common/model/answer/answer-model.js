/**
 * @import {AnswerValidationResult} from './validation.js'
 */

class NotImplementedError extends Error {
  constructor() {
    super('Not implemented')
  }
}

export class AnswerModel {
  /** @type {RawPayload | undefined} */
  _data

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
 * @typedef {{[key:string]: string | undefined}} RawPayload
 */

/** @import { Schema } from 'joi' */
