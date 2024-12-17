import Joi from 'joi'
import { AnswerModel } from '../answer-model.js'
import { validateAnswerAgainstSchema } from '../validation.js'

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
export class DestinationTypeAnswer extends AnswerModel {
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

    const destinationTypeMapping = {
      slaughter: 'Slaughter',
      'dedicated-sale': 'Dedicated sale for TB (orange market)',
      afu: 'Approved finishing unit (AFU)',
      other: 'Another destination'
    }

    return destinationTypeMapping[destinationType] ?? ''
  }

  /**
   * @param {DestinationTypeData | undefined} state
   * @returns {DestinationTypeAnswer}
   */
  static fromState(state) {
    return new DestinationTypeAnswer(
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
