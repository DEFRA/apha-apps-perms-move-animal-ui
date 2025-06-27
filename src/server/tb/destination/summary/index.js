import SummaryPage from '../../../common/model/page/summary-page/SummaryPageModel.js'
import { TbSummaryPageController } from '../../summary-page-controller.js'

import { DestinationSection } from '~/src/server/tb/destination/section.js'

export class DestinationSummaryPage extends SummaryPage {
  pageTitle = 'Check your answers before you continue your application'
  pageHeading = 'Check your answers before you continue your application'
  sectionKey = 'destination'
  urlPath = `/${this.sectionKey}/check-answers`
  sectionFactory = (data) => DestinationSection.fromState(data)
}

export const destinationSummaryPage = new DestinationSummaryPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const destinationSummary = new TbSummaryPageController(
  new DestinationSummaryPage()
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
