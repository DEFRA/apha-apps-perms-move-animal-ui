import { SectionModel } from './section-model/section-model.js'

export class Tests extends SectionModel {
  validate() {
    return { isValid: false, result: {} }
  }

  /**
   * @returns {Tests}
   */
  static fromState() {
    return new Tests()
  }
}
