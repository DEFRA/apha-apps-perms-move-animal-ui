import Joi from 'joi'
import { AnswerModel } from './answer-model.js'
import { validateAnswerAgainstSchema } from './validation.js'

/** @import { AnswerErrors } from './validation.js' */

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
 * export @typedef {'on' | 'off'} OnOffFarmData
 * @typedef {{ onOffFarm: 'on' | 'off' }} OnOffFarmPayload
 */

/**
 * @augments AnswerModel<OnOffFarmPayload>
 */
export class OnOffFarm extends AnswerModel {
  /**
   * @returns {OnOffFarmData | undefined}
   */
  toState() {
    return this._data?.onOffFarm
  }

  get value() {
    return this._data?.onOffFarm
  }

  get html() {
    const originOnOffFarm = this._data?.onOffFarm

    if (originOnOffFarm === 'on') {
      return 'On to the farm or premises'
    } else if (originOnOffFarm === 'off') {
      return 'Off the farm or premises'
    } else {
      return ''
    }
  }

  /**
   * @param {OnOffFarmData | undefined} state
   * @returns {OnOffFarm}
   */
  static fromState(state) {
    return new OnOffFarm(state !== undefined ? { onOffFarm: state } : undefined)
  }

  validate() {
    return validateAnswerAgainstSchema(onOffFarmPayloadSchema, this._data ?? {})
  }

  _extractFields({ onOffFarm }) {
    return { onOffFarm }
  }
}
