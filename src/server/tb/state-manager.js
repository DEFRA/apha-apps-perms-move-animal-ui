import { StateManager } from '../common/model/state/state-manager.js'

export class TbStateManager extends StateManager {
  get key() {
    return TbStateManager.key
  }

  static get key() {
    return 'application'
  }
}
