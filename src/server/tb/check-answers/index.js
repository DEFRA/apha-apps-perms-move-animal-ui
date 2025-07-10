import {
  SubmitPageController,
  SubmitSummaryPage
} from '../../check-answers/index.js'
import { TbApplicationModel } from '../application.js'
import { TbStateManager } from '../state-manager.js'

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */

export class TbSubmitSummaryPage extends SubmitSummaryPage {
  StateManager = TbStateManager
  ApplicationModel = TbApplicationModel

  urlPath = `/tb/submit/check-answers`

  key = 'tb-submit-summary'
}

export const tbSubmitSummaryPage = new TbSubmitSummaryPage()

export class TbSubmitPageController extends SubmitPageController {
  StateManager = TbStateManager
  ApplicationModel = TbApplicationModel

  constructor() {
    super(tbSubmitSummaryPage)
  }
}

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const tbSubmitSummary = new TbSubmitPageController().plugin()
