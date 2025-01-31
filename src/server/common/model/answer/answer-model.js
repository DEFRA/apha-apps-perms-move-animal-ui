import { NotImplementedError } from '../../helpers/not-implemented-error.js'
/** @import {AnswerErrors, AnswerValidationResult} from './validation.js' */

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsdoc/require-returns-check */

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

  /**
   * @returns {string}
   */
  get html() {
    throw new NotImplementedError()
  }

  /**
   * @param {AnswerViewModelOptions} _options
   */
  viewModel(_options) {
    throw new NotImplementedError()
  }

  /**
   * @param {unknown} _data
   * @returns {unknown}
   */
  static fromState(_data) {
    throw new NotImplementedError()
  }
}

/* eslint-disable jsdoc/valid-types */
/**
 * @template Payload
 * @typedef {{
 *   new(data: Payload): AnswerModel<Payload>;
 *   fromState(data: any): AnswerModel<Payload>;
 *   errorMessages(errors: AnswerErrors): ViewErrorMessage[];
 * }} AnswerModelClass
 */
/* eslint-enable jsdoc/valid-types */

/**
 * @typedef {{[key:string]: string | undefined}} RawPayload
 */

/**
 * @typedef {{ validate: boolean, question?: string }} AnswerViewModelOptions
 */
