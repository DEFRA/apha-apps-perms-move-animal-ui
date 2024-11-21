import { validate } from '../common/page/validation.js'
import Joi from 'joi'

const emptyMessage = 'Enter the farm or premises CPH number'
const malformedMessage =
  'Enter the CPH number in the correct format, for example, 12/345/6789'
const cphPattern = /([0-9]{2})\/([0-9]{3})\/([0-9]{4})/
const requiredLength = 11

const schema = Joi.object({
  cphNumber: Joi.string()
    .required()
    .pattern(cphPattern)
    .max(requiredLength)
    .messages({
      'any.required': emptyMessage,
      'string.empty': emptyMessage,
      'string.pattern.base': malformedMessage,
      'string.max': malformedMessage
    })
})

/**
 * @params {{cphNumber: string | undefined}}
 */
export default (input) => validate(schema, input)
