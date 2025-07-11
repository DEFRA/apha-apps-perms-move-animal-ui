/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

import { ExitPage } from '~/src/server/common/model/page/exit-page-model.js'
import { ActionablePageController } from './actionable-exit-page-controller.js'

export class CphNeededPage extends ExitPage {
  urlPath = '/exotics/movement-destination/cph-needed'

  pageTitle = `You need the destination's CPH number to continue your application`
  view = `exotics/destination/cph-needed/index`
  key = 'cphNeeded'
  sectionKey = 'destination'

  viewProps() {
    return {
      continueButtonText: 'Continue with CPH number',
      continueButtonClasses: 'govuk-button--secondary'
    }
  }
}
export const cphNeededPage = new CphNeededPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const cphNeeded = new ActionablePageController(cphNeededPage, {
  methods: ['GET', 'POST']
}).plugin()
