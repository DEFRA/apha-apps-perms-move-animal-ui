import { SectionModel } from '../section-model/section-model.js'

export class DestinationSection extends SectionModel {
  validate() {
    return { isValid: false, result: {} }
  }

  /**
   * @returns {DestinationSection}
   */
  static fromState() {
    return new DestinationSection()
  }
}
