import Joi from 'joi'
import { validateAgainstSchema } from './model.js'

const cphNumberRegex = /^([0-9]{2})\/([0-9]{3})\/([0-9]{4})$/i

export const cphNumberPayloadSchema = Joi.object({
  cphNumber: Joi.string()
    .required()
    .replace(' ', '')
    .pattern(cphNumberRegex)
    .messages({
      'any.required': 'Enter the farm or premises CPH number',
      'string.empty': 'Enter the farm or premises CPH number',
      'string.pattern.base':
        'Enter the CPH number in the correct format, for example, 12/345/6789'
    })
})

/**
 * export @typedef {string} CphNumberData
 */

/**
 * @implements {Model<CphNumberData>}
 */
class CphNumberModel {
  /** @param {RawPayload} payload */
  toState({ cphNumber }) {
    return cphNumber?.replace(/\s+/g, '') ?? ''
  }

  /**
   * @param {CphNumberData | undefined} data
   * @returns {{ cphNumber?: string }}
   */
  fromState(data) {
    return { cphNumber: data }
  }

  /** @param {RawPayload} data */
  validate(data) {
    return validateAgainstSchema(cphNumberPayloadSchema, data)
  }
}

export const CphNumber = new CphNumberModel()

/** @import {Model,RawPayload} from './model.js' */
