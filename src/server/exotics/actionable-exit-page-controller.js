import { ActionableExitPageController } from '../common/controller/actionable-exit-page-controller/actionable-exit-page-controller.js'
import { ExoticsStateManager } from './state-manager.js'

export class ExoticsActionableExitPageController extends ActionableExitPageController {
  StateManager = ExoticsStateManager
}
