import Joi from 'joi'
import { SectionModel, validateAgainstSchema } from './section-model.js'

const validationSchema = Joi.object().required()

export class License extends SectionModel {
  validate() {
    return validateAgainstSchema(validationSchema, this._data)
  }

  /**
   * @returns {License}
   */
  static fromState() {
    return new License()
  }
}
