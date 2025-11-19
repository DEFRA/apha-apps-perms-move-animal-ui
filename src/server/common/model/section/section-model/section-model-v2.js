import { NotImplementedError } from "../../../helpers/not-implemented-error.js"
import { getFormContext } from "../../../plugins/defra-forms/form-context.js"
import { SectionModel } from "./section-model.js"

/** @import { FormContext } from "@defra/forms-engine-plugin/engine/types.js" */
/** @import { SectionValidation } from './section-model.js' */
/** @import { RawApplicationState } from '~/src/server/common/model/state/state-manager.js' */

class SectionModelV2 extends SectionModel {

  /** @type {string} */
  static journeySlug

  /** @param {FormContext} data */
  constructor(data) {
    super(data)
  }

  /** @returns {SectionValidation} */
  validate() {
    throw new NotImplementedError()
  }

  // eslint-disable-next-line jsdoc/require-returns-check
  /**
   * @param {RawApplicationState} applicationState
   * @returns {Promise<object>}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async taskDetailsViewModel(req, applicationState) {
    throw new NotImplementedError()
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
    // throw new NotImplementedError()
  }

  /** @param {string} redirectUri */
  summaryViewModel(req, redirectUri) {
    throw new NotImplementedError()
  }

  // eslint-disable-next-line jsdoc/require-returns-check
  /**
   * @param {RawApplicationState} applicationState
   * @returns {Promise<object>}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async taskDetailsViewModel(req, applicationState) {
    throw new NotImplementedError()
  }
}
