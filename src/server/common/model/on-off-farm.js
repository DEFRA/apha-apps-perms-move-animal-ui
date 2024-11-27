import Joi from 'joi'
import { validateAgainstSchema, Model } from './model.js'
/** @import {RawPayload} from './model.js' */

const selectOptionText =
      'Select if you are moving cattle on or off your farm or premises'

export const onOffFarmPayloadSchema = Joi.object({
  onOffFarm: Joi.string().required().valid('on', 'off').messages({
    'any.required': selectOptionText,
    'any.valid': selectOptionText,
    'string.empty': selectOptionText
  })
})

/**
 * export @typedef {string} OnOffFarmData
 */

export class OnOffFarm extends Model {
  /** @type {RawPayload | undefined} */
  _data

  /**
   * @param {RawPayload | undefined} data
   */
  constructor(data) {
    super()
    this._data = data

    Object.seal(this) // makes class immutable after instantiation
  }

  /**
   * @returns {OnOffFarmData}
   */
  toState() {
    return this._data?.onOffFarm ?? ''
  }

  get value() {
    return {
      value: this._data?.onOffFarm
    }
  }

  /**
   * @param {OnOffFarmData | undefined} data
   * @returns {OnOffFarm}
   */
  static fromState(data) {
    return new OnOffFarm(data !== undefined ? { onOffFarm: data } : {})
  }

  validate() {
    return validateAgainstSchema(onOffFarmPayloadSchema, this._data)
  }
}

