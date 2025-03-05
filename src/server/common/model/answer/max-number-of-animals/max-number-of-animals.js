import Joi from 'joi'
import { validateAnswerAgainstSchema } from '../validation.js'
import { NumberAnswer } from '../number/number.js'

const min = 1
const max = 5000

/** @import { NumberConfig } from '../number/number.js' */

/**
 * export @typedef {string} MaxNumberOfAnimalsData
 * @typedef {{ maxNumberOfAnimals: string }} MaxNumberOfAnimalsPayload
 */

/**
 * @augments {NumberAnswer<MaxNumberOfAnimalsPayload>}
 */
export class MaxNumberOfAnimalsAnswer extends NumberAnswer {
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

  /** @type {NumberConfig} */
  static config = {
    payloadKey: 'maxNumberOfAnimals',
    autocomplete: 'maxNumberOfAnimals',
    characterWidth: 2,
    validation: {
      max: { value: max, message: 'Enter a number 5000 or below' },
      min: { value: min, message: 'Enter a number 1 or above' }
    }
  }
}
