import Joi from 'joi'

export default Joi.object({
  metadata: Joi.object({
    uploadId: Joi.string().required(),
    uploadUrl: Joi.string().required(),
    statusUrl: Joi.string().required()
  }).required(),
  status: Joi.object({
    uploadStatus: Joi.string().required(),
    metadata: Joi.object().required(),
    form: Joi.object({
      crumb: Joi.string().required(),
      file: Joi.object().required()
    })
      .required()
      .messages({
        'any.required': 'You need to upload your biosecurity map'
      }),
    numberOfRejectedFiles: Joi.number().equal(0)
  }).optional()
}).required()
