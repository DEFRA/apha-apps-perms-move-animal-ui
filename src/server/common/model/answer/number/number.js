import Joi from 'joi'
import { TextAnswer } from '../text/text.js'
import { validateAnswerAgainstSchema } from '../validation.js'

/** @import {AnswerViewModelOptions} from '../answer-model.js' */

/**
 * @param {NumberConfig} config
 * @returns {Joi.Schema}
 */
export const numberSchema = ({ payloadKey, validation }) => {
  let numberValidation = Joi.number().empty('').required()

  const messages = {
    'any.required': validation.empty?.message ?? '',
    'number.base': 'Enter a number',
    'number.integer':
      validation.wholeNumberRequired?.message ?? 'Enter a whole number',
    'number.max': validation.max?.message ?? '',
    'number.min': validation.min?.message ?? ''
  }

  if (validation.max) {
    numberValidation = numberValidation.max(validation.max.value)
  }

  if (validation.min) {
    numberValidation = numberValidation.min(validation.min.value)
  }

  return Joi.object({
    [payloadKey]: numberValidation.messages(messages).integer()
  })
}

/**
 * export @typedef {{
 *  payloadKey: string,
 *  stripWhitespace?: boolean,
 *  type?: 'email',               // the default is number, so no need to specify
 *  spellcheck?: false,
 *  characterWidth?: 2 | 4 | 10 | 20,
 *  isPageHeading? : boolean,
 *  autocomplete?: string,
 *  hint?: string,
 *  validation: {
 *    max?: { value: number, message: string },
 *    min?: { value: number, message: string },
 *    empty?: { message: string },
 *    wholeNumberRequired?: { message: string }
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
  get type() {
    return 'number'
  }

  get html() {
    const value = this._data?.[this.config.payloadKey]
    return value !== undefined && value !== null && value !== ''
      ? String(value)
      : ''
  }

  toState() {
    const rawValue = this._data?.[this.config.payloadKey]

    if (rawValue === undefined || rawValue === null) {
      return undefined
    }

    const stringValue = String(rawValue).trim()
    if (stringValue === '') {
      return undefined
    }

    const n = Number(stringValue)
    return Number.isNaN(n) ? undefined : n
  }

  validate() {
    return validateAnswerAgainstSchema(
      numberSchema(this.config),
      this._data ?? {}
    )
  }
}
