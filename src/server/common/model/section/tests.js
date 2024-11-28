import Joi from 'joi'
import { SectionModel, validateAgainstSchema } from './section-model.js'

const validationSchema = Joi.object().required()

export class Tests extends SectionModel {
  validate() {
    return validateAgainstSchema(validationSchema, this._data)
  }

  /**
   * @returns {Tests}
   */
  static fromState() {
    return new Tests()
  }
}
