import { ExoticsStateManager } from './state-manager.js'
import { SummaryPageController } from '~/src/server/common/controller/summary-page-controller/summary-page-controller.js'

export class ExoticsSummaryPageController extends SummaryPageController {
  taskListUrl = '/exotics/task-list'
  StateManager = ExoticsStateManager
}
