import Joi from 'joi'
import { SectionModel, validateAgainstSchema } from './section-model.js'

const validationSchema = Joi.object().required()

export class Destination extends SectionModel {
  validate() {
    return validateAgainstSchema(validationSchema, this._data)
  }

  /**
   * @returns {Destination}
   */
  static fromState() {
    return new Destination()
  }
}
