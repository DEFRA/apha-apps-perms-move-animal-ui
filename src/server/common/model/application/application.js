import Wreck from '@hapi/wreck'

import { DestinationSection } from '../section/destination/destination.js'
import { LicenceSection } from '../section/licence/licence.js'
import { OriginSection } from '../section/origin/origin.js'
import { BiosecuritySection } from '../section/biosecurity/biosecurity.js'
import { validateApplication } from './validation.js'
import { BiosecurityPlanSection } from '../section/biosecurity-plan/biosecurity-plan.js'
import { IdentificationSection } from '../section/identification/identification.js'
import { HiddenAnswer } from '../answer/hidden/hidden.js'
import { statusCodes } from '../../constants/status-codes.js'
import { config } from '~/src/config/config.js'

/**
 * @import { SectionModel, QuestionPageAnswer } from '../section/section-model/section-model.js'
 * @import { RawApplicationState } from '../state/state-manager.js'
 * @import { ApplicationValidationResult } from './validation.js'
 * @typedef { { [key: string]: SectionModel; } } ApplicationPayload
 */

export class ApplicationModel {
  /** @type {ApplicationPayload} */
  _data

  // This is a list of all the sections that are implemented in the application.
  // The order in this array drives the order in which the sections are displayed.
  /** @type {typeof SectionModel[]} */
  static implementedSections = [
    OriginSection,
    DestinationSection,
    LicenceSection,
    IdentificationSection,
    BiosecuritySection,
    BiosecurityPlanSection
  ]

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

  async send() {
    const data = this.caseManagementData

    const resp = await Wreck.post(
      `${config.get('caseManagementApi').baseUrl}/submit`,
      {
        payload: data
      }
    )

    if (resp.res.statusCode === statusCodes.ok) {
      return JSON.parse(resp.payload.toString())
    }
  }

  get caseManagementData() {
    const sections = this.tasks

    /** @param {QuestionPageAnswer} questionPageAnswer */
    const answerForQuestionPage = ({ answer }) => ({
      type: answer.type,
      value: answer.toState(),
      displayText: answer.html
    })

    /** @param {SectionModel} section */
    const questionAnswersForSection = (section) =>
      section.questionPageAnswers
        .filter(({ answer }) => !(answer instanceof HiddenAnswer))
        .map((questionPageAnswer) => ({
          question: questionPageAnswer.page.question,
          questionKey: questionPageAnswer.page.questionKey,
          answer: answerForQuestionPage(questionPageAnswer)
        }))

    return {
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
    return new ApplicationModel(
      Object.fromEntries(
        this.visibleSections(state).map((section) => [
          section.config.key,
          section.fromState(state)
        ])
      )
    )
  }
}
