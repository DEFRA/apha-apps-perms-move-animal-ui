import {
  SubmitPageController,
  SubmitSummaryPage
} from '../../common/controller/check-answers-controller/index.js'
import { ExoticsApplicationModel } from '../application.js'
import { ExoticsStateManager } from '../state-manager.js'
import { exoticsConfirmationPage } from '../submit/confirmation/index.js'

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */

export class ExoticsSubmitSummaryPage extends SubmitSummaryPage {
  namespace = 'exotics'
  StateManager = ExoticsStateManager
  ApplicationModel = ExoticsApplicationModel

  urlPath = `/exotics/submit/check-answers`

  key = 'exotics-submit-summary'

  nextPage() {
    return exoticsConfirmationPage
  }
}

export const exoticsSubmitSummaryPage = new ExoticsSubmitSummaryPage()

export class ExoticsSubmitPageController extends SubmitPageController {
  StateManager = ExoticsStateManager
  ApplicationModel = ExoticsApplicationModel

  namespace = 'exotics'

  constructor() {
    super(exoticsSubmitSummaryPage)
  }
}

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const exoticsSubmitSummary = new ExoticsSubmitPageController().plugin()
