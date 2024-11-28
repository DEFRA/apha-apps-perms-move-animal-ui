import Joi from 'joi'
import { Model, validateAgainstSchema } from '../model.js'

const validationSchema = Joi.object().required()

/**
 * @import {RawPayload} from '../model.js'
 */

export class Tests extends Model {
  /**
   * @returns {RawPayload | undefined}
   */
  get value() {
    return this._data
  }

  /**
   *
   * @returns {RawPayload | undefined}
   */
  toState() {
    return this.value
  }

  validate() {
    return validateAgainstSchema(validationSchema, this._data)
  }

  /**
   * @returns {Tests}
   */
  static fromState() {
    return new Tests()
  }
}
