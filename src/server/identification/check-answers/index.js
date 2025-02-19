import SummaryPage from '../../common/model/page/summary-page/SummaryPageModel.js'
import { SummaryPageController } from '../../common/controller/summary-page-controller/summary-page-controller.js'
import { IdentificationSection } from '../../common/model/section/identification/identification.js'

/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */
/** @import { RawApplicationState } from '~/src/server/common/model/state/state-manager.js' */

const checkAnswersHeading =
  'Check your answers before you continue your application'

export class IdentificationSummaryPage extends SummaryPage {
  pageTitle = checkAnswersHeading
  pageHeading = checkAnswersHeading
  sectionKey = 'identification'
  urlPath = `/${this.sectionKey}/check-answers`
  sectionFactory = (/** @type {RawApplicationState} */ data) =>
    IdentificationSection.fromState(data)
}

export const identificationSummaryPage = new IdentificationSummaryPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const identificationSummary = new SummaryPageController(
  identificationSummaryPage
).plugin()
