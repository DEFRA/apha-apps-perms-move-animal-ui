import { FmdStateManager } from './state-manager.js'
import { SummaryPageController } from '~/src/server/common/controller/summary-page-controller/summary-page-controller.js'

export class FmdSummaryPageController extends SummaryPageController {
  taskListUrl = '/fmd/task-list'
  StateManager = FmdStateManager
}
