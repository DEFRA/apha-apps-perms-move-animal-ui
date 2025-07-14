import {
  SubmitPageController,
  SubmitSummaryPage
} from '../../common/controller/check-answers-controller/index.js'
import { TbApplicationModel } from '../application.js'
import { TbStateManager } from '../state-manager.js'
import { tbConfirmationPage } from '../submit/confirmation/index.js'

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */

export class TbSubmitSummaryPage extends SubmitSummaryPage {
  namespace = 'tb'
  StateManager = TbStateManager
  ApplicationModel = TbApplicationModel

  urlPath = `/tb/submit/check-answers`

  key = 'tb-submit-summary'

  nextPage() {
    return tbConfirmationPage
  }
}

export const tbSubmitSummaryPage = new TbSubmitSummaryPage()

export class TbSubmitPageController extends SubmitPageController {
  StateManager = TbStateManager
  ApplicationModel = TbApplicationModel

  namespace = 'tb'
  fileTooLargePath = '/tb/biosecurity-map/size-error'

  constructor() {
    super(tbSubmitSummaryPage)
  }
}

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const tbSubmitSummary = new TbSubmitPageController().plugin()
