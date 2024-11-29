import Joi from 'joi'
import { AnswerModel } from './answer-model.js'
import { validateAgainstSchema } from '../../helpers/validation/validation.js'
/** @import {RawPayload} from './answer-model.js' */

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

export class OnOffFarm extends AnswerModel {
  /**
   * @returns {OnOffFarmData}
   */
  toState() {
    return this._data?.onOffFarm ?? ''
  }

  get value() {
    return this._data?.onOffFarm
  }

  /**
   * @param {OnOffFarmData | undefined} state
   * @returns {OnOffFarm}
   */
  static fromState(state) {
    return new OnOffFarm(state !== undefined ? { onOffFarm: state } : {})
  }

  validate() {
    return validateAgainstSchema(onOffFarmPayloadSchema, this._data)
  }
}
