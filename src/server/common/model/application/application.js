import { validateApplication } from '~/src/server/common/model/application/validation.js'
import { HiddenAnswer } from '~/src/server/common/model/answer/hidden/hidden.js'
import { NotImplementedError } from '../../helpers/not-implemented-error.js'

/* eslint-disable jsdoc/require-returns-check */

/**
 * @import { SectionModel } from '~/src/server/common/model/section/section-model/section-model.js'
 * @import { RawApplicationState } from '~/src/server/common/model/state/state-manager.js'
 * @import { ApplicationValidationResult } from '~/src/server/common/model/application/validation.js'
 * @typedef { { [key: string]: SectionModel; } } ApplicationPayload
 */

export class ApplicationModel {
  /** @type {ApplicationPayload} */
  _data

  // This is a list of all the sections that are implemented in the application.
  // The order in this array drives the order in which the sections are displayed.
  /** @type {typeof SectionModel[]} */
  static implementedSections

  /** @returns {{ major: number, minor: number }} */
  get version() {
    throw new NotImplementedError()
  }

  /** @returns {string} */
  get journeyId() {
    throw new NotImplementedError()
  }

  /**
   * @param {ApplicationPayload} data
   */
  constructor(data) {
    this._data = data
    Object.seal(this)
  }

  /** @returns {ApplicationValidationResult} */
  validate() {
    return validateApplication(this._data)
  }

  /**
   * Getter for tasks.
   * @returns {ApplicationPayload} The data associated with each and every task in the application
   */
  get tasks() {
    return this._data
  }

  /**
   * @param {RawApplicationState} state
   */
  static visibleSections(state) {
    return this.implementedSections.filter((section) => {
      return section.config.isVisible(state)
    })
  }

  get caseManagementData() {
    const sections = this.tasks

    /** @param {SectionModel} section */
    const questionAnswersForSection = (section) =>
      section.questionPageAnswers
        .filter(({ answer, page }) => {
          return !(answer instanceof HiddenAnswer || page.isInterstitial)
        })
        .map((questionPageAnswer) => ({
          question: questionPageAnswer.page.question,
          questionKey: questionPageAnswer.page.questionKey,
          answer: questionPageAnswer.answer.data
        }))

    return {
      journeyVersion: this.version,
      journeyId: this.journeyId,
      sections: Object.values(sections).map((section) => ({
        sectionKey: section.config.key,
        title: section.config.title,
        questionAnswers: questionAnswersForSection(section)
      }))
    }
  }

  /**
   * @param {RawApplicationState} state
   * @returns {ApplicationModel}
   */
  static fromState(state) {
    return new this(
      Object.fromEntries(
        this.visibleSections(state).map((section) => [
          section.config.key,
          section.fromState(state)
        ])
      )
    )
  }
}
