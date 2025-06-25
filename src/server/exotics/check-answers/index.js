import {
  SubmitPageController,
  SubmitSummaryPage
} from '../../common/controller/application-summary-page-controller/index.js'
import { ExoticsApplicationModel } from '../application.js'
import { ExoticStateManager } from '../state-manager.js'

export class ExoticSubmitSummaryPage extends SubmitSummaryPage {
  urlPath = '/exotic/submit/check-answers'
}

export class ExoticSubmitSummaryController extends SubmitPageController {
  StateManager = ExoticStateManager
  ApplicationModel = ExoticsApplicationModel
  taskListIncompletePath = '/exotic/task-list/incomplete'
}

export const exoticSubmitSummaryPage = new ExoticSubmitSummaryPage()

export const exoticSubmitSummary = new ExoticSubmitSummaryController(
  exoticSubmitSummaryPage,
  ExoticStateManager
).plugin()
