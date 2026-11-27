/**
 * @import { Schema } from 'joi'
 */
/** @import {AnswerViewModelOptions} from './answer-model.js' */

/**
 * export @typedef {{message: string, i18nKey?: string}} ValidationMessage
 * @typedef {{text: string}} ValidationError
 * @typedef {{[key:string]: ValidationError}} AnswerErrors
 * export @typedef {{
 *   isValid: boolean,
 *   errors: AnswerErrors
 * }} AnswerValidationResult
 */

/**
 * @param {ValidationMessage | string} validationMessage
 * @param {AnswerViewModelOptions['translate']} [translate]
 * @param {Record<string, unknown>} [params]
 * @returns {string}
 */
export const resolveValidationMessage = (
  validationMessage,
  translate,
  params
) => {
  if (typeof validationMessage === 'string') {
    return validationMessage
  }

  if (!validationMessage.i18nKey || !translate) {
    return validationMessage.message
  }

  return params
    ? translate(validationMessage.i18nKey, validationMessage.message, params)
    : translate(validationMessage.i18nKey, validationMessage.message)
}

/**
 * @param {Schema} schema
 * @param {object} value
 * @returns {AnswerValidationResult}
 */
export const validateAnswerAgainstSchema = (schema, value) => {
  const { error } = schema.validate(value, {
    abortEarly: false,
    allowUnknown: true
  })

  if (error === undefined) {
    return { isValid: true, errors: {} }
  } else {
    const errors = error.details?.map((x) => [
      x.context?.label ?? '',
      { text: x.message }
    ])

    return {
      isValid: false,
      errors: Object.fromEntries(errors ?? [])
    }
  }
}
