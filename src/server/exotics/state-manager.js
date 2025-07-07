import { StateManager } from '../common/model/state/state-manager.js'

export class ExoticsStateManager extends StateManager {
  get key() {
    return ExoticsStateManager.key
  }

  static get key() {
    return 'exotics-application'
  }
}
