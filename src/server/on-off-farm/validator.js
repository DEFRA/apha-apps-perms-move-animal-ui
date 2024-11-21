import { validate } from '../common/page/validation.js'
import Joi from 'joi'

const emptyMessage =
  'Select if you are moving cattle on or off your farm or premises'

const schema = Joi.object({
  onOffFarm: Joi.string().required().allow('on', 'off').messages({
    'any.required': emptyMessage,
    'string.empty': emptyMessage
  })
})

export default (input) => validate(schema, input)
