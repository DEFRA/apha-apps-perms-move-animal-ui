import {
  SubmitPageController,
  SubmitSummaryPage
} from '../../common/controller/check-answers-controller/index.js'
import { FmdApplicationModel } from '../application.js'
import { FmdStateManager } from '../state-manager.js'
import { fmdConfirmationPage } from '../submit/confirmation/index.js'

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */

export class FmdSubmitSummaryPage extends SubmitSummaryPage {
  namespace = 'fmd'
  StateManager = FmdStateManager
  ApplicationModel = FmdApplicationModel

  urlPath = `/fmd/submit/check-answers`

  key = 'fmd-submit-summary'

  nextPage() {
    return fmdConfirmationPage
  }
}

export const fmdSubmitSummaryPage = new FmdSubmitSummaryPage()

export class FmdSubmitPageController extends SubmitPageController {
  StateManager = FmdStateManager
  ApplicationModel = FmdApplicationModel

  namespace = 'fmd'

  constructor() {
    super(fmdSubmitSummaryPage)
  }
}

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const fmdSubmitSummary = new FmdSubmitPageController().plugin()
