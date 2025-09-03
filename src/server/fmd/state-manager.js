import { StateManager } from '../common/model/state/state-manager.js'

export class FmdStateManager extends StateManager {
  get key() {
    return FmdStateManager.key
  }

  static get key() {
    return 'fmd-application'
  }
}
