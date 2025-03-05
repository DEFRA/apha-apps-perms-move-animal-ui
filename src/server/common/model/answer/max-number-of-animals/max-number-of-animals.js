import { TextAnswer } from '../text/text.js'
import Joi from 'joi'
import { validateAnswerAgainstSchema } from '../validation.js'

const min = 1
const max = 5000

/** @import { TextConfig } from '../text/text.js' */

/**
 * export @typedef {string} MaxNumberOfAnimalsData
 * @typedef {{ maxNumberOfAnimals: string }} MaxNumberOfAnimalsPayload
 */

/**
 * @augments {TextAnswer<MaxNumberOfAnimalsPayload>}
 */
export class MaxNumberOfAnimalsAnswer extends TextAnswer {
  validate() {
    return validateAnswerAgainstSchema(
      Joi.object({
        [MaxNumberOfAnimalsAnswer.config.payloadKey]: Joi.number()
          .empty('')
          .min(min)
          .max(max)
          .integer()
          .required()
          .messages({
            'number.base': 'Enter a number',
            'number.min': `Enter a number ${min} or above`,
            'number.max': `Enter a number ${max} or below`,
            'number.integer': 'Enter a whole number',
            'any.required': 'Enter how many animals you are planning to move'
          })
      }),
      this._data ?? {}
    )
  }

  /** @type {TextConfig} */
  static config = {
    payloadKey: 'maxNumberOfAnimals',
    autocomplete: 'maxNumberOfAnimals',
    characterWidth: 2,
    validation: {}
  }
}
