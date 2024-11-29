import Joi from 'joi'
import { SectionModel } from './section-model.js'
import { validateAgainstSchema } from '../../helpers/validation/validation.js'

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
