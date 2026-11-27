import Joi from 'joi'
import { TextAnswer } from '../text/text.js'
import {
  resolveValidationMessage,
  validateAnswerAgainstSchema
} from '../validation.js'

/** @import {ValidationMessage} from '../validation.js' */
/** @import {AnswerViewModelOptions} from '../answer-model.js' */

/**
 * @param {NumberConfig} config
 * @param {AnswerViewModelOptions['translate']} [translate]
 * @returns {Joi.Schema}
 */
export const numberSchema = ({ payloadKey, validation }, translate) => {
  let numberValidation = Joi.number().empty('').required()

  const messages = {
    'any.required': resolveValidationMessage(validation.empty ?? '', translate),
    'number.base': resolveValidationMessage(
      {
        message: 'Enter a number',
        i18nKey: 'common.answer.number.validation.base'
      },
      translate
    ),
    'number.integer': resolveValidationMessage(
      validation.wholeNumberRequired ?? {
        message: 'Enter a whole number',
        i18nKey: 'common.answer.number.validation.wholeNumber'
      },
      translate
    ),
    'number.max': validation.max
      ? resolveValidationMessage(validation.max, translate, {
          value: validation.max.value
        })
      : '',
    'number.min': validation.min
      ? resolveValidationMessage(validation.min, translate, {
          value: validation.min.value
        })
      : ''
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
 *    max?: ValidationMessage & { value: number },
 *    min?: ValidationMessage & { value: number },
 *    empty?: ValidationMessage,
 *    wholeNumberRequired?: ValidationMessage
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

  get displayText() {
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

  /**
   * @param {AnswerViewModelOptions['translate']} [translate]
   */
  validate(translate) {
    return validateAnswerAgainstSchema(
      numberSchema(this.config, translate),
      this._data ?? {}
    )
  }
}
