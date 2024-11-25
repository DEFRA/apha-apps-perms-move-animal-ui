import Joi from 'joi'
import { validateAgainstSchema } from './model.js'

export const onOffFarmPayloadSchema = Joi.object({
  onOffFarm: Joi.string().required().valid('on', 'off').messages({
    'any.required':
      'Select if you are moving cattle on or off your farm or premises',
    'any.valid':
      'Select if you are moving cattle on or off your farm or premises',
    'string.empty':
      'Select if you are moving cattle on or off your farm or premises'
  })
})

/**
 * export @typedef {string} OnOffFarmData
 */

/**
 * @implements {Model<OnOffFarmData>}
 */
class OnOffFarmModel {
  /** @param {RawPayload} payload */
  toState(payload) {
    return payload.onOffFarm ?? ''
  }

  /**
   * @param {OnOffFarmData | undefined} data
   * @returns {RawPayload}
   */
  fromState(data) {
    return data !== undefined ? { onOffFarm: data } : {}
  }

  /** @param {RawPayload} data */
  validate(data) {
    return validateAgainstSchema(onOffFarmPayloadSchema, data)
  }
}

export const OnOffFarm = new OnOffFarmModel()

/** @import {Model,RawPayload} from './model.js' */
