import {
  SubmitPageController,
  SubmitSummaryPage
} from '../../check-answers/index.js'
import { ExoticsApplicationModel } from '../application.js'
import { ExoticsStateManager } from '../state-manager.js'

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */

export class ExoticsSubmitSummaryPage extends SubmitSummaryPage {
  StateManager = ExoticsStateManager
  ApplicationModel = ExoticsApplicationModel

  urlPath = `/exotics/submit/check-answers`

  key = 'exotics-submit-summary'
}

const exoticsSubmitSummaryPage = new ExoticsSubmitSummaryPage()

export class ExoticsSubmitPageController extends SubmitPageController {
  StateManager = ExoticsStateManager
  ApplicationModel = ExoticsApplicationModel

  constructor() {
    super(exoticsSubmitSummaryPage)
  }
}

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const exoticsSubmitSummary = new ExoticsSubmitPageController().plugin()
