import { SectionModel } from '../section-model/section-model-updated.js'

export class TestsSection extends SectionModel {
  validate() {
    return { isValid: false, result: {} }
  }

  /**
   * @returns {TestsSection}
   */
  static fromState() {
    return new TestsSection()
  }
}
