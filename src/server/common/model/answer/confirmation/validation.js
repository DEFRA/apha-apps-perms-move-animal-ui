import Joi from 'joi'

export default Joi.object({
  confirmation: Joi.array()
    .items(Joi.string().valid('confirm', 'other'))
    .min(1)
    .messages({
      'array.min': 'You need to tick a declaration box'
    })
})
