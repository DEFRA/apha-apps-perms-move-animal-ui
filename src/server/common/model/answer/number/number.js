import Joi from 'joi'
import { TextAnswer } from '../text/text.js'
import { validateAnswerAgainstSchema } from '../validation.js'

/** @import {AnswerViewModelOptions} from '../answer-model.js' */

/**
 * @param {NumberConfig} config
 * @returns {Joi.Schema}
 */
const numberSchema = ({ payloadKey, validation }) => {
  let numberValidation = Joi.number().empty('').integer().required()

  const messages = {
    'any.required': validation.empty?.message ?? '',
    'number.max': validation.max?.message ?? '',
    'number.min': validation.min?.message ?? '',

    'number.base': 'Enter a number',
    'number.integer': 'Enter a whole number'
  }

  if (validation.max) {
    numberValidation = numberValidation.max(validation.max.value)
  }

  if (validation.min) {
    numberValidation = numberValidation.min(validation.min.value)
  }

  return Joi.object({
    [payloadKey]: numberValidation.messages(messages)
  })
}

/**
 * export @typedef {{
 *  payloadKey: string,
 *  stripWhitespace?: boolean,
 *  type?: 'email',               // the default is number, so no need to specify
 *  spellcheck?: false,
 *  characterWidth?: 2 | 10 | 20,
 *  isPageHeading? : boolean,
 *  autocomplete?: string,
 *  hint?: string,
 *  validation: {
 *    max?: { value: number, message: string },
 *    min?: { value: number, message: string },
 *    empty?: { message: string },
 *    pattern?: { regex: RegExp, message: string }
 *  }
 * }} NumberConfig
 */

/**
 * @typedef {string} NumberData
 */

/**
 * @template Payload
 * @augments {TextAnswer<Payload>}
 */
export class NumberAnswer extends TextAnswer {
  validate() {
    return validateAnswerAgainstSchema(
      numberSchema(this.config),
      this._data ?? {}
    )
  }
}
