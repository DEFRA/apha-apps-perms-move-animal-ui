import SummaryPage from '../../../common/model/page/summary-page/SummaryPageModel.js'
import { TbSummaryPageController } from '../../summary-page-controller.js'
import { IdentificationSection } from '~/src/server/tb/identification/section.js'

export class IdentificationSummaryPage extends SummaryPage {
  pageTitle = 'Check your answers before you continue your application'
  pageHeading = 'Check your answers before you continue your application'
  sectionKey = 'identification'
  urlPath = `/${this.sectionKey}/check-answers`
  sectionFactory = (data) => IdentificationSection.fromState(data)
}

export const identificationSummaryPage = new IdentificationSummaryPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const identificationSummary = new TbSummaryPageController(
  new IdentificationSummaryPage()
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
