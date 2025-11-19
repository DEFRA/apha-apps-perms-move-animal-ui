import Joi from 'joi'

const baseFormSchema = Joi.object({
  crumb: Joi.string().required(),
  file: Joi.object().required()
})
  .required()
  .messages({
    'any.required': 'You need to upload your biosecurity map'
  })

const uploadedFormSchema = baseFormSchema.keys({
  file: Joi.object({
    s3Key: Joi.string().required()
  }).required()
})

const baseStatus = {
  metadata: Joi.object().required(),
  form: baseFormSchema,
  numberOfRejectedFiles: Joi.number().equal(0)
}

const processingStatus = Joi.object({
  ...baseStatus,
  uploadStatus: Joi.string().required()
})

const uploadedStatus = Joi.object({
  ...baseStatus,
  uploadStatus: Joi.string().valid('ready').required(),
  form: uploadedFormSchema
})

export const finalSchema = Joi.object({
  metadata: Joi.object({
    uploadId: Joi.string().required(),
    uploadUrl: Joi.string().required(),
    statusUrl: Joi.string().required()
  }).required(),
  status: uploadedStatus.required()
}).required()

export const processingSchema = Joi.object({
  metadata: Joi.object({
    uploadId: Joi.string().required(),
    uploadUrl: Joi.string().required(),
    statusUrl: Joi.string().required()
  }).required(),
  status: processingStatus.optional()
}).required()
