import Joi from 'joi'
import { AnswerModel } from './answer-model.js'
import { validateAnswerAgainstSchema } from './validation.js'

const selectOptionText = 'Select where the animals are going'

export const destinationTypePayloadSchema = Joi.object({
  destinationType: Joi.string()
    .required()
    .valid('slaughter', 'dedicated-sale', 'afu', 'other')
    .messages({
      'any.required': selectOptionText,
      'any.valid': selectOptionText,
      'string.empty': selectOptionText
    })
})

/**
 * export @typedef {'slaughter' | 'dedicated-sale' | 'afu' | 'other'} DestinationTypeData
 * @typedef {{ destinationType: DestinationTypeData }} DestinationTypePayload
 */

/**
 * @augments AnswerModel<DestinationTypePayload>
 */
export class DestinationType extends AnswerModel {
  /**
   * @returns {DestinationTypeData | undefined}
   */
  toState() {
    return this._data?.destinationType
  }

  get value() {
    return this._data?.destinationType
  }

  get html() {
    const destinationType = this._data?.destinationType

    if (destinationType === 'slaughter') {
      return 'Slaughter'
    } else if (destinationType === 'dedicated-sale') {
      return 'Dedicated sale for TB (orange market)'
    } else if (destinationType === 'afu') {
      return 'Approved finishing unit (AFU)'
    } else if (destinationType === 'other') {
      return 'Another destination'
    } else {
      return ''
    }
  }

  /**
   * @param {DestinationTypeData | undefined} state
   * @returns {DestinationType}
   */
  static fromState(state) {
    return new DestinationType(
      state !== undefined ? { destinationType: state } : undefined
    )
  }

  validate() {
    return validateAnswerAgainstSchema(
      destinationTypePayloadSchema,
      this._data ?? {}
    )
  }

  _extractFields({ destinationType }) {
    return { destinationType }
  }
}
