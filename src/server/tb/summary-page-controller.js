import { TbStateManager } from '~/src/server/tb/state-manager.js'
import { SummaryPageController } from '../common/controller/summary-page-controller/summary-page-controller.js'

export class TbSummaryPageController extends SummaryPageController {
  StateManager = TbStateManager
}
