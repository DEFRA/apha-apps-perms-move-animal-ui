/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

import { ActionableExitPage } from '~/src/server/common/model/page/actionable-exit-page-model.js'
import {
  Answer as CphKnownAnswer,
  cphNumberKnownPage
} from '../cph-number-known/index.js'
import { cphNumberPage } from '../cph-number/index.js'
import { ExoticsActionableExitPageController } from '../../actionable-exit-page-controller.js'

export class CphNeededPage extends ActionableExitPage {
  urlPath = '/exotics/movement-destination/cph-needed'
  pageTitle = `You need the destination's CPH number to continue your application`
  view = `exotics/destination/cph-needed/index`
  key = 'cphNeeded'
  sectionKey = 'destination'

  get indirectAction() {
    return {
      page: cphNumberKnownPage,
      answer: new CphKnownAnswer({ cphNumberKnown: 'yes' })
    }
  }

  nextPage() {
    return cphNumberPage
  }

  async viewProps() {
    return Promise.resolve({
      continueButtonText: 'Continue',
      continueButtonClasses: 'govuk-button--secondary'
    })
  }
}
export const cphNeededPage = new CphNeededPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const cphNeeded = new ExoticsActionableExitPageController(
  cphNeededPage,
  {
    methods: ['GET', 'POST']
  }
).plugin()
