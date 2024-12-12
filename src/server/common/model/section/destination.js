import { SectionModel } from './section-model/section-model.js'

export class Destination extends SectionModel {
  validate() {
    return { isValid: false, result: {} }
  }

  /**
   * @returns {Destination}
   */
  static fromState() {
    return new Destination()
  }
}
