import { NotImplementedError } from '../../helpers/not-implemented-error.js'
/** @import {AnswerErrors, AnswerValidationResult} from './validation.js' */
/** @import {RawApplicationState} from '../state/state-manager.js' */

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsdoc/require-returns-check */

/**
 * @typedef {{ href: string, text: string }} ViewErrorMessage
 * @typedef {{ type: string, value: any, displayText: string }} AnswerData
 */

/**
 * @template Payload
 * @class AnswerModel<Payload>
 */
export class AnswerModel {
  /** @type {Payload | undefined } */
  _data

  /** @type {RawApplicationState | undefined} */
  _context

  /** @type {string} */
  get type() {
    const type = 'text'
    return type
  }

  /** @returns {AnswerData} */
  get data() {
    return {
      type: this.type,
      value: this.toState(),
      displayText: this.html.replace(/<br \/>/g, '\n')
    }
  }

  /**
   * @param {Payload} [data]
   * @param {RawApplicationState} [context]
   */
  constructor(data, context) {
    this._data = data === undefined ? undefined : this._extractFields(data)
    this._context = context
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
   * @returns {Promise<any>}
   */
  async viewModel(_options) {
    return Promise.resolve({})
  }

  /**
   * @returns {string}
   */
  get template() {
    throw new NotImplementedError()
  }

  /**
   * @param {unknown} _data
   * @param {RawApplicationState} [_context]
   * @returns {unknown}
   */
  static fromState(_data, _context) {
    throw new NotImplementedError()
  }
}

/* eslint-disable jsdoc/valid-types */
/**
 * @template Payload
 * @typedef {{
 *   new(data?: Payload, context?: RawApplicationState): AnswerModel<Payload>;
 *   fromState(data: any, context?: RawApplicationState): AnswerModel<Payload>;
 *   errorMessages(errors: AnswerErrors): ViewErrorMessage[];
 * }} AnswerModelClass
 */
/* eslint-enable jsdoc/valid-types */

/**
 * @typedef {{[key:string]: string | undefined}} RawPayload
 */

/**
 * @typedef {{ validate?: boolean, question: string }} AnswerViewModelOptions
 */
