import { NotImplementedError } from "../../../helpers/not-implemented-error.js"
import { getFirstJourneyPage, getFormContext, mapFormContextToAnswers } from "../../../plugins/defra-forms/form-context.js"
import { SectionModel } from "./section-model.js"

/** @import { FormContext } from "@defra/forms-engine-plugin/engine/types.js" */
/** @import { SectionValidation } from './section-model.js' */
/** @import { RawApplicationState } from '~/src/server/common/model/state/state-manager.js' */

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
    if (errors?.length){
      const firstPage = getFirstJourneyPage(this._data)
      return { isValid: false, firstInvalidPage: firstPage.getHref(firstPage.path) }
    }

    return { isValid: true }
  }


  /**
   * @param {import("@hapi/hapi").Request} req
   * @param {RawApplicationState} state
   * @returns {Promise<SectionModel>}
   */
  static async fromRequest(req, state) {
    const formContext = await getFormContext(req, this.journeySlug)
    return new this(formContext)
  }

  get sectionData() {
    const questionAnswers = mapFormContextToAnswers(this._data)

    return {
      sectionKey: this.config.key,
      title: this.config.title,
      questionAnswers: questionAnswers
    }
    // throw new NotImplementedError()
  }

  /** @param {string} redirectUri */
  summaryViewModel(req, redirectUri) {
    const questionAnswers = mapFormContextToAnswers(this._data)

    return questionAnswers.map(qa => ({
      key: qa.question,
      value: qa.answer.displayText,
      url: `${qa.slug}?returnUrl=${redirectUri}`,
      attributes: {
        'data-testid': `${qa.questionKey}-change-link`
      }
    }))
  }

  // eslint-disable-next-line jsdoc/require-returns-check
  /**
   * @param {RawApplicationState} applicationState
   * @returns {Promise<object>}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
