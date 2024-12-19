import Joi from 'joi'
import { AnswerModel } from '../answer-model.js'
import { validateAnswerAgainstSchema } from '../validation.js'

const selectOptionText = 'Select where the animals are moving from'

export const originTypePayloadSchema = Joi.object({
  originType: Joi.string()
    .required()
    .valid('tb-restricted-farm', 'afu', 'other')
    .messages({
      'any.required': selectOptionText,
      'any.valid': selectOptionText,
      'string.empty': selectOptionText
    })
})

/**
 * export @typedef {'tb-restricted-farm' | 'afu' | 'other'} OriginTypeData
 * @typedef {{ originType: OriginTypeData }} OriginTypePayload
 */

/**
 * @augments AnswerModel<OriginTypePayload>
 */
export class OriginTypeAnswer extends AnswerModel {
  /**
   * @returns {OriginTypeData | undefined}
   */
  toState() {
    return this._data?.originType
  }

  get value() {
    return this._data?.originType
  }

  get html() {
    const originType = this._data?.originType ?? 'invalid'

    /** @type Record<OriginTypeData, string> */
    const originTypeMapping = {
      'tb-restricted-farm': 'TB restricted farm',
      afu: 'Approved finishing unit (AFU)',
      other: 'Another type of premises'
    }

    return originTypeMapping[originType] ?? ''
  }

  /**
   * @param {OriginTypeData | undefined} state
   * @returns {OriginTypeAnswer}
   */
  static fromState(state) {
    return new OriginTypeAnswer(
      state !== undefined ? { originType: state } : undefined
    )
  }

  validate() {
    return validateAnswerAgainstSchema(
      originTypePayloadSchema,
      this._data ?? {}
    )
  }

  _extractFields({ originType }) {
    return { originType }
  }
}
