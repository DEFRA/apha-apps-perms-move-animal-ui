import { ActionableExitPageController } from '../common/controller/actionable-exit-page-controller/actionable-exit-page-controller.js'
import { FmdStateManager } from './state-manager.js'

export class FmdActionableExitPageController extends ActionableExitPageController {
  StateManager = FmdStateManager
}
