import {
  getFirstJourneyPage,
  getFormContext,
  mapFormContextToAnswers
} from '../../../plugins/defra-forms/form-context.js'
import { SectionModel } from './section-model.js'
import { TerminalPageController } from '@defra/forms-engine-plugin/controllers/index.js'

/**
 * @import { Request } from '@hapi/hapi'
 * @import { FormContext } from "@defra/forms-engine-plugin/engine/types.js"
 * @import { SectionValidation } from './section-model.js'
 * @import { RawApplicationState } from '~/src/server/common/model/state/state-manager.js'
 */

export class SectionModelV2 extends SectionModel {
  /** @type {FormContext} */
  _data

  /** @type {string} */
  static journeySlug

  /** @param {FormContext} data */
  constructor(data) {
    super(data)
    this._data = data
  }

  /** @returns {SectionValidation} */
  validate() {
    const { errors } = this._data
    const firstPage = getFirstJourneyPage(this._data)

    if (errors?.length) {
      return {
        isValid: false,
        firstInvalidPageUrl: firstPage.getHref(firstPage.path)
      }
    }
    const finalPage = this._data.relevantPages.at(-1)

    if (finalPage instanceof TerminalPageController) {
      return {
        isValid: false,
        firstInvalidPageUrl: firstPage.getHref(firstPage.path)
      }
    }

    return { isValid: true }
  }

  /**
   * @param {Request} req
   * @param {RawApplicationState} _state
   * @returns {Promise<SectionModelV2>}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static async fromRequest(req, _state) {
    const formContext = await getFormContext(req, this.journeySlug)
    return new this(formContext)
  }

  get sectionData() {
    const questionAnswers = mapFormContextToAnswers(this._data).map(
      ({ question, questionKey, answer }) => ({
        question,
        questionKey,
        answer
      })
    )

    return {
      sectionKey: this.config.key,
      title: this.config.title,
      questionAnswers
    }
  }

  /**
   * @param {Request} _req
   * @param {string} redirectUri
   */
  summaryViewModel(_req, redirectUri) {
    const questionAnswers = mapFormContextToAnswers(this._data)

    return questionAnswers.map((qa) => ({
      key: qa.question,
      value: qa.answer.displayText,
      url: `${qa.slug}?returnUrl=${redirectUri}`,
      attributes: {
        'data-testid': `${qa.questionKey}-change-link`
      }
    }))
  }

  /**
   * @param {Request} req
   * @param {RawApplicationState} applicationState
   * @returns {Promise<object>}
   */
  async taskDetailsViewModel(req, applicationState) {
    const firstPage = getFirstJourneyPage(this._data)
    const sectionValidity = this.validate()
    return {
      title: this.config.title,
      initialLink: firstPage.getHref(firstPage.path),
      summaryLink: this.config.summaryLink,
      isValid: sectionValidity.isValid,
      isEnabled: await this.config.isEnabled(applicationState, req)
    }
  }
}
