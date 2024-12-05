import { SectionModel } from './section-model.js'

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
