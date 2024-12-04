import Joi from 'joi'

export default Joi.array()
  .items(Joi.string())
  .has(Joi.string().valid('confirm').required())
